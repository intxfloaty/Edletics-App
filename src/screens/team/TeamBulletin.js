import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createAndFetchGame } from '../../firebase/firebase';

const TeamBulletin = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const {fetchNewGame} = createAndFetchGame()
  const [newGame, setNewGame] = useState([])
  const navigation = useNavigation()

  fetchNewGame(currentTeam?.teamId, setNewGame)

  console.log(newGame, "newGame")
  const onAddPressed = () => {
    navigation.navigate("CreateGame")
  }

  return (
    <View style={styles.parent}>
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