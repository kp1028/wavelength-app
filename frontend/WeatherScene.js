import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WEATHER_GRADIENTS = {
  sunny_hot: ['#0a1628', '#1a3a5c', '#f4a261'],
  sunny_cold: ['#0a0f1a', '#1a2a3d', '#2d4a6e'],
  sunny_mild: ['#0a1a0a', '#1a3a1a', '#2d6a2d'],
  rainy: ['#050810', '#0d1f35', '#1a2d4a'],
  cloudy: ['#0a0a0f', '#1a1a2e', '#2a2a3e'],
  snowy: ['#0a0a14', '#141428', '#1a1a3d'],
  stormy: ['#050005', '#100010', '#1a0020'],
  misty: ['#080810', '#111120', '#1a1a30'],
};

function getGradientKey(weather, temperature) {
  if (weather === 'Rain' || weather === 'Drizzle') return 'rainy';
  if (weather === 'Thunderstorm') return 'stormy';
  if (weather === 'Snow') return 'snowy';
  if (weather === 'Mist' || weather === 'Fog') return 'misty';
  if (weather === 'Clouds') return 'cloudy';
  if (weather === 'Clear') {
    if (temperature >= 75) return 'sunny_hot';
    if (temperature <= 50) return 'sunny_cold';
    return 'sunny_mild';
  }
  return 'cloudy';
}

export default function WeatherScene({ weather, temperature }) {
  const key = getGradientKey(weather, temperature);
  const colors = WEATHER_GRADIENTS[key];

  return (
    <LinearGradient
      colors={colors}
      style={StyleSheet.absoluteFillObject}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
}