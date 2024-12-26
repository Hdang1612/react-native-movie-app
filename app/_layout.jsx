import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css";
// Import các màn hình
// import HomeScreen from '../screens/HomeScreen';
// import MovieScreen from '../screens/MovieScreen';
import Home from './index';
import MovieScreen from './MovieScreen';
import PersonScreen from './PersonScreen'
import SearchScreen from './SearchScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Ngăn việc ẩn splash screen trước khi assets được tải xong
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Hiển thị màn hình trắng trong khi chờ fonts tải xong
  }

  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
        <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
    </>
  );
}
