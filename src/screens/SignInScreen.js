import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Logo from "../../assets/images/edlogo.png"
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91")
  return (
    <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <CustomInput placeholder="Enter mobile number" value={phoneNumber} setValue={setPhoneNumber} />
      <CustomButton text="Send OTP" onPress={() => signInWithPhoneNumber()} />
    </ScrollView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    height: 100,
    marginBottom: 50,
  },
})