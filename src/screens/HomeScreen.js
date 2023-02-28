import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth';


const HomeScreen = () => {

  return (
    <View style={styles.parent}>
      <CustomButton text="Log Out"
        onPress={() => {
          auth().signOut()
        }} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
  },
})