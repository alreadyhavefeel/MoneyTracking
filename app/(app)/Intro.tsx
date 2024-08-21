import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { router } from 'expo-router';

const slides = [
  {
    key: 1,
    title: 'Take Control of Your \nFinances Today!',
    text: 'With our app, you can easily manage your finances and keep track of your spending.',
    image: require('@/assets/images/stack-money.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Set Finances Goals!',
    text: 'Set your financial goals, track your progress and make it happen.',
    image: require('@/assets/images/piggy-bank.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Gettings Started!',
    text: 'I\'m ready out of my comfort zone and start managing my finances.',
    image: require('@/assets/images/comfort-zone.png'),
    backgroundColor: '#22bcb5',
  }
];

export default function Intro() {
  const [showRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    router.push('/');
    setShowRealApp(true);
  };

  const _renderNextButton = () => {
    return (
      <View>
        <Text style={styles.textButton}>Next</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View>
        <Text style={styles.textButton}>Done</Text>
      </View>
    );
  };

  if (showRealApp) {
    console.log('showRealApp', showRealApp);
  } else {
    return <AppIntroSlider renderDoneButton={_renderDoneButton}
    renderNextButton={_renderNextButton} renderItem={_renderItem} data={slides} onDone={_onDone} />;
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 32,
    marginBottom: 15
  },
  text: {
    fontSize: 16,
    marginHorizontal: 32,
    marginBottom: 110,
  },
  image: {
    width: 320,
    height: 320,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 80,
  },
  textButton: {
    fontSize: 15,
    color: 'black',
    marginTop: 15,
    marginRight: 12,
  }
});