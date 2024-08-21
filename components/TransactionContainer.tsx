import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useColorScheme } from '@/hooks/useColorScheme';

export function TransactionContainer(props) {
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText;
    const themeContainerStyle =
      colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeCardStyle = colorScheme === 'light' ? styles.lightThemeCard : styles.darkThemeCard;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <ThemedView className={`flex flex-row justify-between p-4 rounded-lg bg-white mt-3`}>
              <View className="flex flex-row">
                <View className="self-center">
                  <MaterialIcons name={props.icons} size={24} color="black" />
                </View>
                <View className="flex flex-col ml-5">
                  <ThemedText style={themeTextStyle} className="text-lg font-bold">{props.name}</ThemedText>
                  <ThemedText style={themeTextStyle} className="text-base font-light">{props.category}</ThemedText>
                </View>
              </View>
              <View className="flex justify-center">
                <Text className={`text-lg font-medium ${props.number > 0 ? " text-emerald-400" : "text-rose-400"}`}>
                  {props.number > 0 ? "+$" + numberWithCommas(Math.abs(props.number).toFixed(2)) : "-$" + numberWithCommas(Math.abs(props.number).toFixed(2))}
                </Text>
              </View>
        </ThemedView>
    );
  };

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
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
  