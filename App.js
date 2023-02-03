import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import OTPScreen from "./src/screens/OTPScreen";
import SignInScreen from "./src/screens/SignInScreen";
import auth from '@react-native-firebase/auth';
import CustomButton from './src/components/CustomButton';
import ProfileScreen from './src/screens/ProfileScreen';

const YourApp = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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

      {/* <CustomButton text="sign out" onPress={()=> {
        auth()
        .signOut()
        .then(() => console.log("user logged out"))}}/> */}
    </View>
  );

}

export default YourApp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})