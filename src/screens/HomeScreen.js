import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import MainMenuOptions from '../components/MainMenuOptions'

const HomeScreen = () => {
  return (
    <View style={styles.parent}>
      <MainMenuOptions />
      {/* <CustomButton text="sign out" onPress={() => {
        auth()
          .signOut()
          .then(() => console.log("user logged out"))
      }} /> */}
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