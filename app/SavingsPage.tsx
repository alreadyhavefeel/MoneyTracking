'use strict';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity, Pressable, Button} from 'react-native';
import { Link, useNavigation, useRouter, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { TransactionContainer } from '@/components/TransactionContainer';


function WalletItem(props) {
  return (
      <ThemedView className={`flex flex-col p-6 rounded-xl ${props.color} mt-4`}>
        <View className="flex flex-col">
          <ThemedText className="text-slate-100 text-2xl font-semibold">{props.type}</ThemedText>
          <View className="mt-6">
            <View className="flex flex-row justify-between">
              <ThemedText className="text-slate-100">Balance</ThemedText>
              <ThemedText className="text-slate-100">{100 * props.progressbar}%</ThemedText>
            </View>
            <View className="mt-2">
                <ProgressBar color={props.colorbar} progress={props.progressbar} width={305} />
            </View>
            <View className="flex flex-row justify-between mt-2">
                <View className="flex flex-row">
                    <ThemedText className="text-xl text-slate-100 font-bold">{props.balance}</ThemedText>
                    <ThemedText className="text-base text-slate-100 self-end"> of {props.goal}</ThemedText>
                </View>
                <ThemedText className="text-base text-slate-100 self-end">{props.dayleft} days left</ThemedText>
            </View>
          </View>
          <Link href={`/savingdetails/${props.id}`} className="text-base text-slate-100 font-semibold mt-3">See detail</Link>
        </View>
      </ThemedView>
  );
}

function AddWallet(props) {
  return (
    <ThemedView className="p-1 bg-transparent">
      <AntDesign name="pluscircle" size={24} color="black" />
    </ThemedView>
  );
}

// const SavingItem = [
//   {
//     id: 1,
//     icon: 'phone',
//     name: 'Iphone 13 Mini',
//     balance: '$1,000.00',
//     goal: '$3,000.00',
//     progressbar: 0.3,
//     colorbar: 'orange',
//   },
//   {
//     id: 2,
//     icon: 'computer',
//     name: 'Macbook Pro M1',
//     balance: '$1,300.00',
//     goal: '$3,000.00',
//     progressbar: 0.9,
//     colorbar: 'pink',
//   },
//   {
//     id: 3,
//     icon: 'computer',
//     name: 'Car',
//     balance: '$1,300.00',
//     goal: '$3,000.00',
//     progressbar: 0.9,
//     colorbar: 'yellow',
//   },
//   {
//     id: 4,
//     icon: 'paypal',
//     name: 'House',
//     balance: '$1,300.00',
//     goal: '$13,300.00',
//     progressbar: 0.9,
//     colorbar: 'blue',
//   },
//   {
//     id: 5,
//     icon: 'paypal',
//     name: 'Study Abroad',
//     balance: '$23,300.00',
//     goal: '$233,000.00',
//     progressbar: 0.01,
//     colorbar: 'green',
//   }
// ];

const SavingItem = [];

export default function WalletScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const listSavings = () => { 
    if (SavingItem.length === 0) {
      return (
          <View style={styles.container} className="flex-1">
            <Image
                source={require('../assets/images/empty icon.png')}
                style={{width: 150, height: 150}}
                className="m-0"
            />
            <ThemedText className="text-center text-black text-lg font-semibold">No Saving Wallet Added Yet.</ThemedText>
            <Text className="text-center text-black text-base font-normal mt-2">Tap 'Add Saving Wallet' button to add your first Saving Wallet{'\n'} to start a dream. </Text>
            <Pressable style={styles.button} className="mt-2" onPress={() => {router.push(`/AddSavingAccount/`)}}>
                <Text style={styles.text}>Add Saving Wallet</Text>
            </Pressable>
          </View>
      );
    } else if (SavingItem.length > 0) {
      return (
        <View className="flex bg-transparent">
          {SavingItem.map((item) => (
            <Pressable key={item.id} onPress={() => {router.push(`./savingdetails/${item.id}`)}}>
                <WalletItem id={item.id} type={item.name} balance={item.balance} goal={item.goal} color="bg-blue-500" colorbar="white" progressbar={item.progressbar} dayleft={65}/>
            </Pressable>
          ))}
        </View>
      );
    }
  }

  return (
    <View style={styles.container} className=" bg-slate-100">
      <Stack.Screen
            options={{
                title: "Saving",
                headerTintColor: '#000',
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </Pressable>
                ),
            }}
            />
      <View style={styles.container} className="w-2/3 bg-transparent">
          {listSavings()}
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

