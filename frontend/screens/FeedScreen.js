import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

const API_URL = 'http://192.168.1.5:8000';

export default function FeedScreen() {
  const [submissions, setSubmissions] = useState([]);
  const [prompt, setPrompt] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await fetch(`${API_URL}/api/feed/?spotify_id=epickaran`);
      const data = await res.json();
      if (!data.locked) {
        setSubmissions(data.submissions || []);
        setPrompt(data.prompt);
      }
    } catch (err) {
      console.log('Feed error:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFeed();
    setRefreshing(false);
  };

  const toggleVote = (id) => {
    setVoted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d0d14', '#000000']} style={StyleSheet.absoluteFillObject} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Today's Feed</Text>
          {prompt && <Text style={styles.headerSubtitle}>{prompt}</Text>}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#BF5AF2" />}
      >
        {submissions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.lockContainer}>
              <LinearGradient colors={['#2D1B4E', '#1a0a2e']} style={styles.lockGradient}>
                <Text style={styles.lockIcon}>🔒</Text>
              </LinearGradient>
            </View>
            <Text style={styles.emptyTitle}>Feed is locked</Text>
            <Text style={styles.emptySubtitle}>Submit your song on the home screen to unlock today's feed</Text>
            <View style={styles.emptyHint}>
              <Text style={styles.emptyHintText}>Pull to refresh after submitting</Text>
            </View>
          </View>
        ) : (
          submissions.map((s) => (
            <View key={s.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.userRow}>
                  <LinearGradient colors={['#BF5AF2', '#7B2FBE']} style={styles.avatar}>
                    <Text style={styles.avatarText}>{s.user[0].toUpperCase()}</Text>
                  </LinearGradient>
                  <View>
                    <Text style={styles.username}>{s.user}</Text>
                    <Text style={styles.timeText}>today</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.voteButton, voted[s.id] && styles.voteButtonActive]}
                  onPress={() => toggleVote(s.id)}
                >
                  <Text style={styles.voteText}>
                    🔥 {s.vote_count + (voted[s.id] ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.songRow}>
                {s.album_art ? (
                  <Image source={{ uri: s.album_art }} style={styles.albumArt} />
                ) : (
                  <View style={styles.albumArtPlaceholder} />
                )}
                <View style={styles.songInfo}>
                  <Text style={styles.songName} numberOfLines={1}>{s.song_name}</Text>
                  <Text style={styles.artistName} numberOfLines={1}>{s.artist}</Text>
                </View>
              </View>

              {s.caption ? (
                <Text style={styles.caption}>"{s.caption}"</Text>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#48484A',
    lineHeight: 20,
    maxWidth: 280,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  lockContainer: {
    marginBottom: 24,
    borderRadius: 32,
    overflow: 'hidden',
  },
  lockGradient: {
    width: 80,
    height: 80,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: '#48484A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyHint: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  emptyHintText: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#48484A',
  },
  card: {
    backgroundColor: '#111114',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1C1C1E',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_700Bold',
    fontSize: 15,
  },
  username: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#48484A',
  },
  voteButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  voteButtonActive: {
    backgroundColor: '#2D1B4E',
    borderColor: '#BF5AF2',
  },
  voteText: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#FFFFFF',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  albumArtPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    fontSize: 17,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#8E8E93',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#8E8E93',
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 20,
  },
});