import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Link, useNavigation, useRouter } from "expo-router";
import 'react-native-reanimated';
import { Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import React from 'react';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
          <Stack.Screen name="Intro" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
