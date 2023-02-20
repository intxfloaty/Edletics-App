import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { NavProvider } from './src/context/NavigationContext';
import SignInScreen from "./src/screens/SignInScreen";
import PlayerProfileInfoScreen from './src/screens/PlayerProfileInfoScreen';
import { userAuthState } from './src/firebase/firebase'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/ProfileScreen';
import MyTeams from './src/screens/MyTeams';
import TeamActivity from './src/screens/TeamActivity';
import HomeScreen from './src/screens/HomeScreen';
import MainMenuOptions from './src/components/MainMenuOptions';
import AddPlayers from './src/screens/AddPlayers';


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
    <NavProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PlayerProfileInfo" component={PlayerProfileInfoScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MyTeams" component={MyTeams} />
          <Stack.Screen name="AddPlayers" component={AddPlayers} />
          <Stack.Screen name="TeamActivity" component={TeamActivity} />
        </Stack.Navigator>
        <MainMenuOptions />
      </NavigationContainer>
    </NavProvider>
  );

}

export default YourApp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})