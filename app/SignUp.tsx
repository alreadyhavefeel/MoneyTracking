import { Image, StyleSheet, Platform, View, Text, Button, Switch, Appearance, ScrollView, TouchableOpacity} from 'react-native';
import { router, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function SignUp() {
    return (
      <ScrollView>
        <Stack.Screen
          options={{
            headerShown: false,
          }} />
        <ThemedView className="flex mt-14 bg-transparent">
          <Text>Test</Text>
        </ThemedView>  
      </ScrollView>
    );
  }