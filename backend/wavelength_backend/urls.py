from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/spotify/login/', views.spotify_login),
    path('api/auth/spotify/callback/', views.spotify_callback),
    path('api/songs/search/', views.search_songs),
    path('api/prompt/today/', views.get_daily_prompt),
    path('api/submissions/submit/', views.submit_song),
    path('api/feed/', views.get_feed),
]