import { StyleSheet, Text, View, } from 'react-native'
import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavContext } from '../context/NavigationContext'
import { useNavigation } from "@react-navigation/native"


const MainMenuOptions = (props) => {
  const { menuOptions, setMenuOptions } = useContext(NavContext)
  const navigation = useNavigation();

  const isHomeOutlinePressed = () => {
    setMenuOptions
      ({
        ...menuOptions,
        homeOutline: true,
        footballOutline: false,
        trophyOutline: false,
        chatboxOutline: false,
        personOutline: false
      })
    navigation.navigate("Home")
  }

  const isPersonOutlinePressed = () => {
    setMenuOptions
      ({
        ...menuOptions,
        homeOutline: false,
        footballOutline: false,
        trophyOutline: false,
        chatboxOutline: false,
        personOutline: true
      })
    navigation.navigate("Profile")
  }

  const isFootballOutlinePressed = () => {
    setMenuOptions
      ({
        ...menuOptions,
        homeOutline: false,
        footballOutline: true,
        trophyOutline: false,
        chatboxOutline: false,
        personOutline: false
      })
  }

  const isChatboxOutlinePressed = () => {
    setMenuOptions
      ({
        ...menuOptions,
        homeOutline: false,
        footballOutline: false,
        trophyOutline: false,
        chatboxOutline: true,
        personOutline: false
      })
  }

  const isTrophyOutlinePressed = () => {
    setMenuOptions
      ({
        ...menuOptions,
        homeOutline: false,
        footballOutline: false,
        trophyOutline: true,
        chatboxOutline: false,
        personOutline: false
      })
  }

  return (
    <View style={styles.menuIcons}>
      <Icon
        name="home-outline"
        size={30}
        color={menuOptions.homeOutline ? "white" : "gray"}
        onPress={isHomeOutlinePressed}
      />

      <Icon
        name="football-outline"
        size={30}
        color={menuOptions.footballOutline ? "white" : "gray"}
        onPress={isFootballOutlinePressed} />

      <Icon
        name="trophy-outline"
        size={30}
        color={menuOptions.trophyOutline ? "white" : "gray"}
        onPress={isTrophyOutlinePressed} />

      <Icon
        name="chatbox-outline"
        size={30}
        color={menuOptions.chatboxOutline ? "white" : "gray"}
        onPress={isChatboxOutlinePressed} />

      <Icon
        name="person-outline"
        size={30}
        color={menuOptions.personOutline ? "white" : "gray"}
        onPress={isPersonOutlinePressed} />
    </View>
  )
}

export default MainMenuOptions

const styles = StyleSheet.create({
  menuIcons: {
    width: "100%",
    height: 50,
    backgroundColor: "#202224",
    position: 'absolute',
    borderTopWidth: 1,
    borderRadius: 2,
    borderColor: "white",
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 1
  },
})