import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Platform, View, Text, Button, Switch, Appearance, ScrollView, TouchableOpacity} from 'react-native';
import { router, useNavigation, useRouter, } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

function MenuItem(props) {
  return (
    <TouchableOpacity onPress={props.handleClick}>
        <ThemedView className="flex flex-row bg-white p-4 mt-2 rounded-lg">
            <View className="flex justify-center">
                <MaterialCommunityIcons name={props.icon} size={24} color="black" />
            </View>
            <View className="flex flex-row pl-4 mt-1 justify-center">
                <Text className="text-base font-semibold">{props.name}</Text>
            </View>
        </ThemedView>
    </TouchableOpacity>
  );
}

function handleClickWallet() {
    router.replace('/wallet');
    //alert('Already change to Wallet page');
  }

export default function PrivacyPolicy() {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <ScrollView>
        <ThemedView className="flex mt-14 bg-transparent">
            <View className="mx-5 mt-5 bg-transparent">
            <ThemedView className="flex flex-row bg-transparent justify-center mb-4">
                <ThemedText className="text-xl font-semibold">Privacy Policy</ThemedText>
            </ThemedView>
            <View className="flex flex-row justify-center">
                <View className="">
                    <ThemedText className="text-sm">         
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dolor nibh, interdum non ultricies quis, venenatis at eros. Nulla facilisi. Maecenas at mi at purus rhoncus feugiat. Nullam et metus odio. Pellentesque sit amet commodo nulla, non interdum diam. Nunc eget placerat justo. Proin convallis tortor vitae nulla finibus, ut cursus quam laoreet. Etiam pretium libero sed ipsum mollis, ut congue tortor gravida.

                                    Praesent congue nulla in quam suscipit aliquet. Vivamus quis pellentesque justo. Aliquam malesuada eget purus eget varius. Aenean pellentesque erat purus. Aliquam sit amet malesuada enim. Sed non enim sed neque gravida faucibus tempor in nibh. Phasellus auctor rhoncus massa ac consequat. Sed pretium eleifend libero eget fringilla. Donec dui nibh, finibus nec diam ut, egestas placerat turpis. Quisque tincidunt elit metus, in euismod lectus elementum id. Aliquam blandit, velit a tempor mollis, orci est vulputate mi, sed eleifend massa nibh quis ipsum. Proin pretium nulla ante, non tempus mauris consectetur sed. Ut pellentesque ex nisi, at lacinia eros aliquam non. Mauris enim arcu, dignissim quis velit id, suscipit dignissim dolor.

                                    Duis commodo lorem in nulla blandit lobortis. Integer venenatis rutrum aliquet. Donec convallis id orci in tincidunt. Proin ut felis varius, consectetur lacus vitae, commodo dui. Nunc venenatis condimentum lorem vitae laoreet. Ut at aliquet nibh. Vestibulum tincidunt, lorem sit amet condimentum tristique, odio mauris luctus augue, eu iaculis sem neque vel sapien. Nullam ac libero pretium, ornare magna ac, porttitor ligula. Sed porta lacus ipsum, a sagittis ligula ornare in. Etiam ac libero urna. Proin pulvinar eget tellus sit amet molestie.

                                    Sed volutpat, diam at vehicula pulvinar, libero elit varius lorem, non pellentesque libero risus vel lectus. Curabitur finibus facilisis lectus quis venenatis. Nullam dolor ligula, sollicitudin eget libero ut, feugiat tristique sapien. Ut eget turpis dui. Nulla congue faucibus ipsum. Sed vitae lacus id felis mollis ullamcorper ac cursus nunc. Sed vitae fermentum neque. Mauris elit mi, fringilla eu leo ut, maximus auctor quam.

                                    Duis gravida eros elementum, bibendum nisl non, hendrerit lorem. Vivamus eu leo ante. In vehicula tortor at velit malesuada, at ultricies dui vestibulum. Maecenas lacinia arcu sapien, quis molestie dolor lacinia at. Donec at elit neque. Ut gravida maximus erat, ac fermentum libero molestie eu. Mauris finibus ipsum in ultricies molestie. Fusce ultricies diam sed nibh maximus, porta venenatis tortor rutrum. Nunc eleifend neque erat, non tincidunt diam convallis sed. Sed sit amet faucibus ex. Curabitur orci nibh, tempor ac sagittis in, gravida non leo.

                    </ThemedText>
                </View>
            </View>
            </View>
        </ThemedView>  
        </ScrollView>
    );
    }

