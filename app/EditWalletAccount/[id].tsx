import { Image, StyleSheet, Platform, View, Text, ScrollView, Button, Pressable, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Link, useNavigation, useRouter, Stack, useLocalSearchParams } from "expo-router";
// Remove the duplicate import statement for 'useState'
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
import { useEffect, useState } from 'react';

import { DropDownContainer } from '@/components/DropDownContainer.tsx';

export default function IncomeScreen() {
    const { id } = useLocalSearchParams();
    const [walletId, setWalletId] = useState(parseInt(id));

    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker, setShowPicker] = useState(false);

    const router = useRouter();
    const navigation = useNavigation();

    const onChange = (e, selectedDate) => {
        setSelectedDate(selectedDate);
    }
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const realtime = date.toLocaleString()

    const onCancelPress = () => {
        setDate(date);
        setShowPicker(false);
    };

    const onSummitPress = () => {
        setDate(selectedDate);
        setShowPicker(false);
    };

    const DismissKeyboard = ({children}) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    const WalletItems = [
        {
          id: 1,
          name: 'Spending',
          accountname: 'Ratchanon Suntornsalitkul',
          initail: '$0',
          description: 'This is my saving account',
          memo: 'This is my spending account',
          balance: '$20.00',
        },
        {
          id: 2,
          name: 'Saving',
          accountname: 'Ratchanon Suntornsalitkul',
          initail: '$0',
          description: 'This is my saving account',
          memo: 'This is my spending account',
          balance: '$100.00',
        },
      ];

    console.log("WalletId passsing is "+ typeof walletId);
    const wallet = WalletItems.find((item) => item.id === parseInt(walletId + 1));
    console.log(wallet);

    const [value, onChangeValue] = useState({
        accountname: wallet?.accountname,
        description: wallet?.description,
        initail: wallet?.initail,
        memo: wallet?.memo,
    });

    // const [text, onChangeText] = useState(wallet?.accountname);

    // function handleChange(event) {
    //     const { data } = event.target.dataset
    //     const { value } = event.target.value;
    //     console.log(data);
    //     //return old value and new value with dynamic with name
    //     onChangeText((prevValue) => {
    //       return { ...prevValue, [name]: value };
    //       // if (name === "title") {
    //       //   return {
    //       //     title: value,
    //       //     content: prevValue.content,
    //       //   };
    //       // } else if (name === "content") {
    //       //   return {
    //       //     title: prevValue.title,
    //       //     content: value,
    //       //   };
    //       // }
    //     });
    //   }


return (
    <View className="flex-1 flex-col bg-slate-100">
            <Stack.Screen
            options={{
                title: 'Edit Wallet Account',
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: '#000',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </Pressable>
                ),
                headerRight: () => (
                    
                    <TouchableOpacity
                        onPress={() => alert('Saving Account has add!')}
                        style={{ marginRight: 0 }}
                    >
                        <Text className="text-base text-blue-600">Save</Text>
                        
                    </TouchableOpacity>
                ),
            }}
            />

        <TouchableOpacity onPressIn={() => {setShowPicker(false)}}>
        
            <ScrollView>
            <View className="divide-y-2">
                <ThemedView className="flex mx-5 bg-transparent">
                    <View className="mt-2 p-4 bg-white rounded-lg">
                        <View className="border-b border-gray-400">
                            <ThemedText className="font-bold">Name</ThemedText>
                            <View className="flex flex-col">
                                <Pressable>
                                    <TextInput 
                                        value={value.accountname}
                                        onChangeText={(text) => onChangeValue({...value, accountname: text })}
                                        placeholderTextColor="#A9A9AC"
                                        className="p-2 text-base rounded-lg w-full" 
                                        keyboardType="default"
                                        enterKeyHint='done'
                                        editable={true} 
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View className="mt-3 border-b border-gray-400">
                            <ThemedText className="font-bold">Description</ThemedText>
                            <View className="flex flex-col">
                                <Pressable>
                                    <TextInput 
                                        value={value.description}
                                        onChangeText={(text) => onChangeValue({...value, description: text })}
                                        placeholderTextColor="#A9A9AC"
                                        className="p-2 text-base rounded-lg w-full"
                                        keyboardType="default"
                                        enterKeyHint='done'
                                        editable={true} 
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View className="mt-3 border-b border-gray-400">
                            <ThemedText className="font-bold">Initial Amount</ThemedText>
                            <View className="flex flex-col">
                                <Pressable>
                                    <TextInput 
                                        value={value.initail}
                                        onChangeText={(text) => onChangeValue({...value, initail: text })}
                                        placeholderTextColor="#A9A9AC"
                                        className="p-2 text-base rounded-lg w-full"
                                        keyboardType="numeric"
                                        enterKeyHint='done'
                                        editable={true} 
                                    />
                                </Pressable>
                            </View>
                        </View> 
                    </View>
                    <View className="mt-3 p-4 bg-white rounded-lg">
                        <View className="border-b border-gray-400">
                            <ThemedText className="font-bold">Memo</ThemedText>
                                <View className="flex flex-col">
                                    <Pressable >
                                        <TextInput 
                                            value={value.memo}
                                            onChangeText={(text) => onChangeValue({...value, memo: text })}
                                            placeholderTextColor="#A9A9AC" 
                                            className="p-2 text-base rounded-lg w-full"
                                            keyboardType='default'
                                            enterKeyHint='done'
                                            multiline={true}
                                            maxLength={40}
                                            numberOfLines={4}
                                            editable={true}
                                        />
                                    </Pressable>
                                </View>
                        </View>
                    </View>
                    <View className="mt-2">
                        <Pressable style={styles.buttonPrimary} className="mt-2" onPress={() => alert("Delete Wallet!")}>
                            <Text style={styles.text}>Delete wallet</Text>
                        </Pressable>
                    </View>
                    <View className="mt-1">
                        <Pressable style={styles.buttonSecondary} className="mt-2" onPress={() => alert("Cancel Edit!")}>
                            <Text style={styles.textSecondary}>Cancel edit</Text>
                        </Pressable>
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
                            value={date}
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
    },
    container: {
        flex: 1,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPrimary: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonSecondary: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        elevation: 3,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
    textSecondary: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
});