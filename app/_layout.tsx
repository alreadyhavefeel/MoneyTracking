import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Link, useNavigation, useRouter } from "expo-router";
import 'react-native-reanimated';
import { Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const navigation = useNavigation();
  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const [hasLaunched, setHasLaunched] = React.useState(null);

  useEffect(() => {
    async function checkIfLaunched() {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setHasLaunched(true)
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkIfLaunched();
  }, []);

  useEffect(() => {
    if (hasLaunched) {
      router.push('../Intro');
    }
  }, [loaded, hasLaunched]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="SavingsPage" 
          options={{ 
            headerShown: true,
            headerTitle: 'Savings',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {router.push(`/AddSavingAccount/`)}}
                style={{ marginRight: 0 }}
              >
                <Feather name="plus" size={24} color="black" />
              </TouchableOpacity>
            ),
            }} />
        <Stack.Screen name="AddSavingAccount" />
        <Stack.Screen name="PrivacyPolicy"
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="ContactUs"
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="SignIn"
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="SignUp"
          options={{
            headerShown: false,
          }} />
      </Stack>
    </ThemeProvider>
  );
}
