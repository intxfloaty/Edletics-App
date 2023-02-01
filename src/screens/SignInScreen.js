import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Logo from "../../assets/images/edlogo.png"

const SignInScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </ScrollView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: "70%",
    height: 100,
    marginBottom: 50,
  },
})