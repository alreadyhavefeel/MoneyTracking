import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="SavingsPage" 
        options={{ 
          headerShown: true,
          headerTitle: 'Savings',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert('This is an icon button!')}
              style={{ marginRight: 0 }}
            >
              <Feather name="plus" size={24} color="black" />
            </TouchableOpacity>
          ),
          }} />
        <Stack.Screen 
          name="Expanse" 
        options={{ 
          headerShown: true,
          headerTitle: 'Expanse',
          headerBackTitle: 'Back',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert('This is an icon button!')}
              style={{ marginRight: 0 }}
            >
              <Feather name="plus" size={24} color="black" />
            </TouchableOpacity>
          ),
          }} />
      </Stack>
    </ThemeProvider>
  );
}
