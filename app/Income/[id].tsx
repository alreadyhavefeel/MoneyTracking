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


export default function IncomeScreen() {
    const [idParam, setIdParam] = useState(useLocalSearchParams());
    console.log(idParam.id);
    const router = useRouter();
    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    // State variables for each input field
    const [timestamp, setTimestamp] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState(0);
    const [walletId, setWalletId] = useState('');
    const [memo, setMemo] = useState('');
    const [icons, setIcons] = useState('computer');
    const [id, setId] = useState(0);

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
        console.log(transactions);
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
            timestamp, 
            icons,
            amount,
            name,
            category,
            memo,
        };
        // set date to milliseconds
        console.log(data.timestamp.setMilliseconds(0));
        data.timestamp = data.timestamp.setMilliseconds(0);
        // check data empty before submit
        if (data.amount == '' || data.name == '' || data.category == 0 || data.walletId == '') {
            alert('Please fill all the fields');
            return;
        } else {
            storeData(data);
            // You can now handle the data, e.g., send it to an API
            alert('Data submitted successfully');
            // clear all input fields
            setAmount('');
            setName('');
            setCategory(0);
            setWalletId('');
            setMemo('');
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

    const DismissKeyboard = ({children}) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

    const handleDataFromChild = (data) => {
      setDataFromChild(data);
      setWalletId(data);
      //console.log(data);
    };

    const handleDataFromCate = (data) => {
        setCategory(data);
        //console.log(data);
      };

return (
    <View className="flex-1 flex-col bg-slate-100">
            <Stack.Screen
            options={{
                title: 'Income',
                headerStyle: { backgroundColor: '#34bf49' },
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
                                    <View className="bg-[#34bf49] w-4/12">
                                            <View className="p-3 self-center">
                                                    <ThemedText className="text-lg text-white font-semibold text-center">Income</ThemedText>
                                            </View>
                                    </View>
                                    
                                    <View className="w-4/12 flex justify-center">
                                            <Link href={`../Expanse/${idParam.id}`} className="w-full flex flex-col justify-center">
                                                    <View className="flex flex-row p-3 w-full">
                                                            <ThemedText className="text-base font-semibold text-center mt-1 w-full">Expanse</ThemedText>
                                                    </View>
                                            </Link>
                                    </View>
    
                                    <View className="w-4/12 flex justify-center">
                                            <Link href={`../Transfer/${idParam.id}`} className="w-full flex flex-col justify-center">
                                                    <View className="flex flex-row p-3 w-full">
                                                            <ThemedText className="text-base font-semibold text-center mt-1 w-full">Transfer</ThemedText>
                                                    </View>
                                            </Link>
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
                                        onPressIn={toggleDatePicker}
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
                                        placeholder="Name"
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
                            <ThemedText className="font-bold">Category</ThemedText>
                            <View className="flex flex-col">
                                <DropDownContainer placeholder="Select Category" type="categoryIncome" onSendData={handleDataFromCate}/>
                            </View>
                        </View>
                        <View className="mt-3">
                            <ThemedText className="font-bold">Wallet</ThemedText>
                            <View className="flex flex-col">
                                <DropDownContainer placeholder="Select Wallet" type="wallet" id={idParam.id} onSendData={handleDataFromChild}/>
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
)
}


const styles = StyleSheet.create({
    dateContainer: {
        position: 'absolute',
        width: '100%',
        bottom:0,
        left:0,
    }
});