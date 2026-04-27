import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import WeatherScene from '../WeatherScene';

const API_URL = 'http://192.168.1.5:8000';

const WEATHER_THEMES = {
  Clear: { accent: '#FF9500' },
  Clouds: { accent: '#8E8E93' },
  Rain: { accent: '#4A90E2' },
  Drizzle: { accent: '#5AC8FA' },
  Snow: { accent: '#E8E8FF' },
  Thunderstorm: { accent: '#BF5AF2' },
  Mist: { accent: '#98989D' },
};

const DEFAULT_THEME = { accent: '#BF5AF2' };

export default function HomeScreen({ navigation }) {
  const [prompt, setPrompt] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [results, setResults] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [searching, setSearching] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const theme = prompt ? (WEATHER_THEMES[prompt.weather] || DEFAULT_THEME) : DEFAULT_THEME;

  useEffect(() => {
    fetchPrompt();
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      await AsyncStorage.removeItem('spotify_access_token');
      const testToken = 'BQCvV6qPpTnGDWvK5qsyxL6Inna4kUvbJm_nB-gV0fa6fXo8q3zhUZ0wcDXYzDZzKH9B7Umm1ZvCIepjc_FDWHILSGLXwwn4oQtVKKqVsNzhfnAMfFKFo6aUcoTeK1-83kVcpBzzgQH5jcG8NpKSQA-a5gQfPVd6MJVPXCR9dtWtwzannGAwvDWDcU-f4EDIFgZ_qZuYIYK3k17JPQ_toYxLhYYNqIDYa3XXZz9ly-W35s982yo';
      setAccessToken(testToken);
      await AsyncStorage.setItem('spotify_access_token', testToken);
    } catch (err) {
      console.log('Token load error:', err);
    }
  };

  const fetchPrompt = async () => {
    try {
      const res = await fetch(`${API_URL}/api/prompt/today/?city=Chicago`);
      const data = await res.json();
      setPrompt(data);
    } catch (err) {
      console.log('Error fetching prompt:', err);
    }
  };

  const searchSongs = async () => {
    if (!search.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`${API_URL}/api/songs/search/?q=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.log('Search error:', err);
    }
    setSearching(false);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <WeatherScene weather={prompt?.weather || 'Clouds'} temperature={prompt?.temperature || 60} />
        <StatusBar style="light" />
        <View style={styles.submittedContainer}>
          {selectedSong?.album_art ? (
            <Image source={{ uri: selectedSong.album_art }} style={styles.submittedAlbumArtLarge} />
          ) : (
            <View style={styles.submittedAlbumArtPlaceholder} />
          )}
          <Text style={styles.submittedTitle}>You're in 🎯</Text>
          <Text style={styles.submittedSongName}>{selectedSong?.name}</Text>
          <Text style={styles.submittedSongArtist}>{selectedSong?.artist}</Text>
          <View style={styles.submittedDivider} />
          <Text style={styles.submittedSubtitle}>
            Feed unlocks once your friends submit their picks
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WeatherScene weather={prompt?.weather || 'Clouds'} temperature={prompt?.temperature || 60} />
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.vibeSection}>
          <Text style={styles.appName}>wavelength</Text>
          <Text style={styles.temperatureText}>
            {prompt ? `${prompt.temperature}°F` : ''}
          </Text>
          <Text style={styles.vibeText}>
            {prompt ? prompt.weather : ''}
          </Text>
        </View>

        <View style={styles.bottomSection}>
          {selectedSong && (
            <View style={styles.selectedCard}>
              <Image source={{ uri: selectedSong.album_art }} style={styles.albumArt} />
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedTitle} numberOfLines={1}>{selectedSong.name}</Text>
                <Text style={styles.selectedArtist} numberOfLines={1}>{selectedSong.artist}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedSong(null)}>
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {results.length > 0 && (
            <View style={styles.resultsList}>
              <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 220 }}>
                {results.map((song) => (
                  <TouchableOpacity
                    key={song.id}
                    style={styles.resultItem}
                    onPress={() => {
                      setSelectedSong(song);
                      setResults([]);
                      setSearch('');
                    }}
                  >
                    <Image source={{ uri: song.album_art }} style={styles.resultAlbumArt} />
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultTitle} numberOfLines={1}>{song.name}</Text>
                      <Text style={styles.resultArtist} numberOfLines={1}>{song.artist}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.searchRow}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search a song..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={searchSongs}
                returnKeyType="search"
              />
            </View>
            {selectedSong ? (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.accent }]}
                onPress={() => setSubmitted(true)}
              >
                <Text style={styles.actionButtonText}>Submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: 'rgba(255,255,255,0.15)' }]}
                onPress={searchSongs}
              >
                <Text style={styles.actionButtonText}>
                  {searching ? '...' : 'Search'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  vibeSection: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  appName: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  temperatureText: {
    fontSize: 72,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    letterSpacing: -2,
    marginBottom: 8,
  },
  vibeText: {
    fontSize: 28,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: -0.5,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  searchInput: {
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },
  actionButton: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_700Bold',
    fontSize: 15,
  },
  resultsList: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  resultAlbumArt: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  resultArtist: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: 'rgba(255,255,255,0.5)',
  },
  selectedCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  albumArt: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedTitle: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  selectedArtist: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: 'rgba(255,255,255,0.5)',
  },
  removeText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
    paddingLeft: 8,
  },
  submittedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  submittedAlbumArtLarge: {
    width: 160,
    height: 160,
    borderRadius: 24,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  submittedAlbumArtPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 24,
    backgroundColor: '#2C2C2E',
    marginBottom: 28,
  },
  submittedTitle: {
    fontSize: 32,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  submittedSongName: {
    fontSize: 20,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  submittedSongArtist: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 24,
  },
  submittedDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#BF5AF2',
    borderRadius: 2,
    marginBottom: 24,
  },
  submittedSubtitle: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    lineHeight: 22,
  },
});