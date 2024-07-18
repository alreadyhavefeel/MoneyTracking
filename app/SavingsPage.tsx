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
          <Link href="/SavingItem" className="text-base text-slate-100 font-semibold mt-3">See detail</Link>
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

export default function WalletScreen() {
  return (
    <ScrollView className="bg-slate-100">
      <ThemedView className="flex-1 bg-transparent">
        <ThemedView className="mx-5 bg-transparent">
          <ScrollView horizontal={false} className="flex bg-transparent">
            <WalletItem type="Iphone 13 Mini" balance="$20" goal="$100" color="bg-blue-500" colorbar="black" progressbar={0.6} dayleft={65}/>
            <WalletItem type="Macbook Pro M1" balance="$100" goal="$300" color="bg-pink-500" colorbar="black" progressbar={0.8} dayleft={134}/>
            <WalletItem type="Car" balance="$100" goal="$300" color="bg-yellow-500" colorbar="black" progressbar={0.1} dayleft={876}/>
            <WalletItem type="House" balance="$100" goal="$13300" color="bg-red-500" colorbar="black" progressbar={0.2} dayleft={1087} />
          </ScrollView>

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
