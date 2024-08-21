import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';;
import { router, Redirect } from 'expo-router';

export default function TabLayout(prop) {
  const colorScheme = useColorScheme();
  const themeIconStyle = colorScheme === 'light' ? '#242c40' : '#d0d0c0';


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
      }}>
     
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={themeIconStyle} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={themeIconStyle} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? 'barschart' : 'barschart'} color={themeIconStyle} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'user' : 'user-o'} size={24} color={themeIconStyle} />
          ),
        }}
      />
      
    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: '#f1f5f9',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  lightThemeCard: {
    backgroundColor: '#121212',
  },
  darkThemeCard: {
    backgroundColor: '#f1f5f9',
  },
});
