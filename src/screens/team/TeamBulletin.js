import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TeamBulletin = () => {
  const [newGame, setNewGame] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    firestore()
      .collection("newGame")
      .doc("5v5_open")
      .get()
      .then((querySnapShot) => {
        console.log("Team Admin created a new game!")
        setNewGame(querySnapShot.data())
        console.log(newGame)
      })
      .catch(error => console.log(error))
  }, [])

  const onAddPressed = () => {
    navigation.navigate("CreateGame")
  }


  return (
    <View style={styles.parent}>
      <Text style={styles.text}>{newGame?.format}</Text>
      <Icon
        name="add-outline"
        size={40}
        style={styles.addIcon}
        color={"white"}
        onPress={onAddPressed}
      />
    </View>
  )
}

export default TeamBulletin

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 20
  },
  text: {
    color: "white",
    fontSize: 26
  },
  addIcon: {
    position: "absolute",
    bottom: 10,
    right: 2,
    padding: 10,
  },
})