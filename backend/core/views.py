import os
import requests
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from datetime import date
import urllib.parse

SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_URL = "https://api.spotify.com/v1"

@api_view(['GET'])
def spotify_login(request):
    params = {
        'client_id': settings.SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
        'scope': 'user-read-private user-read-email user-read-playback-state user-read-currently-playing',
    }
    url = f"{SPOTIFY_AUTH_URL}?{urllib.parse.urlencode(params)}"
    return Response({'auth_url': url})


@api_view(['GET'])
def spotify_callback(request):
    code = request.GET.get('code')
    error = request.GET.get('error')

    if error:
        return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

    # Exchange code for token
    response = requests.post(SPOTIFY_TOKEN_URL, data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
        'client_id': settings.SPOTIFY_CLIENT_ID,
        'client_secret': settings.SPOTIFY_CLIENT_SECRET,
    })

    tokens = response.json()
    access_token = tokens.get('access_token')
    refresh_token = tokens.get('refresh_token')

    # Get Spotify user profile
    profile_response = requests.get(f"{SPOTIFY_API_URL}/me", headers={
        'Authorization': f'Bearer {access_token}'
    })
    profile = profile_response.json()

    # Create or update user
    user, created = User.objects.get_or_create(
        spotify_id=profile['id'],
        defaults={
            'username': profile['id'],
            'email': profile.get('email', ''),
            'profile_pic': profile['images'][0]['url'] if profile.get('images') else '',
        }
    )

    return Response({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_pic': user.profile_pic,
            'spotify_id': user.spotify_id,
        }
    })


@api_view(['GET'])
def search_songs(request):
    query = request.GET.get('q', '')
    access_token = request.headers.get('Authorization', '').replace('Bearer ', '')

    if not query:
        return Response({'error': 'No query provided'}, status=status.HTTP_400_BAD_REQUEST)

    response = requests.get(f"{SPOTIFY_API_URL}/search", 
        headers={'Authorization': f'Bearer {access_token}'},
        params={'q': query, 'type': 'track', 'limit': 10}
    )

    tracks = response.json().get('tracks', {}).get('items', [])
    results = [{
        'id': track['id'],
        'name': track['name'],
        'artist': track['artists'][0]['name'],
        'album': track['album']['name'],
        'album_art': track['album']['images'][0]['url'] if track['album']['images'] else '',
        'preview_url': track.get('preview_url', ''),
    } for track in tracks]

    return Response({'results': results})

@api_view(['GET'])
def get_daily_prompt(request):
    today = date.today()
    
    # Return existing prompt if already generated today
    from .models import DailyPrompt
    existing = DailyPrompt.objects.filter(date=today).first()
    if existing:
        return Response({
            'date': existing.date,
            'weather': existing.weather,
            'temperature': existing.temperature,
            'vibe_text': existing.vibe_text,
        })

    # Get user's city from query param, default to Chicago
    city = request.GET.get('city', 'Chicago')
    
    weather_response = requests.get(
        'https://api.openweathermap.org/data/2.5/weather',
        params={
            'q': city,
            'appid': settings.OPENWEATHER_API_KEY,
            'units': 'imperial'
        }
    )
    
    weather_data = weather_response.json()

    if 'weather' not in weather_data:
        return Response({
            'error': 'Weather API not ready yet. Try again in a few minutes.',
            'raw': weather_data
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    condition = weather_data['weather'][0]['main']
    description = weather_data['weather'][0]['description']
    temp = round(weather_data['main']['temp'])

    # Generate vibe text based on weather
    vibe_map = {
        'Clear': f"It's clear and {temp}°F out. Sun's out, vibes are open — what song matches this energy?",
        'Clouds': f"Cloudy at {temp}°F. Grey skies, introspective mood — what song fits right now?",
        'Rain': f"Rainy day, {temp}°F. The kind of weather made for music — what's your pick?",
        'Drizzle': f"Light drizzle, {temp}°F. Cozy and slow — what song are you vibing to?",
        'Snow': f"Snowing at {temp}°F. Everything's quiet and still — what song matches the moment?",
        'Thunderstorm': f"Thunderstorms rolling in at {temp}°F. Intense energy — what song captures this?",
        'Mist': f"Misty and {temp}°F. Hazy, dreamy mood — what song fits?",
    }
    
    vibe_text = vibe_map.get(condition, f"{description.capitalize()} at {temp}°F — what song matches today's vibe?")

    # Save to database
    prompt = DailyPrompt.objects.create(
        date=today,
        weather=condition,
        temperature=temp,
        vibe_text=vibe_text,
    )

    return Response({
        'date': prompt.date,
        'weather': prompt.weather,
        'temperature': prompt.temperature,
        'vibe_text': prompt.vibe_text,
    })

@api_view(['POST'])
def submit_song(request):
    from .models import DailyPrompt, Submission
    
    # Get today's prompt
    today = date.today()
    prompt = DailyPrompt.objects.filter(date=today).first()
    
    if not prompt:
        return Response({'error': 'No prompt for today yet.'}, status=status.HTTP_404_NOT_FOUND)
    
    # Get user from spotify_id passed in request
    spotify_id = request.data.get('spotify_id')
    user = User.objects.filter(spotify_id=spotify_id).first()
    
    if not user:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    # Check if user already submitted today
    already_submitted = Submission.objects.filter(user=user, prompt=prompt).exists()
    if already_submitted:
        return Response({'error': 'You already submitted a song today.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create submission
    submission = Submission.objects.create(
        user=user,
        prompt=prompt,
        song_id=request.data.get('song_id'),
        song_name=request.data.get('song_name'),
        artist=request.data.get('artist'),
        album_art=request.data.get('album_art', ''),
        preview_url=request.data.get('preview_url', ''),
        caption=request.data.get('caption', ''),
    )
    
    return Response({
        'message': 'Song submitted successfully!',
        'submission': {
            'id': submission.id,
            'song_name': submission.song_name,
            'artist': submission.artist,
            'album_art': submission.album_art,
            'caption': submission.caption,
            'created_at': submission.created_at,
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_feed(request):
    from .models import DailyPrompt, Submission
    
    # Must provide spotify_id to unlock feed
    spotify_id = request.GET.get('spotify_id')
    user = User.objects.filter(spotify_id=spotify_id).first()
    
    if not user:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    today = date.today()
    prompt = DailyPrompt.objects.filter(date=today).first()
    
    if not prompt:
        return Response({'error': 'No prompt for today yet.'}, status=status.HTTP_404_NOT_FOUND)
    
    # Check if user has submitted today
    has_submitted = Submission.objects.filter(user=user, prompt=prompt).exists()
    
    if not has_submitted:
        return Response({
            'locked': True,
            'message': 'Submit your song first to unlock the feed.'
        })
    
    # Return all submissions for today
    submissions = Submission.objects.filter(prompt=prompt).select_related('user')
    
    data = [{
        'id': s.id,
        'user': s.user.username,
        'profile_pic': s.user.profile_pic,
        'song_name': s.song_name,
        'artist': s.artist,
        'album_art': s.album_art,
        'preview_url': s.preview_url,
        'caption': s.caption,
        'vote_count': s.votes.count(),
        'created_at': s.created_at,
    } for s in submissions]
    
    return Response({
        'locked': False,
        'prompt': prompt.vibe_text,
        'submissions': data
    })