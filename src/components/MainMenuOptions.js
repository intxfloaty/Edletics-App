import { StyleSheet, Text, View, } from 'react-native'
import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavContext } from '../context/NavigationContext'

const MainMenuOptions = (props) => {
  const {menuOptions, setMenuOptions} = useContext(NavContext)

  const isHomeScreenPressed = () => {
    setMenuOptions({...menuOptions, homeOutline: true, personOutline:false})
  }

  const isPersonOutlinePressed = () => {
    setMenuOptions({...menuOptions, personOutline:true, homeOutline:false})
  }

  return (
    <View style={styles.menuIcons}>
      <Icon
        name="home-outline"
        size={30}
        color={menuOptions.homeOutline ? "white" : "gray"}
        onPress={isHomeScreenPressed}
      />

      <Icon name="football-outline" size={30} color="gray" />
      <Icon name="trophy-outline" size={30} color="gray" />
      <Icon name="chatbox-outline" size={30} color="gray" />
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