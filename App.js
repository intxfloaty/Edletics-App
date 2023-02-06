import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import PlayerProfileInfoScreen from './src/screens/PlayerProfileInfoScreen';
import { userAuthState } from './src/firebase/firebase'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MyTeams from './src/screens/MyTeams';


const Stack = createNativeStackNavigator();

const YourApp = () => {
  const { user, initializing } = userAuthState();

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.root}>
        <SignInScreen />
      </View>
    )
  }

  return (

    <NavigationContainer>
      {/* <View style={styles.root}> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={PlayerProfileInfoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MyTeams" component={MyTeams} />
      </Stack.Navigator>
      {/* </View> */}
    </NavigationContainer>
  );

}

export default YourApp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})