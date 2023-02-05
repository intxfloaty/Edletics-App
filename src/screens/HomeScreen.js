import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'

const HomeScreen = () => {
  return (
    <CustomButton text="sign out" onPress={() => {
      auth()
        .signOut()
        .then(() => console.log("user logged out"))
    }} />
  )
}

export default HomeScreen

const styles = StyleSheet.create({})