import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, RefreshControl, FlatList, View, Text, ScrollView, TouchableOpacity, Pressable, Touchable } from 'react-native';
import { Component, useEffect, useState } from 'react';
import React from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { TransactionContainer } from '@/components/TransactionContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import { round } from 'mathjs'

const data=[
  {value: 500, label: 'Feb', frontColor: 'lightgray'},
  {value: 745, label: 'Mar', frontColor: 'lightgray'},
  {value: 320, label: 'Apr'},
  {value: 600, label: 'May', frontColor: 'lightgray'},
  {value: 256, label: 'Jun'}
];

export default function StatisticsScreen() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(true);
    }, 500);
  }, []);

  const [transactions, setTransactions] = useState([]);

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
  console.log(transactions);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function ExpanseView(props) {
    var number = round(props.spending);
    return (
      <View className="w-1/3 px-1 mt-3 rounded-lg">
        <View className='p-4 bg-slate-900 rounded-lg'>
          <ThemedText className="text-white">{props.name}</ThemedText>
          <ThemedText className="text-base text-white font-bold">{"$ " + numberWithCommas(number)}</ThemedText>
        </View>
      </View>
    )
  }

  transactions.sort((a, b) => b.timestamp - a.timestamp);
  const pluslistTransactions = transactions.filter((item) => (item.amount > 0)).map((item) => (
    <TransactionContainer key={item.id} icons={item.icons} name={item.name} category={item.category} number={item.amount}/>
  ));

  const minuslistTransactions = transactions.filter((item) => (item.amount < 0)).map((item) => (
    <TransactionContainer key={item.id} icons={item.icons} name={item.name} category={item.category} number={item.amount}/>
  ));

  function listTransaction() {
    if (transactions.length === 0) {
      return (
        <ThemedView className="flex flex-row justify-center bg-transparent">
          <ThemedText className="text-base font-base mt-2">No Transactions</ThemedText>
        </ThemedView>
      );
    } else if (activeTap.totalIncome === true) {
      return (
        <View className="flex justify-between mb-3">
          {pluslistTransactions}
        </View>
      );
    } else if (activeTap.totalExpanse === true) {
      return (
        <View className="flex justify-between mb-3">
          {minuslistTransactions}
        </View>
      );
    }
  }

  // summary of total income and total expanse
  const [totalIncome, setTotalIncome] = useState(
    { totalIncome: 0,
      totalIncomeDay: 0,
      totalIncomeWeek: 0,
      totalIncomeMonth: 0,
    }
  );
  const [totalExpanse, setTotalExpanse] = useState({
    totalExpanse: 0,
    totalExpanseDay: 0,
    totalExpanseWeek: 0,
    totalExpanseMonth: 0,
  });

  useEffect(() => {
    const income = transactions.filter((item) => (item.amount > 0)).map((item) => item.amount);
    const incomeDay = dayTransaction.filter((item) => (item.amount > 0)).map((item) => item.amount);
    const incomeWeek = weekTransaction.filter((item) => (item.amount > 0)).map((item) => item.amount);
    const incomeMonth = monthTransaction.filter((item) => (item.amount > 0)).map((item) => item.amount);

    const expanse = transactions.filter((item) => (item.amount < 0)).map((item) => item.amount);
    const expanseDay = dayTransaction.filter((item) => (item.amount < 0)).map((item) => item.amount);
    const expanseWeek = weekTransaction.filter((item) => (item.amount < 0)).map((item) => item.amount);
    const expanseMonth = monthTransaction.filter((item) => (item.amount < 0)).map((item) => item.amount);

    const totalIncome = income.reduce((acc, item) => acc + parseFloat(item), 0).toFixed(2);
    const totalIncomeDay = incomeDay.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);
    const totalIncomeWeek = incomeWeek.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);
    const totalIncomeMonth = incomeMonth.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);

    const totalExpanse = expanse.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);
    const totalExpanseDay = expanseDay.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);
    const totalExpanseWeek = expanseWeek.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);
    const totalExpanseMonth = expanseMonth.reduce((acc, item) => acc + parseInt(item), 0).toFixed(2);

    setTotalIncome({totalIncome, totalIncomeDay, totalIncomeWeek, totalIncomeMonth});
    setTotalExpanse({totalExpanse, totalExpanseDay, totalExpanseWeek, totalExpanseMonth});
  }, [isLoading]);

  console.log(totalIncome);
  console.log(totalExpanse);


  function checkMonth(timestamp) {
    //check What is today month and year 
    const monthToday = moment().month();
    const yearToday = moment().year();

    // check the month and year of the transaction
    const month = moment(timestamp).month();
    const year = moment(timestamp).year();
    if (monthToday === month && yearToday === year) {
      return true;
    } else { 
      return false;
    }
  }

  function checkWeek(timestamp) {
    //check What is today month and year 
    const weekToday = moment().week();
    const yearToday = moment().year();

    // check the month and year of the transaction
    const week = moment(timestamp).week();
    const year = moment(timestamp).year();
    if (weekToday === week && yearToday === year) {
      return true;
    } else { 
      return false;
    }
  }

  function checkDay(timestamp) {
    //check What is today month and year 
    const dayToday = moment().date();
    const monthToday = moment().month();
    const yearToday = moment().year();

    // check the month and year of the transaction
    const day = moment(timestamp).date();
    const month = moment(timestamp).month();
    const year = moment(timestamp).year();
    if (dayToday === day && monthToday === month && yearToday === year) {
      return true;
    } else { 
      return false;
    }
  }

  const monthTransaction = transactions.filter((item) => checkMonth(item.timestamp));
  const weekTransaction = transactions.filter((item) => checkWeek(item.timestamp));
  const dayTransaction = transactions.filter((item) => checkDay(item.timestamp));

  [activeTap, setActiveTap] = useState({
    totalIncome: true,
    totalExpanse: false
  });

  function handleTap() {
    setActiveTap((prev) => {
      return {
        totalIncome: !prev.totalIncome,
        totalExpanse: !prev.totalExpanse
    }});
  }

  function windowView() {
    if (activeTap.totalIncome === true) {
      if (pluslistTransactions.length === 0) {
        return (
            <ThemedView style={styles.container} className="flex flex-col bg-transparent rounded-lg border border-dashed mt-5 p-6">
              <Image
                  source={require('@/assets/images/empty icon.png')}
                  style={{width: 100, height: 100}}
                  className="m-0"
              />
              <ThemedText className="text-base text-center font-base mt-2">There is no data available for choice {'\n'} you have chosen. Please choose a different.</ThemedText>
            </ThemedView>
        );
      } else {
        return (
          <View>
            <View className="mt-4 p-4 bg-white rounded-lg">
                <View className="">
                        <ThemedText>Total Income</ThemedText>
                        <ThemedText className="text-black text-3xl font-bold">{"$ "+numberWithCommas(totalIncome.totalIncome)}</ThemedText>
                        <View className="flex flex-row">
                          <View className="justify-center mr-1">
                            <AntDesign name="upcircle" size={14} color="green" />
                          </View>
                          <ThemedText>2% Increase from last month</ThemedText>
                        </View>
                </View>
                <View className="mt-5">
                          <BarChart
                            barWidth={30}
                            noOfSections={3}
                            maxValue={900}
                            barBorderRadius={4}
                            frontColor="black"
                            data={data}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            hideRules
                            showReferenceLine1
                            referenceLine1Position={420}
                            referenceLine1Config={{
                              color: 'gray',
                              dashWidth: 2,
                              dashGap: 3,
                            }}
                            isAnimated
                            renderTooltip={(item) => {
                              return (
                                <View
                                  style={{
                                    marginBottom: 5,
                                    marginLeft: -2,
                                    backgroundColor: '#ffcefe',
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                  }}>
                                  <Text>{item.value}</Text>
                                </View>
                              );
                            }}
                          />
                </View>
            </View>
            <View className="flex flex-row flex-wrap w-full">
              <ExpanseView name="Day" spending={totalIncome.totalIncomeDay}/>
              <ExpanseView name="Week" spending={totalIncome.totalIncomeWeek}/>
              <ExpanseView name="Month" spending={totalIncome.totalIncomeMonth}/>
            </View>
          </View>
        );
      }
    } else if (activeTap.totalExpanse === true) {
      if (minuslistTransactions.length === 0) {
        return (
            <ThemedView style={styles.container} className="flex flex-col bg-transparent rounded-lg border border-dashed mt-5 p-6">
              <Image
                  source={require('@/assets/images/empty icon.png')}
                  style={{width: 100, height: 100}}
                  className="m-0"
              />
              <ThemedText className="text-base text-center font-base mt-2">There is no data available for choice {'\n'} you have chosen. Please choose a different.</ThemedText>
            </ThemedView>
        );
      } else {
        return (
          <View>
            <View className="mt-4 p-4 bg-white rounded-lg">
                <View className="">
                  <ThemedText>Total Expanse</ThemedText>
                  <ThemedText className="text-black text-3xl font-bold">{"$ "+totalExpanse.totalExpanse}</ThemedText>
                  <View className="flex flex-row">
                    <View className="justify-center mr-1">
                      <AntDesign name="upcircle" size={14} color="green" />
                    </View>
                    <ThemedText>2% Increase from last month</ThemedText>
                  </View>
                </View>
                <View className="mt-5">
                    <BarChart
                      barWidth={30}
                      noOfSections={3}
                      maxValue={900}
                      barBorderRadius={4}
                      frontColor="black"
                      data={data}
                      yAxisThickness={0}
                      xAxisThickness={0}
                      hideRules
                      showReferenceLine1
                      referenceLine1Position={420}
                      referenceLine1Config={{
                        color: 'gray',
                        dashWidth: 2,
                        dashGap: 3,
                      }}
                      isAnimated
                      renderTooltip={(item) => {
                        return (
                          <View
                            style={{
                              marginBottom: 5,
                              marginLeft: -2,
                              backgroundColor: '#ffcefe',
                              paddingHorizontal: 6,
                              paddingVertical: 4,
                              borderRadius: 4,
                            }}>
                            <Text>{item.value}</Text>
                          </View>
                        );
                      }}
                    />
                </View>
            </View>
            <View className="flex flex-row flex-wrap w-full">
                <ExpanseView name="Day" spending={totalIncome.totalIncomeDay}/>
                <ExpanseView name="Week" spending={totalIncome.totalIncomeWeek}/>
                <ExpanseView name="Month" spending={totalIncome.totalIncomeMonth}/>
              </View>
            </View>
          ); 
        }
    }
  }



  return (
    <ScrollView className="bg-slate-100">
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <ThemedView className="flex-1 mt-14 bg-transparent">
        <ThemedView className="mx-5 mt-5 bg-transparent">
          <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
            <ThemedText className="text-xl font-semibold">Statistics</ThemedText>
          </ThemedView>
          
          
          <View className="flex flex-row w-full bg-transparent justify-around border rounded-lg">
            <Pressable onPress={handleTap} className={`w-1/2 p-2 justify-center ${activeTap.totalIncome === true ? "bg-black" : "bg-tranparent"} rounded-md`}>
              <View>
                <ThemedText className={`text-lg text-center ${activeTap.totalIncome === true ? "text-white" : "bg-tranparent"} font-semibold`}>Total Income</ThemedText>
              </View>
            </Pressable>
            <Pressable onPress={handleTap} className={`w-1/2 p-2 justify-center ${activeTap.totalExpanse === true ? "bg-black" : "bg-tranparent"} rounded-md`}>
              <View>
                <ThemedText className={`text-lg text-center ${activeTap.totalExpanse === true ? "text-white" : "bg-tranparent"}`}>Total Expanse</ThemedText>
              </View>
            </Pressable>
          </View>
          
          {windowView()}

          <View className="bg-transparent">
                <ThemedView className="flex flex-row justify-between mt-2 bg-transparent">
                <ThemedText className="text-2xl font-semibold">Transactions :</ThemedText>
                <Octicons name="filter" size={24} color="black" />
                
                {/* <Link href="/Setting" className="text-blue-500 text-base font-semibold self-end">Setting</Link> */}
                </ThemedView>

                <Text className="text-lg font-normal mt-3">Recently</Text>

                <View className="flex justify-between mb-3">
                  {listTransaction()}
                </View>
          </View>
          

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
  container: {
    flex: 1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
