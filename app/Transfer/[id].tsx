import { Image, StyleSheet, Platform, View, Text, ScrollView, Button, Pressable, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Link, useNavigation, useRouter, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect, React } from 'react';
import moment from 'moment';
import { useBetween } from 'use-between';

import { DropDownContainer } from '@/components/DropDownContainer.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { im } from 'mathjs';

export default function TransferScreen() {
    const [idParam, setIdParam] = useState(useLocalSearchParams());
    console.log(idParam);
    const router = useRouter();
    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker, setShowPicker] = useState(false);

    // State variables for each input field
    const [timestamp, setTimestamp] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [toWallet, setToWallet] = useState('');
    const [category, setCategory] = useState('Transfer between wallets');
    const [walletId, setWalletId] = useState('');
    const [memo, setMemo] = useState('');
    const [icons, setIcons] = useState('computer');
    const [id, setId] = useState(0);


    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@transactions_key');
          console.log("jsonValue", jsonValue);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };

    // Function to add a new transaction
    const storeData = async (newTransaction) => {
        try {
        // Get the current list of transactions
        const jsonValue = await AsyncStorage.getItem('@transactions_key');
        let transactions = jsonValue != null ? JSON.parse(jsonValue) : [];
        // Check the last indexId and increment it
        const lastTransaction = transactions[transactions.length - 1];
        if (lastTransaction) {
            newTransaction.id = lastTransaction.id + 1;
        } else {
            newTransaction.id = 1;
        }
    
        // Add the new transaction to the list
        transactions.push(newTransaction);
    
        // Save the updated list back to storage
        await AsyncStorage.setItem('@transactions_key', JSON.stringify(transactions));
        console.log('Transaction added successfully');
        } catch (e) {
        console.error('Failed to add transaction.', e);
        }
    };

    // Function to handle the submission
    const handleSubmit = () => {
        // Gather all the values
        const data = {
            id,
            walletId,
            toWallet,
            category,
            timestamp, 
            icons,
            amount,
            name,
            memo,
        };
        // set date to milliseconds
        data.timestamp = data.timestamp.setMilliseconds(0);
        // set amount to minus number
        data.amount = -Math.abs(data.amount);
        // check data empty before submit
        if (data.amount == '' || data.name == '' || data.toWallet == '' || data.walletId == '') {
            alert('Please fill all the fields');
            return;
        } else {
            storeData(data);
            // You can now handle the data, e.g., send it to an API
            alert('Data submitted successfully');
            // clear all input fields
            setAmount('');
            setName('');
            setMemo('');
            setToWallet('');
            setWalletId('');
            // router to wallet after click ok on alert
            router.push(idParam.id == 99 ? '/' : 'wallet');
        }
    };


    const onChange = (e, selectedDate) => {
        setSelectedDate(selectedDate);
    }
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const realtime = timestamp.toLocaleString()

    const onCancelPress = () => {
        setTimestamp(date);
        setShowPicker(false);
    };

    const onSummitPress = () => {
        setTimestamp(selectedDate);
        setShowPicker(false);
    };

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            {children}
        </TouchableWithoutFeedback>
    );

    const [TransactionItem, setTransactionItem] = useState([]);

    const storeUser = async () => {
        try {
          await AsyncStorage.setItem("TransactionItem", JSON.stringify(TransactionItem));
        } catch (error) {
          console.log(error);
        }
      };

    
    const [dataFromChild, setDataFromChild] = useState('');

    const handleDataFromWallet = (data) => {
      setDataFromChild(data);
      setWalletId(data);
      console.log("From Wallet" + data);
    };

    const handleDataToWallet = (data) => {
        setToWallet(data);
        console.log("To Wallet" + data);
    };
  

  return (
    <View className="flex-1 flex-col bg-slate-100">
        <Stack.Screen
        options={{
          title: 'Transfer',
          headerStyle: { backgroundColor: '#0099e5' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{ marginRight: 0 }}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Pressable onPress={() => { idParam.id == 99 ? navigation.navigate('index') : navigation.navigate('wallet') }}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
            ),
        }}
        />
        <View className="bg-transparent">
            <View className="bg-transparent">
                <View className="flex flex-row bg-white w-full">
                    <View className="w-4/12 flex justify-center">
                        <Link href={`../Income/${idParam.id}`} className="w-full flex flex-col justify-center">
                            <View className="flex flex-row p-3 w-full">
                                <ThemedText className="text-base font-semibold text-center mt-1 w-full">Income</ThemedText>
                            </View>
                        </Link>
                    </View>
                    <View className="w-4/12 flex justify-center">
                        <Link href={`../Expanse/${idParam.id}`} className="w-full flex flex-col justify-center">
                            <View className="flex flex-row p-3 w-full">
                                <ThemedText className="text-base font-semibold text-center mt-1 w-full">Expanse</ThemedText>
                            </View>
                        </Link>
                    </View>
                    <View className="bg-[#0099e5] w-4/12">
                        <View className="p-2 m-1 self-center">
                            <ThemedText className="text-lg text-white font-semibold">Transfer</ThemedText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        
        <TouchableOpacity onPressIn={() => {setShowPicker(false)}}>
            <ScrollView>
            <View className="divide-y-2">
                <ThemedView className="flex mx-5 bg-transparent">
                    <View className="mt-2 p-4 bg-white rounded-lg">
                        <View className="">
                            <ThemedText className="font-bold">Select Date</ThemedText>
                            <View className="flex flex-col">
                                <Pressable onPress={toggleDatePicker}>
                                    <TextInput 
                                        placeholder={realtime}
                                        placeholderTextColor="#000"
                                        color="#A9A9AC"
                                        value={timestamp} 
                                        className="p-2 text-base rounded-lg w-full" 
                                        onPress={toggleDatePicker}
                                        editable={false} 
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View className="mt-3 border-b border-gray-400">
                            <ThemedText className="font-bold">Amount</ThemedText>
                            <View className="flex flex-col">
                                <Pressable>
                                    <TextInput 
                                        placeholder="$ 0"
                                        placeholderTextColor="#A9A9AC" 
                                        value={amount}
                                        onChangeText={setAmount}
                                        className="p-2 text-base rounded-lg w-full" 
                                        keyboardType="numeric"
                                        enterKeyHint='done'
                                        editable={true} 
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View className="mt-3 border-b border-gray-400">
                            <ThemedText className="font-bold">Name</ThemedText>
                            <View className="flex flex-col">
                                <Pressable>
                                    <TextInput 
                                        placeholder="Transfer to Main Wallet"
                                        placeholderTextColor="#A9A9AC"
                                        value={name}
                                        onChangeText={setName}
                                        className="p-2 text-base rounded-lg w-full"
                                        keyboardType="default"
                                        enterKeyHint='done'
                                        editable={true} 
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View className="mt-3">
                            <ThemedText className="font-bold">From wallet</ThemedText>
                            <View className="flex flex-col">
                                <DropDownContainer placeholder="Select Wallet" type="wallet" onSendData={handleDataFromWallet}/>
                            </View>
                        </View>
                        <View className="mt-3">
                            <ThemedText className="font-bold">To Wallet</ThemedText>
                            <View className="flex flex-col">
                                <DropDownContainer placeholder="Select Wallet"  type="wallet" id={idParam.id} onSendData={handleDataToWallet}/>
                            </View>
                        </View>      
                    </View>
                    <View className="mt-3 p-4 bg-white rounded-lg">
                        <View className="">
                            <ThemedText className="font-bold">Memo</ThemedText>
                                <View className="flex flex-col">
                                    <Pressable >
                                        <TextInput 
                                            placeholder="Add a note"
                                            placeholderTextColor="#A9A9AC"
                                            value={memo}
                                            onChangeText={setMemo}  
                                            className="p-2 text-base rounded-lg w-full"
                                            keyboardType='default'
                                            enterKeyHint='done'
                                            editable={true} 
                                        />
                                    </Pressable>
                                </View>
                        </View>
                    </View>
                </ThemedView> 
            </View>
            </ScrollView>
        </TouchableOpacity>

        <View style={styles.dateContainer} className="">
            <View className=" w-full">
                {showPicker && (
                    <View className="p-1 bg-white">
                        <View className="flex flex-row justify-between">
                            <TouchableOpacity className="p-2 ml-2" onPress={onCancelPress}>
                                <Text className="text-base text-red-500">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="p-2 mr-2" onPress={onSummitPress}>
                                <Text className="text-base text-green-500">Summit</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={timestamp}
                            mode="datetime"
                            onChange={onChange}
                            display="spinner"
                        /> 
                    </View>               
                    )}     
            </View> 
        </View>
        
    </View>
    
  );
}

const styles = StyleSheet.create({
    dateContainer: {
        position: 'absolute',
        width: '100%',
        bottom:0,
        left:0,
    }
});