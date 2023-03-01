import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';

const TeamBulletin = () => {
  const [newGame, setNewGame] = useState({})

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


  return (
    <View style={styles.parent}>
      <Text style={styles.text}>{newGame?.format}</Text>
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
  text:{
    color:"white",
    fontSize:26
  },
})