import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProgressBar from 'react-native-progress/Bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { TransactionContainer } from '@/components/TransactionContainer';

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
                        <ThemedText className="text-lg font-bold">{props.type}</ThemedText>
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

function WalletItem(props) {
  return (
    <ThemedView className="flex rounded-lg mr-3">
      <ThemedView className="flex flex-row p-4 rounded-lg bg-white mt-3">
        <View className="flex flex-col">
          <ThemedText>Total Balance</ThemedText>
          <ThemedText className="text-2xl font-semibold">{props.balance}</ThemedText>
          <ThemedText className="mt-4">{props.accountnumber}</ThemedText>
          <View className="mt-2">
            <ThemedText>Name</ThemedText>
            <ThemedText className="font-semibold">{props.accountname}</ThemedText>
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
    
  );
}

function AddWallet(props) {
  return (
    <ThemedView className="p-1 bg-transparent">
      <AntDesign name="pluscircle" size={24} color="black" />
    </ThemedView>
  );
}

export default function WalletScreen() {
  return (
    <ScrollView className="bg-slate-100">
      <ThemedView className="flex-1 mt-14 bg-transparent">
        <ThemedView className="mx-5 mt-5 bg-transparent">
          <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
            <ThemedText className="text-xl font-semibold">Wallet</ThemedText>
          </ThemedView>
          <ScrollView horizontal={true} className="flex bg-transparent">
            <View className="flex justify-center border-2 border-dashed rounded-lg mr-3">
              <AddWallet />
            </View>
            <WalletItem accountname="Ratchanon Suntornsalitkul" accountnumber="KTB - 989-8-97551-2" balance="$20.00" />
            <WalletItem accountname="Ratchanon Suntornsalitkul" accountnumber="SCB - 029-7-93231-9" balance="$100.00"/>
          </ScrollView>

            <View className="bg-transparent">
                <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                <ThemedText className="text-2xl font-semibold">Transactions :</ThemedText>
                <Octicons name="filter" size={24} color="black" />
                
                {/* <Link href="/Setting" className="text-blue-500 text-base font-semibold self-end">Setting</Link> */}
                </ThemedView>

                <Text className="text-lg font-normal mt-3">Today</Text>

                <View className="flex justify-between mb-3">
                  <TransactionContainer icons="computer" name="Adobe lllusrator" type="Subcription fee" number="-32.00"/>
                  <TransactionContainer icons="computer" name="Dribble" type="Subcription fee" number="-15.00"/>
                  <TransactionContainer icons="fastfood" name="Dinner" type="Food" number="-2.00"/>
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
                </View>
            </View>

            <View className="bg-transparent">
                <ThemedView className="flex flex-row justify-between mt-4 bg-transparent">
                    <ThemedText className="text-2xl font-semibold">Saving :</ThemedText>
                    <Link href="/Savings" className="text-blue-500 text-base font-semibold self-end">See All</Link>
                </ThemedView>

                <View className="flex justify-between mb-3">
                    <SavingListContainer icons="computer" type="Iphone 13 Mini" progressbar={0.3} balance="$32.00"/>
                    <SavingListContainer icons="computer" type="Macbook Pro M1" progressbar={0.9} balance="$15.00"/>
                    <SavingListContainer icons="paypal" type="Car" progressbar={0.7} balance="$200.00"/>
                    <SavingListContainer icons="house" type="House" progressbar={0.29} balance="$3200.00"/>
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
