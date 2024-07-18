import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function TransactionContainer(props) {
    return (
        <ThemedView className={`flex flex-row justify-between p-4 rounded-lg bg-white mt-3`}>
              <View className="flex flex-row">
                <View className="self-center">
                  <MaterialIcons name={props.icons} size={24} color="black" />
                </View>
                <View className="flex flex-col ml-5">
                  <ThemedText className="text-lg font-bold">{props.name}</ThemedText>
                  <ThemedText className="text-base font-light">{props.type}</ThemedText>
                </View>
              </View>
              <View className="flex justify-center">
                <Text className={`text-xl font-semibold ${props.number > 0 ? " text-emerald-400" : "text-rose-400"}`}>
                  {props.number > 0 ? "+$" + Math.abs(props.number) : "-$" + Math.abs(props.number)}
                </Text>
              </View>
        </ThemedView>
    );
  };