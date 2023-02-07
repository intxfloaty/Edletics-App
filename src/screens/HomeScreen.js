import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MainMenuOptions from '../components/MainMenuOptions'

const HomeScreen = () => {

  return (
    <View style={styles.parent}>
      <MainMenuOptions />
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