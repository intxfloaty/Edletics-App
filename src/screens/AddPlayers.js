import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { usePlayerDetails, userAuthState, addAndFetchPlayers } from '../firebase/firebase'
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const AddPlayers = ({ route }) => {
  const { user } = userAuthState()
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { addNewPlayer, fetchPlayersOfTeam } = addAndFetchPlayers();
  const [player, setPlayer] = useState("+91")
  const [playerList, setPlayerList] = useState([])
  const { currentTeam } = route.params;

  console.log(currentTeam, "curr")


  // to add new players to the team
  const onAddPlayerPressed = () => {
    addNewPlayer(currentTeam, player);
    setPlayer("+91")
  }

  fetchPlayersOfTeam(currentTeam, setPlayerList);



  return (
    <View style={styles.parent}>
      <Text style={styles.text}>Admin Name: {playerDetails?.fullName}</Text>
      <Text style={styles.text}>Admin Id: {playerDetails?.phoneNumber}</Text>
      <CustomInput
        value={player}
        setValue={(text) => setPlayer(text)} />
      <CustomButton text="Add Player" onPress={onAddPlayerPressed} />
      <Text style={styles.text}>Player List:</Text>
      {playerList.map((player, index) => {
        return (
          <Text style={styles.text} key={index}>{player.playerId}</Text>
        )
      })}
    </View>
  )
}

export default AddPlayers

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#101112",
  },
  text: {
    color: "white",
    marginVertical: 10,
  },
})