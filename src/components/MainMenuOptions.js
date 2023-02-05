import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon  from 'react-native-vector-icons/Ionicons'

const MainMenuOptions = () => {
  return (
    <View style={styles.menuIcons}>
      <Icon name="home-outline" size={30} color="gray" onPress={() => alert("home")} />
      <Icon name="football-outline" size={30} color="gray" />
      <Icon name="trophy-outline" size={30} color="gray" />
      <Icon name="chatbox-outline" size={30} color="gray" />
      <Icon name="person-outline" size={30} color="white" />
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