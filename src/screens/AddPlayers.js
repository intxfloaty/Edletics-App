import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { usePlayerDetails, userAuthState, fetchTeamDetails} from '../firebase/firebase'
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


const AddPlayers = () => {
  const { user } = userAuthState()
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const {teamId, myTeams} = fetchTeamDetails();
  const [player, setPlayer] = useState("+91")
  const [playerList, setPlayerList] = useState([])


  // to add new players to the team
  const onAddPlayerPressed = () => {
    firestore()
      .collection("teams")
      .doc(teamId)
      .collection("players")
      .add({
        playerId: player,
        // playerName:playerDetails?.phoneNumber,
      })
      .then((docRef) => {
        console.log("Player added with ID: ", docRef.id);
        setPlayer("")
      })
      .catch((error) => {
        console.error("Error adding player: ", error);
      });
  }

  useEffect(() => {
    firestore()
      .collection("teams")
      .doc(teamId)
      .collection("players")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          console.log(doc.id, 'playerList=>', doc.data())
          setPlayerList(playerList.concat(doc.data()))
        })
      })
  }, [teamId])

  return (
    <View style={styles.parent}>
      <Text style={styles.text}>Admin Name: {playerDetails?.fullName}</Text>
      <Text style={styles.text}>Admin Id: {playerDetails?.phoneNumber}</Text>
      <CustomInput
        value={player}
        setValue={(text) => setPlayer(text)} />
      <CustomButton text="Add Player" onPress={onAddPlayerPressed} />
      <Text style={styles.text}>Player List:</Text>
      {playerList.map((player, index)=> {
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