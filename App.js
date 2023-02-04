import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import OTPScreen from "./src/screens/OTPScreen";
import SignInScreen from "./src/screens/SignInScreen";
import auth from '@react-native-firebase/auth';
import ProfileScreen from './src/screens/ProfileScreen';
import { userAuthState } from './src/firebase/firebase'
import CustomButton from './src/components/CustomButton';

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
    <View style={styles.root}>
      <ProfileScreen />

      <CustomButton text="sign out" onPress={() => {
        auth()
          .signOut()
          .then(() => console.log("user logged out"))
      }} />
    </View>
  );

}

export default YourApp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})