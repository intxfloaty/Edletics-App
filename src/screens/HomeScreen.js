import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MainMenuOptions from '../components/MainMenuOptions'

const HomeScreen = () => {
  const [homeScreen, setHomeScreen] = useState(true)
  const [personOutline, setPersonOutline] = useState(false)

  return (
    <View style={styles.parent}>
      <MainMenuOptions
        homeScreen={homeScreen}
        setHomeScreen={setHomeScreen}
        personOutline={personOutline} 
        setPersonOutline={setPersonOutline}/>
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