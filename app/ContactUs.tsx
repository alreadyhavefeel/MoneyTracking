import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, View, Text, Button, Switch, Appearance, ScrollView, TouchableOpacity} from 'react-native';
import { router, useNavigation, useRouter, } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';


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

export default function ContactUs() {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <ScrollView>
        <ThemedView className="flex mt-14 bg-transparent">
            <View className="mx-5 mt-5 bg-transparent">
            <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
                <ThemedText className="text-xl font-semibold">Contact Us</ThemedText>
            </ThemedView>
            <View className="flex flex-col justify-center">
                <View className="">
                    <ThemedText className="text-sm">         
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam leo, rutrum id felis non, lobortis varius lorem. Nullam ut mattis enim.
                    </ThemedText>
                </View>
                <View className='mt-2'>
                    <ThemedText className="text-base">         
                        Call Us : + 66 123 456 789
                    </ThemedText>
                    <ThemedText className="text-base">         
                        Email : support@makemespace.co
                    </ThemedText>
                </View>
            </View>
            </View>
        </ThemedView>  
        </ScrollView>
    );
    }

