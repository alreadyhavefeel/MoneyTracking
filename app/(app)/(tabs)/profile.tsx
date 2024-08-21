import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, View, Text, Button, Switch, Appearance, ScrollView, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

function MenuItem(props) {
  return (
    <TouchableOpacity onPress={props.handleClick}>
        <ThemedView className="flex flex-row bg-white p-4 mt-2 rounded-lg">
            <View className="flex justify-center">
                <MaterialCommunityIcons name={props.icon} size={24} color="black" />
            </View>
            <View className="flex flex-row pl-4 mt-1 justify-center">
                <Text className="text-base font-semibold">{props.name}</Text>
            </View>
        </ThemedView>
    </TouchableOpacity>
  );
}

function handleClickWallet() {
  router.replace('/wallet');
  //alert('Already change to Wallet page');
}

function handleContactUs() {
  router.push('../../ContactUs');
  //alert('Already change to Privacy Policy page');
}

function handlePrivacyPolicy() {
  console.log('Privacy Policy');
  router.push('../../PrivacyPolicy');
  //alert('Already change to Privacy Policy page');
}

function checkSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <View>
      {isSignedIn ? (
        <View className="mx-5 mt-5 bg-transparent">
            <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
              <ThemedText className="text-xl font-semibold">Profile</ThemedText>
            </ThemedView>
            <View className="flex flex-row justify-center">
              <View className="">
                  <View className="self-center">
                      <Image
                        source={require('@/assets/images/profile.jpg')}
                        style={{ width: 120, height: 120, borderRadius: 60, borderColor: 'gray', borderWidth: 1 }}
                      />
                  </View>
                  <Text className="mt-4 text-xl font-semibold self-center">Feel Ratchanon</Text>
                  <Text className="text-sm self-center">1997s.ratchanon@gmail.com | +66 93 7547989</Text>
              </View>
            </View>
            <View className="flex flex-col mt-3">
              <MenuItem router="" name="Edit profile information" icon="account-details" handleClick={handleClickWallet}/>
              <MenuItem router="" name="Privacy policy" icon="lock" handleClick={handlePrivacyPolicy}/>
              <MenuItem router="" name="Contact us" icon="chat-processing-outline" handleClick={handleContactUs}/>
            </View>
            <Text>Sign out</Text>
        </View>
      ) : (
        <View className="mx-5 mt-5 bg-transparent">
            <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
              <ThemedText className="text-xl font-semibold">Profile</ThemedText>
            </ThemedView>
            <View className="flex flex-row justify-center">
              <View className="flex flex-col">
                  <View className="self-center">
                      <Image
                        source={require('@/assets/images/profile-non-signin.png')}
                        style={{ width: 120, height: 120, borderRadius: 60, borderColor: 'gray', borderWidth: 1 }}
                      />
                  </View>
                  <View className="flex flex-row justify-center">
                    <Text className="mt-4 text-xl font-semibold self-center">Username</Text>
                    <Link href="../../SignIn" className="text-blue-500 text-base font-light self-end"> (Sign-in)</Link>
                  </View>
              </View>
            </View>
            <View className="flex flex-col mt-3">
              <MenuItem router="" name="Privacy policy" icon="lock" handleClick={handlePrivacyPolicy}/>
              <MenuItem router="" name="Contact us" icon="chat-processing-outline" handleClick={handleContactUs}/>
            </View>
        </View>
      )}
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <ScrollView className="bg-slate-100">
      <ThemedView className="flex mt-14 bg-transparent">
        {checkSignIn()}
      </ThemedView>  
    </ScrollView>
  );
}

