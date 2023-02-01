import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Logo from "../../assets/images/edlogo.png"
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth';
import OTPScreen from './OTPScreen'


const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91")
  //if null, no sms has been sent
  const [confirm, setConfirm] = useState(null)
  const [code, setCode] = useState('')

  //handle the button press
  const signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
    setConfirm(confirmation)
    console.log(confirm, "code")
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <CustomInput placeholder="Enter mobile number" value={phoneNumber} setValue={setPhoneNumber} />
        <CustomButton
          text="Send OTP"
          onPress={() => {
            console.log("OTP RECEIVED")
            signInWithPhoneNumber(phoneNumber)
          }} />
      </ScrollView>
    )
  }

  return (
    <>
      <OTPScreen
        setCode={setCode}
        confirmCode={() => confirmCode()} />
    </>
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