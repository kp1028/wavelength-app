import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path, Circle } from 'react-native-svg';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { View, ActivityIndicator } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function HomeIcon({ color }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

function FeedIcon({ color }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12 C2.5 12 2.5 6 4 6 C5.5 6 5.5 18 7 18 C8.5 18 8.5 4 10 4 C11.5 4 11.5 20 13 20 C14.5 20 14.5 4 16 4 C17.5 4 17.5 18 19 18 C20.5 18 20.5 6 22 6 C23.5 6 23.5 12 24 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ProfileIcon({ color }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="7.5" r="4.5" stroke={color} strokeWidth={2.2}/>
      <Path d="M3.5 20.5C3.5 17 7.4 14 12 14C16.6 14 20.5 17 20.5 20.5" stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
    </Svg>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#BF5AF2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'rgba(0,0,0,0.95)',
            borderTopColor: '#1C1C1E',
            borderTopWidth: 0.5,
            paddingBottom: 20,
            paddingTop: 12,
            height: 72,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#48484A',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{ tabBarIcon: ({ color }) => <FeedIcon color={color} /> }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarIcon: ({ color }) => <ProfileIcon color={color} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}