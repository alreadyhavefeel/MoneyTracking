import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { TransactionContainer } from '@/components/TransactionContainer';

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
      <ThemedView className={`flex flex-col p-6 rounded-lg bg-white mt-4`}>
          <View className="flex flex-row">
            
            <View className="flex flex-col">
              <ThemedText className="text-base font-light">{props.type}</ThemedText>
              <ThemedText className="text-lg font-bold">{props.balance}</ThemedText>
            </View>
          </View>
          <View className="mt-4">
            <ProgressBar color={props.colorbar} progress={props.progressbar} width={122} />
          </View>
      </ThemedView>
  );
};

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
  router.replace('./Expanse');
  // alert('Already added');
}

function handleClickExpanse() {
  alert('Already Expanse');
}

function handleClickTransfer() {
  alert('Already Transfer');
}

function handleClickWallet() {
  router.replace('/wallet');
  //alert('Already change to Wallet page');
}

export default function HomeScreen() {
  return (
    <ScrollView className="bg-slate-100">
      <ThemedView className="flex-1 mt-14 bg-transparent">
        <ThemedView className="mx-5 mt-5 bg-transparent">
          <ThemedView className="flex bg-transparent">
            <ThemedText className="text-lg">Hi, Feel Ratchanon</ThemedText>
            <ThemedText className="text-lg font-bold">Welcome to Money Saver</ThemedText>
          </ThemedView>

          <ThemedView className="flex mt-4 bg-slate-900 rounded-lg p-6">
            <ThemedText className="text-white">Your balance :</ThemedText>
            <ThemedText className="text-white text-3xl font-bold">$20,000.00</ThemedText>
          </ThemedView>  

          <ThemedView className="flex flex-row justify-between mt-4 bg-slate-900 rounded-lg p-6">
            <ThemedView className="flex flex-row justify-center bg-slate-900">
              <ThemedView className="flex flex-col justify-center bg-slate-900 mr-1">
                <Image
                    source={require('../../assets/images/pointer-down.png')}
                    style={{width: 30, height: 40}}
                    className=""
                />
              </ThemedView>
              <ThemedView className="flex flex-col justify-center bg-slate-900">
                  <ThemedText className="text-white">Income :</ThemedText>
                  <ThemedText className="text-white text-xl font-bold">$ 4,000.00</ThemedText>
              </ThemedView>
            </ThemedView>

            <View className="">
            </View>

            <ThemedView
              className="flex flex-row justify-center bg-slate-900 "
            >
              <ThemedView className="flex flex-col justify-center bg-slate-900 mr-2 ">
                <Image
                    source={require('../../assets/images/pointer-up.png')}
                    style={{width: 30, height: 40}}
                    className=""
                />
              </ThemedView>
              <ThemedView className="flex flex-col justify-center bg-slate-900">
                  <ThemedText className="text-white">Outcome :</ThemedText>
                  <ThemedText className="text-white text-xl font-bold">$ 1,000.00</ThemedText>
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
              <ThemedText className="text-2xl font-semibold">Earnings :</ThemedText>
              <Link href="/Setting" className="text-blue-500 text-base font-semibold self-end">See All</Link>
            </ThemedView>

            <ScrollView horizontal={true} className="flex flex-wrap mt-4">
              <EaringTypeContainer type="Sarary" typeSlice="S" bgcolor="bg-yellow-400"/>
              <EaringTypeContainer type="Upwork" typeSlice="U" bgcolor="bg-orange-400"/>
              <EaringTypeContainer type="Freepik" typeSlice="F" bgcolor="bg-pink-500"/>
              <EaringTypeContainer type="Env" typeSlice="E" bgcolor="bg-blue-500"/>
            </ScrollView>
          </View>
          
          <View className="bg-transparent">
            <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                <ThemedText className="text-2xl font-semibold">Savings :</ThemedText>
                <Link href="/SavingsPage" className="text-blue-500 text-base font-semibold self-end">See All</Link>
            </ThemedView>
            <View className="flex flex-row flex-wrap justify-between">
              <SavingTypeContainer colorbar="orange" type="Iphone 13 Mini" balance="$1,000" progressbar={0.3}/>
              <SavingTypeContainer colorbar="pink" type="Macbook Pro M1" balance="$1,300" progressbar={0.9}/>
              <SavingTypeContainer colorbar="yellow" type="Car" balance="$1,300" progressbar={0.9}/>
              <SavingTypeContainer colorbar="blue" type="House" balance="$1,300" progressbar={0.9}/>
            </View>
          </View>

          <View className="bg-transparent">
            <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
              <ThemedText className="text-2xl font-semibold">Transactions :</ThemedText>
              <Link href="/Setting" className="text-blue-500 text-base font-semibold self-end">See All</Link>
            </ThemedView>

            <Text className="text-lg font-normal mt-3">Today</Text>

            <View className="flex justify-between mb-3">
              <TransactionContainer icons="computer" name="Adobe lllusrator" type="Subcription fee" number="-32.00"/>
              <TransactionContainer icons="computer" name="Dribble" type="Subcription fee" number="-15.00"/>
              <TransactionContainer icons="fastfood" name="Dinner" type="Food" number="-2.00"/>
              <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
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
});
