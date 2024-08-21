import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useNavigation, useRouter, Stack } from "expo-router";
import { Component, useEffect, useState } from 'react';
import { Image, StyleSheet, RefreshControl, Platform, FlatList, View, Text, ScrollView, TouchableOpacity, Pressable, Touchable } from 'react-native';
import React from 'react';
import { useBetween } from 'use-between';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { TransactionContainer } from '@/components/TransactionContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cos, re } from 'mathjs';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

function SavingListContainer(props) {
  return (
    <ThemedView className="flex flex-row justify-between p-4 rounded-lg bg-white mt-3">
        <View className="flex flex-row">
            <View className="self-center">
                <MaterialIcons name={props.icons} size={24} color="black" />
            </View>
            <View className="flex justify-center">
                <View className="flex flex-row ml-5 justify-between">
                    <View className="flex flex-row">
                        <ThemedText className="text-lg font-bold">{props.name}</ThemedText>
                    </View>
                    <View className="flex flex-row">
                        <Text className={`text-lg font-semibold text-black`}>
                            {props.balance}
                        </Text>
                    </View>
                </View>
                    <View className="ml-5 mt-2">
                        <ProgressBar color={props.colorbar} progress={props.progressbar} width={275} />
                    </View>
                </View>
        </View>
    </ThemedView>
  );
}

function ButtonAction(props) {
  return (
    <Pressable onPress={props.handleClick}>
      <ThemedView className="flex flex-col justify-center bg-transparent">
        <ThemedView className="p-4 bg-white rounded-full">
          <MaterialIcons name={props.icons} size={24} color="black" />
        </ThemedView>
        <ThemedView className="bg-transparent mt-1">
          <ThemedText className="text-black text-base text-center">{props.name}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

// This is transaction data for testing
//const TransactionItem = [];
// const TransactionItem = [
//   {
//     id: 1,
//     walletId: 1,
//     timestamp: 1721721168,
//     icons: 'computer',
//     name: 'Adobe lllusrator',
//     type: 'Expanse',
//     category: 'Subcription fee',
//     number: '-32.00',
//   },
//   {
//     id: 2,
//     walletId: 1,
//     timestamp: 1721721168,
//     icons: 'computer',
//     name: 'Dribble',
//     type: 'Expanse',
//     category: 'Subcription fee',
//     number: '-15.00',
//   },
//   {
//     id: 3,
//     walletId: 2,
//     timestamp: 1721721168,
//     icons: 'fastfood',
//     name: 'Dinner',
//     type: 'Expanse',
//     category: 'Food',
//     number: '-2.00',
//   },
//   {
//     id: 4,
//     walletId: 2,
//     timestamp: 1721721168,
//     icons: 'paypal',
//     name: 'Paypal',
//     type: 'Income',
//     category: 'Salary',
//     number: '+32.00',
//   },
//   {
//     id: 5,
//     walletId: 3,
//     timestamp: 1721721168,
//     icons: 'paypal',
//     name: 'Paypal',
//     type: 'Income',
//     category: 'Bonus',
//     number: '+123.00',
//   }
// ];


// This is saving data for testing
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
const SavingItem: any[] = [];

function addSaving() {
  return (
    <View className="flex-1 m-2 p-8 flex-row justify-center border-2 items-center border-dashed rounded-lg ">
        <Feather name="plus" size={24} color="black" />
        <Text className="font-semibold text-black">Saving Account</Text>
    </View>
  );
}

export default function WalletScreen() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [walletarray, setWalletArray] = React.useState([1,2,3]);

  const [index, setIndex] = React.useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(true);
    }, 500);
  }, []);

  const TransactionLoader = () => (
      <ContentLoader 
          speed={4}
          width={400}
          height={60}
          viewBox="0 0 400 60"
          backgroundColor="#75797b"
          foregroundColor="#ffffff"
        >
          <Rect x="70" y="16" rx="3" ry="3" width="88" height="6" /> 
          <Rect x="70" y="32" rx="3" ry="3" width="52" height="6" />
          <Circle cx="30" cy="30" r="25" />
      </ContentLoader>
  )

  const WalletLoader = () => (
    <ContentLoader 
        speed={4}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#75797b"
        foregroundColor="#ffffff"
      >
        <Rect x="20" y="20" rx="3" ry="3" width="88" height="8" /> 
        <Rect x="20" y="40" rx="3" ry="3" width="128" height="18" />
        <Rect x="20" y="120" rx="3" ry="3" width="48" height="8" />
        <Rect x="20" y="140" rx="3" ry="3" width="88" height="8" /> 
    </ContentLoader>
  )
  
  useEffect(() => {
      const loadInitialData = async () => {
        try {
          const data = await AsyncStorage.getItem('@wallet');
          if (data) {
            setWalletArray(JSON.parse(data));
          } else {
            const initialArray = 
            [
              {
                id: 1,
                name: 'Spending',
                accountname: 'Main Wallet',
                initail: '$0',
                description: 'This is my saving account',
                memo: 'This is my spending account',
                balance: 0,
              },
              {
                id: 2,
                name: 'Saving',
                accountname: 'Ratchanon Suntornsalitkul',
                initail: '$0',
                description: 'This is my saving account',
                memo: 'This is my spending account',
                balance: 0,
              },
            ];
            setWalletArray(initialArray);
            await AsyncStorage.setItem('@wallet', JSON.stringify(initialArray));
          }
        } catch (error) {
          console.log('Error loading initial data', error);
        }
      };
      loadInitialData();
    }, []);

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@transactions_key');
        setTransactions(jsonValue != null ? JSON.parse(jsonValue) : []);
        setLoading(false);
      } catch (e) {
        console.error('Error reading value', e);
      }
    };
    getData();
  }, [isLoading]);

  const WalletIni = () => {
    const ref = React.useRef<FlatList>(null);
    const data = walletarray;
  
    React.useEffect(() => {
      ref.current?.scrollToIndex({ 
        index: index, 
        animated: true,
        viewPosition: 0,
        viewOffset: 0,
      });
    }, [index]);
    
    return {
        index,
        setIndex,
        data,
        ref,
        Component:
      (
        <ThemedView className="flex flex-row bg-transparent">
          <FlatList
            ref={ref}
            initialScrollIndex={index}
            data={data}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setIndex(index)}>
                <ThemedView className="flex rounded-lg p-2 mr-3">
                  <ThemedView className="flex flex-row p-4 rounded-lg bg-white mt-3">
                    <View className="flex flex-col">
                      <ThemedText>Total Balance</ThemedText>
                      <ThemedText className="text-2xl font-semibold">{item.balance}</ThemedText>
                      <ThemedText className="mt-4">{item.accountnumber}</ThemedText>
                      <View className="mt-2">
                        <ThemedText>Name</ThemedText>
                        <ThemedText className="font-semibold">{item.accountname}</ThemedText>
                      </View>
                    </View>
                    <View className="ml-8">
                      <Image
                        source={require('@/assets/images/react-logo.png')}
                        style={{ width: 40 , height: 40 }}
                      />
                    </View>
                  </ThemedView>
                </ThemedView>
              </TouchableOpacity>
            )}
            //setIndex to ViewableItems index when viewableItems changed
            onViewableItemsChanged={({ viewableItems }) => {
              setIndex(viewableItems[0].index);
            }
            }
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 40}}
            getItemLayout={(data, index) => (
              {length: 310, offset: 305 * index, index}
            )}
          />
        </ThemedView>
      )
    };
  }
  
  const Wallet = () => {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
    const { index, setIndex, ref, data } = useBetween(WalletIni);
    
    React.useEffect(() => {
      ref.current?.scrollToIndex({ 
        index: index, 
        animated: true,
        viewPosition: 0,
        viewOffset: 0,
      });
    }, [index]);
  
    return (
      <ThemedView className="flex flex-row bg-transparent">
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          data={data}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setIndex(index)}>
              <ThemedView className="flex rounded-lg p-2 mr-3 w-80">
                <ThemedView className="flex flex-row p-4 rounded-lg bg-white mt-3">
                  <View className="flex flex-col">
                    <ThemedText>Total Balance</ThemedText>
                    <ThemedText className="text-2xl font-semibold">{"$"+ numberWithCommas(Math.floor(item.balance).toFixed(2))}</ThemedText>
                    <View className="mt-6">
                      <ThemedText>Name</ThemedText>
                      <ThemedText className="font-semibold">{item.accountname}</ThemedText>
                    </View>
                  </View>
                </ThemedView>
              </ThemedView>
            </TouchableOpacity>
          )}
          //setIndex to ViewableItems index when viewableItems changed
          onViewableItemsChanged={({ viewableItems }) => {
            setIndex(viewableItems[0].index);
          }
          }
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
          getItemLayout={(data, index) => (
            {length: 310, offset: 305 * index, index}
          )}
        />
      </ThemedView>
    );
  }

  const passingIndex = index + 1;
  const TransactionForWallet = transactions ? transactions.filter((item) => item.walletId === passingIndex) : [];
  const TransactionTransfer = transactions ? transactions.filter((item) => item.toWallet === passingIndex && item.category === "Transfer between wallets") : [];
  TransactionTransfer.map((item) => item.amount = -item.amount);

  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    // sum of all transactions
    const sum = TransactionForWallet.reduce((acc, item) => acc + parseInt(item.amount), 0);
    const sumTransfer = TransactionTransfer.reduce((acc, item) => acc + -parseInt(item.amount), 0);
    console.log('sum', sum);

    for (let i = 0; i < walletarray.length; i++) {
      console.log(walletarray[i].id);
      if (walletarray[i].id === passingIndex) {
        walletarray[i].balance = sum + sumTransfer;
      }
      const setObjectValue = async (value) => {
        try {
          await AsyncStorage.setItem('@wallet', JSON.stringify(value));
        } catch (error) {
          console.log('Error saving data', error);
        }
      };
      setObjectValue(walletarray);
    }
  }, [isLoading]);

  // reverse the order of the transactions
  const listTransactionAll = TransactionForWallet.concat(TransactionTransfer);
  const listTransactionAllSorted = listTransactionAll.sort((a, b) => b.timestamp - a.timestamp);

  const listTransactionsAll = listTransactionAllSorted.map((item) => (
    <TransactionContainer key={item.id} icons={item.icons} name={item.name} category={item.category} number={item.amount }/>
  ));

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }


  const router = useRouter();
  const navigation = useNavigation();

  function handleClickAdd() {
    const data = { index: index };
    console.log("data from WalletScreen", data);
    router.push(`../../Income/${index}`);
  }

  function handleClickShare() {
    const data = { index: index };
    console.log("data from WalletScreen", data);
    router.push(`../../Expanse/${index}`);
  }
  
  function handleClickTransfer() {
    const data = { index: index };
    console.log("data from WalletScreen", data);
    router.push(`../../Transfer/${index}`);
  }
  
  function handleClickEdit() {
    router.push(`../../EditWalletAccount/${index}`);
  }

  function listTransaction() {
    if (isLoading===true) {
      return (
        <View>
          <ThemedView className={`flex flex-row justify-between p-2 rounded-lg bg-white mt-3`}>
            <TransactionLoader />
          </ThemedView>
          <ThemedView className={`flex flex-row justify-between p-2 rounded-lg bg-white mt-3`}>
            <TransactionLoader />
          </ThemedView>
          <ThemedView className={`flex flex-row justify-between p-2 rounded-lg bg-white mt-3`}>
            <TransactionLoader />
          </ThemedView>
        </View>
      );
    }
    else if (TransactionForWallet.length === 0 && TransactionTransfer.length === 0 && isLoading === false) {
      return (
        <ThemedView className="flex flex-row justify-center bg-transparent">
          <ThemedText className="text-base font-base mt-2">No Transactions</ThemedText>
        </ThemedView>
      );
    } else {
      return (
        <View className="flex justify-between mb-3">
          {listTransactionsAll}
        </View>
      );
    }
  }

  const listSaving = () => {
    console.log(SavingItem.length === 0 ? "No Saving" : "Saving");
    if (SavingItem.length > 0) {
      console.log("Saving");
      return SavingItem.slice(0,4).map((item) => (
        <Pressable key={item.id} onPress={() => {router.push(`/savingdetails/${item.id}`)}}>
            <SavingListContainer icons={item.icon} name={item.name} progressbar={item.progressbar} balance={item.balance}/>
        </Pressable>
      ));
    } else if (SavingItem.length === 0) {
      return (
        <View className="h-32">
          <Pressable key="empty-state" className="h-full w-full" onPress={() => {router.push(`../AddSavingAccount/`)}}>
            <View className="flex-1 h-full m-2 p-8 flex-row justify-center border-2 items-center border-dashed rounded-lg ">
                <Feather name="plus" size={24} color="black" />
                <Text className="font-semibold text-black">Saving Account</Text>
            </View>
          </Pressable>
        </View>
    );
    }
  }

  function listwallet() {
      if (isLoading === true) {
        return (
          <View>
            <ThemedView className={`flex flex-row justify-between p-2 rounded-lg bg-white mt-3`}>
              <WalletLoader />
            </ThemedView>
          </View>
        );
      } else {
        console.log('walletarray', walletarray);
        return (
          <View>
            <Wallet />
          </View>
        );
    }
    }
  

  return (
    <ScrollView className="bg-slate-100" refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <ThemedView className="flex-1 mt-14 bg-transparent">
        <ThemedView className="mx-5 mt-5 bg-transparent">
          <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
            <ThemedText className="text-xl font-semibold">Wallet</ThemedText>
          </ThemedView>
          <View className="flex flex-row bg-transparent">
            <View className="">
              {listwallet()}
            </View>
          </View>
          <ThemedView className="flex flex-row justify-around mt-4 bg-transparent">        
            <ButtonAction name="Receive" icons="add" handleClick={handleClickAdd} />
            <ButtonAction name="Transfer" icons="file-upload" handleClick={handleClickTransfer} />
            <ButtonAction name="Share" icons="share" handleClick={handleClickShare} />
            <ButtonAction name="Edit" icons="keyboard-control" handleClick={handleClickEdit} />
          </ThemedView>

            <View className="bg-transparent">
                <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                  <ThemedText className="text-2xl font-semibold">Transactions :</ThemedText>
                  <Pressable onPress={clearAll}>
                      <Octicons name="filter" size={24} color="black" />
                  </Pressable>
                </ThemedView>
                <Text className="text-lg font-normal mt-3">Recently</Text>
                <View className="flex justify-between mb-3">
                  {listTransaction()}
                </View>
            </View>

            <View className="bg-transparent">
                <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                    <ThemedText className="text-2xl font-semibold">Saving :</ThemedText>
                    <Link href="/SavingsPage" className="text-blue-500 text-base font-semibold self-end">See All</Link>
                </ThemedView>

                <View className="flex justify-between mb-3">
                    {listSaving()}
                </View>
            </View> 

          <StatusBar style="auto" />
        </ThemedView>
      </ThemedView>    
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
