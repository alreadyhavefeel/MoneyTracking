import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, FlatList, View, Text, ScrollView, TouchableOpacity, Pressable, Touchable } from 'react-native';
import { Link, useNavigation, useRouter, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useBetween } from 'use-between';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { TransactionContainer } from '@/components/TransactionContainer';

function WalletItem(props) {
  return (
      <ThemedView className={`flex flex-col p-6 rounded-xl ${props.color} mt-3`}>
        <View className="flex flex-col">
          <ThemedText className="text-base">Total Balance</ThemedText>
          <ThemedText className="text-4xl font-semibold mt-1">{props.balance}</ThemedText>
          <View className="mt-10">
            <View className="flex flex-row justify-between">
              <ThemedText className="">Balance</ThemedText>
              <ThemedText className="">{100 * props.progressbar}%</ThemedText>
            </View>
            <View className="mt-2">
                <ProgressBar color="black" progress={props.progressbar} width={null} />
            </View>
            <View className="flex flex-row justify-between mt-2">
                <View className="flex flex-row">
                    <ThemedText className="text-xl font-bold">{props.balance}</ThemedText>
                    <ThemedText className="text-base self-end"> of {props.goal}</ThemedText>
                </View>
                <ThemedText className="text-base self-end">{props.dayleft} days left</ThemedText>
            </View>
          </View>
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

function ButtonAction(props) {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <ThemedView className="flex flex-col justify-center bg-transparent">
        <ThemedView className="p-4 bg-white rounded-full">
          <MaterialIcons name={props.icons} size={24} color="black" />
        </ThemedView>
        <ThemedView className="bg-transparent mt-1">
          <ThemedText className="text-black text-base text-center">{props.name}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

function handleClickAdd() {
  router.push('./Income');
  // alert('Already added');
}

function handleClickShare() {
  router.push('./Expanse');
  // alert('Already Expanse');
}

function handleClickTransfer() {
  router.push('./Transfer');
  // alert('Already Transfer');
}

function handleClickWallet() {
  router.replace('/wallet');
  //alert('Already change to Wallet page');
}

export default function SavingItemScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const SavingItem = [
    {
      id: 1,
      icon: 'phone',
      name: 'Iphone 13 Mini',
      balance: '$1,000.00',
      goal: '$3,000.00',
      progressbar: 0.3,
      colorbar: 'white',
    },
    {
      id: 2,
      icon: 'computer',
      name: 'Macbook Pro M1',
      balance: '$1,300.00',
      goal: '$3,000.00',
      progressbar: 0.9,
      colorbar: 'pink',
    },
    {
      id: 3,
      icon: 'computer',
      name: 'Car',
      balance: '$1,300.00',
      goal: '$3,000.00',
      progressbar: 0.9,
      colorbar: 'yellow',
    },
    {
      id: 4,
      icon: 'paypal',
      name: 'House',
      balance: '$1,300.00',
      goal: '$13,300.00',
      progressbar: 0.9,
      colorbar: 'blue',
    },
    {
      id: 5,
      icon: 'paypal',
      name: 'Study Abroad',
      balance: '$23,300.00',
      goal: '$233,000.00',
      progressbar: 0.01,
      colorbar: 'green',
    }
  ];

  const [activeWalletId, setActiveWalletId] = useState(parseInt(id));// Initialize with the first item or the passed id
  console.log(typeof activeWalletId + ' ' + activeWalletId);
  const wallet = SavingItem.find((item) => item.id === parseInt(activeWalletId));
 
  const TransactionWallet = [
    {
      id: 1,
      timestamp: 1721721168,
      wallet: 'Iphone 13 Mini',
      icons: 'paypal',
      name: 'Paypal',
      type: 'Income',
      category: 'Salary',
      number: '+32.00',
    },
    {
      id: 2,
      timestamp: 1721721168,
      wallet: 'Macbook Pro M1',
      icons: 'paypal',
      name: 'Paypal',
      type: 'Income',
      category: 'Bonus',
      number: '+223.00',
    },
    {
      id: 3,
      timestamp: 1721721168,
      wallet: 'Car',
      icons: 'paypal',
      name: 'Paypal',
      type: 'Income',
      category: 'Bonus',
      number: '+1233.00',
    },
    {
      id: 4,
      timestamp: 1721721168,
      wallet: 'House',
      icons: 'paypal',
      name: 'Paypal',
      type: 'Income',
      category: 'Bonus',
      number: '+1323.00',
    }
  ];

  const TransactionForWallet = TransactionWallet.filter((item) => item.id === wallet?.id);
  const listTransactions = TransactionForWallet.map((item) => (
    <TransactionContainer key={item.id} icons={item.icons} name={item.name} category={item.category} number={item.number}/>
  ));

  function listTransaction() {
    if (TransactionForWallet.length === 0) {
      return (
        <ThemedView className="flex flex-row justify-center bg-transparent">
          <ThemedText className="text-base font-base mt-2">No Transactions</ThemedText>
        </ThemedView>
      );
    } else {
      return (
        <View className="flex justify-between mb-3">
          {listTransactions}
        </View>
      );
    }
  }

  const [isActive, setIsActive] = useState(false);
  
  const WalletSavings = SavingItem.map((item) => (
    <Pressable key={item.id} onPress={() => {setActiveWalletId(item.id); }}>
        <View className={`${parseInt(activeWalletId) === item.id ? "bg-black w-6 h-3 ease-in-out duration-300 delay-700" : "bg-white w-3 h-3 ease-in-out duration-300 delay-700"} mx-1 rounded-full`}></View>
    </Pressable>
    )
  );

  return (
    <ScrollView className="bg-slate-100">
      <Stack.Screen
            options={{
                title: wallet?.name,
                headerTintColor: '#000',
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </Pressable>
                ),
            }}
            />
      <ThemedView className="flex-1 bg-transparent">
        <ThemedView className="mx-5 bg-transparent">
              <View className="flex bg-transparent">
                  <WalletItem type={wallet?.name} balance={wallet?.balance} goal={wallet?.goal} color="bg-white" colorbar="white" progressbar={wallet?.progressbar} dayleft={65}/>
              </View>
          <ThemedView className="flex flex-row justify-center mt-2 bg-transparent">
            {WalletSavings}
            
          </ThemedView>

          <ThemedView className="flex flex-row justify-around mt-4 bg-transparent">
            <ButtonAction name="Receive" icons="add" handleClick={handleClickAdd} />
            <ButtonAction name="Transfer" icons="file-upload" handleClick={handleClickTransfer} />
            <ButtonAction name="Share" icons="share" handleClick={handleClickShare} />
            <ButtonAction name="Edit" icons="keyboard-control" handleClick={handleClickWallet} />
          </ThemedView>

          <View className="bg-transparent">
                <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                  <ThemedText className="text-2xl font-semibold">Transactions :</ThemedText>
                  <Octicons name="filter" size={24} color="black" />
                </ThemedView>
                <Text className="text-lg font-normal mt-3">Today</Text>
                <View className="flex justify-between mb-3">
                  {listTransaction()}
                </View>
          </View>
          

          <StatusBar style="auto" />
        </ThemedView>
      </ThemedView>    
      
    </ScrollView>
  );
}