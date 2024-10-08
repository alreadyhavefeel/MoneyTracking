import { Image, StyleSheet, Platform, View, Text, Button, Switch, Appearance, ScrollView, TouchableOpacity} from 'react-native';
import { router, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

import { useState } from 'react';
import { Input } from '@rneui/themed'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      setLoading(false)
    }

    async function signUpWithEmail() {
      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) Alert.alert(error.message)
      if (!session) Alert.alert('Please check your inbox for email verification!')
      setLoading(false)
    }


    return (
      <ScrollView className="bg-slate-100">
        <Stack.Screen
          options={{
            headerShown: false,
          }} />
        <ThemedView className="flex flex-col justify-center mt-14 bg-transparent">
          <View className="flex flex-col mx-5 mt-10 bg-transparent justify-center">
              <Text className="font-semibold text-2xl text-center">Sign-in</Text>
          </View>
          <View style={styles.container}>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                  label="Email"
                  leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="email@address.com"
                  autoCapitalize={'none'}
                />
              </View>
              <View style={styles.verticallySpaced}>
                <Input
                  label="Password"
                  leftIcon={{ type: 'font-awesome', name: 'lock' }}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={'none'}
                />
              </View>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
              </View>
              <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
              </View>
          </View>
        </ThemedView>  
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      padding: 12,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
  })