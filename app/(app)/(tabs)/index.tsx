
import { Image, StyleSheet, RefreshControl, Platform, FlatList, View, Text, ScrollView, TouchableOpacity, Pressable, Touchable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { TransactionContainer } from '@/components/TransactionContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';

function EaringTypeContainer(props) {
  return (
      <ThemedView className={`flex flex-col p-6 rounded-lg mr-3 ${props.bgcolor}`}>
          <View className="flex flex-row justify-center">
            <ThemedView 
              className="flex flex-col justify-center rounded-full mb-2"
              style={{ width: 30 , height: 30 , borderRadius: 50, backgroundColor: '#fff'}}>
              <ThemedText className="text-black text-base text-center font-semibold">{props.typeSlice}</ThemedText>
            </ThemedView>
          </View>
          
          <ThemedText className="text-white text-base font-light text-center">{props.type}</ThemedText>
          <ThemedText className="text-white text-lg font-bold text-center">$ 1,000.00</ThemedText>
      </ThemedView>
  );
};

function SavingTypeContainer(props) {
  return (
      <View className='m-1'>
        <View className={`flex flex-col p-6 rounded-lg bg-white w-max`}>
            <View className="flex flex-row">
              <View className="flex flex-col">
                <ThemedText className="text-base font-light">{props.name}</ThemedText>
                <ThemedText className="text-lg font-bold">{props.balance}</ThemedText>
              </View>
            </View>
            <View className="mt-4">
              <ProgressBar color={props.colorbar} progress={props.progressbar} width={null} />
            </View>
        </View>
      </View>
  );
};

function ButtonAction(props) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeCardStyle = colorScheme === 'light' ? styles.lightThemeCard : styles.darkThemeCard;

  return (
    <TouchableOpacity onPress={props.handleClick}>
      <ThemedView className="flex flex-col justify-center bg-transparent">
        <ThemedView className="bg-white p-4 rounded-full">
          <MaterialIcons name={props.icons} size={24} color="#242c40" />
        </ThemedView>
        <ThemedView className="bg-transparent mt-1">
          <ThemedText style={themeTextStyle} className="text-base text-center">{props.name}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

function handleClickAdd() {
  router.push(`../Income/${99}`);
  // alert('Already added');
}

function handleClickExpanse() {
  router.push(`../Expanse/${99}`);
  // alert('Already Expanse');
}

function handleClickTransfer() {
  router.push(`../Transfer/${99}`);
  // alert('Already Transfer');
}

function handleClickWallet() {
  router.replace('/wallet');
  //alert('Already change to Wallet page');
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

// const TransactionItem = [
//   {
//     id: 1,
//     timestamp: 1721721168,
//     icons: 'computer',
//     name: 'Adobe lllusrator',
//     type: 'Expanse',
//     category: 'Subcription fee',
//     number: '-32.00',
//   },
//   {
//     id: 2,
//     timestamp: 1721721168,
//     icons: 'computer',
//     name: 'Dribble',
//     type: 'Expanse',
//     category: 'Subcription fee',
//     number: '-15.00',
//   },
//   {
//     id: 3,
//     timestamp: 1721721168,
//     icons: 'fastfood',
//     name: 'Dinner',
//     type: 'Expanse',
//     category: 'Food',
//     number: '-2.00',
//   },
//   {
//     id: 4,
//     timestamp: 1721721168,
//     icons: 'paypal',
//     name: 'Paypal',
//     type: 'Income',
//     category: 'Salary',
//     number: '+32.00',
//   },
//   {
//     id: 5,
//     timestamp: 1721721168,
//     icons: 'paypal',
//     name: 'Paypal',
//     type: 'Income',
//     category: 'Bonus',
//     number: '+123.00',
//   }
// ];

const TransactionItem = [];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeCardStyle = colorScheme === 'light' ? styles.lightThemeCard : styles.darkThemeCard;

  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpanse, setTotalExpanse] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(true);
    }, 500);
  }, []);

  const [transactions, setTransactions] = useState([]);
  transactions.sort((a, b) => b.timestamp - a.timestamp);

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

  useEffect(() => {
      const income = transactions.filter((item) => (item.amount > 0)).map((item) => item.amount);
      const expanse = transactions.filter((item) => (item.amount < 0)).map((item) => item.amount);

      const totalIncome = income.reduce((acc, item) => acc + parseFloat(item), 0);
      const totalExpanse = expanse.reduce((acc, item) => acc + parseFloat(item), 0);
      const lastbalance = (totalIncome + totalExpanse).toFixed(2);

      setTotalIncome(totalIncome);
      setTotalExpanse(totalExpanse);
      setTotalBalance(lastbalance);
  }, [isLoading]);

  // const listSavings = SavingItem.slice(0, 4).map((item) => (
  //   <Pressable className="w-1/2" key={item.id} onPress={() => {router.push(`./savingdetails/${item.id}`)}}>
  //       <SavingTypeContainer  colorbar={item.colorbar} name={item.name} balance={item.balance} progressbar={item.progressbar}/>
  //   </Pressable>
  //   )
  // ); 

  function listSaving() {
    if (SavingItem.length > 0) {
      return SavingItem.slice(0,4).map((item) => (
          <Pressable className="w-1/2" key={item.id} onPress={() => {router.push(`./savingdetails/${item.id}`)}}>
              <SavingTypeContainer  colorbar={item.colorbar} name={item.name} balance={item.balance} progressbar={item.progressbar}/>
          </Pressable>
      ));
    } else {
      return (
        <Pressable className="w-full" onPress={() => {router.push(`../AddSavingAccount/`)}}>
          <ThemedView className={`flex-1 m-2 p-8 flex-row justify-center border-2 items-center border-dashed rounded-lg bg-transparent ${colorScheme === 'light' ? "border-black" : "border-slate-200"}`}>
            <Feather name="plus" size={24} color={colorScheme === 'light' ? "#242c40" : "#d0d0c0"} />
            <ThemedText className="font-semibold text-center">Saving Account</ThemedText>
          </ThemedView>
        </Pressable>
    );
    }
  }

  const listTransactions = transactions.slice(0, 4).map((item) => (
    <TransactionContainer key={item.id} icons={item.icons} name={item.name} category={item.category} number={item.amount}/>
  ));

  function listTransaction() {
    if (transactions.length > 0) {
      return transactions.slice(0,4).map((item) => (
        <TransactionContainer key={item.id} icons={item.icons} name={item.name} category={item.category} number={item.amount}/>
      ));
    } else {
      return (
        <ThemedView className="flex flex-row justify-center bg-transparent">
          <ThemedText className="text-base font-base mt-2">No Transactions</ThemedText>
        </ThemedView>
      );
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <ScrollView className="bg-slate-100" style={[themeContainerStyle]}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <ThemedView className="flex-1 mt-14 bg-transparent">
        <ThemedView className="mx-5 mt-5 bg-transparent">
          <ThemedView className="flex bg-transparent">
            <Text style={themeTextStyle} className="text-lg">Hi, Friend!</Text>
            <Text style={themeTextStyle} className="text-lg font-bold">Welcome to Money Saver</Text>
          </ThemedView>

          <ThemedView style={themeCardStyle} className="flex mt-4 rounded-lg p-6">
            <ThemedText style={colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText}>Your balance :</ThemedText>
            <ThemedText style={colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText} className="text-3xl font-bold">${numberWithCommas(totalBalance)}</ThemedText>
          </ThemedView>  

          <ThemedView style={themeCardStyle} className="flex flex-row justify-between mt-4 rounded-lg p-6">
            <ThemedView style={themeCardStyle} className="flex flex-row justify-center">
              <ThemedView style={themeCardStyle} className="flex flex-col justify-center mr-1">
                <Image
                    source={require('@/assets/images/pointer-down.png')}
                    style={{width: 30, height: 40}}
                    className=""
                />
              </ThemedView>
              <ThemedView style={themeCardStyle} className="flex flex-col justify-center">
                  <ThemedText style={colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText}>Income :</ThemedText>
                  <ThemedText style={colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText} className="text-xl font-bold">$ {numberWithCommas(totalIncome)}</ThemedText>
              </ThemedView>
            </ThemedView>


            <ThemedView style={themeCardStyle} className="flex flex-row justify-center">
              <ThemedView style={themeCardStyle} className="flex flex-col justify-center mr-2 ">
                <Image
                    source={require('@/assets/images/pointer-up.png')}
                    style={{width: 30, height: 40}}
                    className=""
                />
              </ThemedView>
              <ThemedView style={themeCardStyle} className="flex flex-col justify-center">
                  <ThemedText style={colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText}>Outcome :</ThemedText>
                  <ThemedText style={colorScheme === 'light' ? styles.darkThemeText : styles.lightThemeText} className="text-xl font-bold">$ {numberWithCommas(totalExpanse)}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView> 

          <ThemedView className="flex flex-row justify-around mt-4 bg-transparent">
            <ButtonAction name="Receive" icons="add" handleClick={handleClickAdd} />
            <ButtonAction name="Expanse" icons="remove" handleClick={handleClickExpanse} />
            <ButtonAction name="Transfer" icons="file-upload" handleClick={handleClickTransfer} />
            <ButtonAction name="Wallet" icons="wallet" handleClick={handleClickWallet} />
          </ThemedView>
          
          <View className="bg-transparent">
            <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                <ThemedText className="text-2xl font-semibold">Savings :</ThemedText>
                <Link href="/SavingsPage" className="text-blue-500 text-base font-semibold self-end">See All</Link>
            </ThemedView>
            <ThemedView className="flex flex-row flex-wrap bg-transparent">
              {listSaving()}
            </ThemedView>
          </View>


          <View className="bg-transparent">
            <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
              <ThemedText className="text-2xl font-semibold">Transactions :</ThemedText>
              <Link href="/statistics" className="text-blue-500 text-base font-semibold self-end">See All</Link>
            </ThemedView>

            <ThemedText className="text-lg font-normal mt-3">Recently</ThemedText>

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
