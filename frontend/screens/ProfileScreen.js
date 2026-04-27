import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const API_URL = 'http://192.168.1.5:8000';

function SettingsIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke="#FFFFFF" strokeWidth={2}/>
      <Path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function RowArrow() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke="#48484A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function SettingsModal({ visible, onClose }) {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [friendActivity, setFriendActivity] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={modalStyles.container}>
        <LinearGradient colors={['#0d0d14', '#000000']} style={StyleSheet.absoluteFillObject} />

        <View style={modalStyles.header}>
          <TouchableOpacity onPress={onClose} style={modalStyles.backButton}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={modalStyles.headerTitle}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={modalStyles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={modalStyles.sectionLabel}>ACCOUNT</Text>
          <View style={modalStyles.section}>
            <TouchableOpacity style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>🎵</Text>
                <Text style={modalStyles.rowText}>Connected Spotify</Text>
              </View>
              <View style={modalStyles.rowRight}>
                <Text style={modalStyles.rowValue}>epickaran</Text>
                <RowArrow />
              </View>
            </TouchableOpacity>
            <View style={modalStyles.divider} />
            <TouchableOpacity style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>📍</Text>
                <Text style={modalStyles.rowText}>City</Text>
              </View>
              <View style={modalStyles.rowRight}>
                <Text style={modalStyles.rowValue}>Chicago</Text>
                <RowArrow />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.sectionLabel}>NOTIFICATIONS</Text>
          <View style={modalStyles.section}>
            <View style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>🔔</Text>
                <Text style={modalStyles.rowText}>Push Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#2C2C2E', true: '#BF5AF2' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={modalStyles.divider} />
            <View style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>⏰</Text>
                <Text style={modalStyles.rowText}>Daily Reminder</Text>
              </View>
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: '#2C2C2E', true: '#BF5AF2' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={modalStyles.divider} />
            <View style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>👥</Text>
                <Text style={modalStyles.rowText}>Friend Activity</Text>
              </View>
              <Switch
                value={friendActivity}
                onValueChange={setFriendActivity}
                trackColor={{ false: '#2C2C2E', true: '#BF5AF2' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <Text style={modalStyles.sectionLabel}>ABOUT</Text>
          <View style={modalStyles.section}>
            <TouchableOpacity style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>📄</Text>
                <Text style={modalStyles.rowText}>Privacy Policy</Text>
              </View>
              <RowArrow />
            </TouchableOpacity>
            <View style={modalStyles.divider} />
            <TouchableOpacity style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>📋</Text>
                <Text style={modalStyles.rowText}>Terms of Service</Text>
              </View>
              <RowArrow />
            </TouchableOpacity>
            <View style={modalStyles.divider} />
            <View style={modalStyles.row}>
              <View style={modalStyles.rowLeft}>
                <Text style={modalStyles.rowIcon}>🌊</Text>
                <Text style={modalStyles.rowText}>Version</Text>
              </View>
              <Text style={modalStyles.rowValue}>1.0.0</Text>
            </View>
          </View>

          <TouchableOpacity style={modalStyles.signOutButton}>
            <Text style={modalStyles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          <Text style={modalStyles.footer}>Made with 🎵 by wavelength</Text>

        </ScrollView>
      </View>
    </Modal>
  );
}

export default function ProfileScreen() {
  const [submissions, setSubmissions] = useState([]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [user] = useState({
    username: 'epickaran',
    profile_pic: 'https://i.scdn.co/image/ab6775700000ee85ce35229a261349f37888323c',
    wins: 3,
    streak: 7,
    total: 24,
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/feed/?spotify_id=epickaran`);
      const data = await res.json();
      if (!data.locked) {
        setSubmissions(data.submissions?.filter(s => s.user === 'epickaran') || []);
      }
    } catch (err) {
      console.log('Profile error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d0d14', '#000000']} style={StyleSheet.absoluteFillObject} />

      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSettingsVisible(true)}
          >
            <SettingsIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <LinearGradient colors={['#1C1C2E', '#0d0d1a']} style={styles.profileCardGradient}>
            <Image source={{ uri: user.profile_pic }} style={styles.avatar} />
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.joinedText}>wavelength member</Text>
          </LinearGradient>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#1C1C2E', '#111114']} style={styles.statGradient}>
              <Text style={styles.statNumber}>{user.total}</Text>
              <Text style={styles.statLabel}>Submissions</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={['#1C1C2E', '#111114']} style={styles.statGradient}>
              <Text style={styles.statNumber}>{user.wins}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient colors={['#2D1B4E', '#1a0a2e']} style={styles.statGradient}>
              <Text style={[styles.statNumber, { color: '#BF5AF2' }]}>{user.streak} 🔥</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </LinearGradient>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your picks</Text>

        {submissions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No submissions yet</Text>
            <Text style={styles.emptySubtext}>Submit a song today to get started</Text>
          </View>
        ) : (
          submissions.map((s) => (
            <View key={s.id} style={styles.historyCard}>
              {s.album_art ? (
                <Image source={{ uri: s.album_art }} style={styles.albumArt} />
              ) : (
                <View style={styles.albumArtPlaceholder} />
              )}
              <View style={styles.songInfo}>
                <Text style={styles.songName} numberOfLines={1}>{s.song_name}</Text>
                <Text style={styles.artistName} numberOfLines={1}>{s.artist}</Text>
              </View>
              <View style={[styles.voteBadge, s.vote_count > 0 && styles.voteBadgeActive]}>
                <Text style={styles.voteCount}>🔥 {s.vote_count}</Text>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: '#48484A',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 24,
    marginLeft: 4,
  },
  section: {
    backgroundColor: '#111114',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1C1C1E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowIcon: {
    fontSize: 18,
  },
  rowText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#FFFFFF',
  },
  rowValue: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: '#48484A',
  },
  divider: {
    height: 1,
    backgroundColor: '#1C1C1E',
    marginLeft: 52,
  },
  signOutButton: {
    marginTop: 32,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#FF3B30',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#2C2C2E',
    marginTop: 32,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1C1C2E',
  },
  profileCardGradient: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#BF5AF2',
  },
  username: {
    fontSize: 22,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  joinedText: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#48484A',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1C1C2E',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Nunito_400Regular',
    color: '#48484A',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#48484A',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#2C2C2E',
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#111114',
    gap: 12,
  },
  albumArt: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  albumArtPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#2C2C2E',
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  artistName: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#8E8E93',
  },
  voteBadge: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  voteBadgeActive: {
    backgroundColor: '#2D1B4E',
    borderColor: '#BF5AF2',
  },
  voteCount: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#FFFFFF',
  },
});