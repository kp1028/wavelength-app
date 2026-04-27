from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bio = models.TextField(blank=True)
    spotify_id = models.CharField(max_length=255, blank=True)
    profile_pic = models.URLField(blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)

class DailyPrompt(models.Model):
    date = models.DateField(unique=True)
    weather = models.CharField(max_length=100)
    temperature = models.FloatField()
    vibe_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    prompt = models.ForeignKey(DailyPrompt, on_delete=models.CASCADE, related_name='submissions')
    song_id = models.CharField(max_length=255)
    song_name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album_art = models.URLField(blank=True)
    preview_url = models.URLField(blank=True)
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'prompt')

class Vote(models.Model):
    voter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, related_name='votes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('voter', 'submission')