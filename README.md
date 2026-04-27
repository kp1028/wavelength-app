# Wavelength

A full-stack social music app that connects people through music and weather. Wavelength uses the Spotify API to surface what people are listening to and the OpenWeatherMap API to create weather-reactive listening experiences.

## Features

- Spotify integration — browse and discover music tied to real listening data
- Weather-reactive UI — the app's mood and recommendations shift based on current weather conditions
- User profiles — view and share what you're listening to
- Feed — see what others in your network are playing
- Settings — customize your experience

## Tech Stack

**Backend**
- Python / Django
- Django REST Framework
- Spotify API (OAuth 2.0)
- OpenWeatherMap API
- PostgreSQL

**Frontend**
- React Native
- Expo
- JavaScript (ES6+)

## Project Structure

```
wavelength-app/
├── backend/               # Django REST API
│   ├── core/              # Main app (models, views, URLs)
│   └── wavelength_backend/ # Django project settings
├── frontend/              # React Native / Expo app
│   ├── screens/           # App screens
│   │   ├── HomeScreen.js
│   │   ├── FeedScreen.js
│   │   ├── ProfileScreen.js
│   │   └── SettingsScreen.js
│   ├── App.js
│   └── WeatherScene.js    # Weather-reactive component
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

## Environment Variables

Create a `.env` file in the backend directory with the following:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
SECRET_KEY=your_django_secret_key
```

## Author

**Karan Patel**
- Portfolio: [kp1028.github.io](https://kp1028.github.io)
- GitHub: [@kp1028](https://github.com/kp1028)
