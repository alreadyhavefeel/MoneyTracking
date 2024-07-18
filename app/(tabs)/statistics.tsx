import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, View, Text, ScrollView, TouchableOpacity} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { TransactionContainer } from '@/components/TransactionContainer';

const data=[
  {value: 500, label: 'Feb', frontColor: 'lightgray'},
  {value: 745, label: 'Mar', frontColor: 'lightgray'},
  {value: 320, label: 'Apr'},
  {value: 600, label: 'May', frontColor: 'lightgray'},
  {value: 256, label: 'Jun'}
];

function ExpanseView(props) {
  return (
    <View className="p-4 mt-3 bg-slate-900 rounded-lg w-28">
      <ThemedText className="text-white">{props.name}</ThemedText>
      <ThemedText className="text-xl text-white font-bold">{props.spending}</ThemedText>
    </View>
  )
}


export default function StatisticsScreen() {
  return (
    <ScrollView>
      <ThemedView className="flex-1 mt-14 bg-transparent">
        <ThemedView className="mx-5 mt-5 bg-transparent">
          <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
            <ThemedText className="text-xl font-semibold">Statistics</ThemedText>
          </ThemedView>
          
          
          <View className="flex flex-row bg-white justify-around rounded-lg">
            <View className="p-2 m-1 bg-black">
              <ThemedText className="text-lg text-white font-semibold">Total Income</ThemedText>
            </View>
            <View className="p-2 m-1">
              <ThemedText className="text-lg font-semibold">Total Expanse</ThemedText>
            </View>
          </View>
          <View className="mt-2 p-4 bg-white rounded-lg">
            <View className="">
              <ThemedText>Total Income</ThemedText>
              <ThemedText className="text-black text-3xl font-bold">$ 32,000.00</ThemedText>
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

          <View className="flex flex-row justify-between">
            <ExpanseView name="Day" spending="$ 4"/>
            <ExpanseView name="Week" spending="$ 25"/>
            <ExpanseView name="Month" spending="$ 129"/>
          </View>

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
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>
                  <TransactionContainer icons="paypal" name="Paypal" type="Salary" number="+32.00"/>

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
});
