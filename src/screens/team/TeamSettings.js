import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { usePlayerDetails, userAuthState, addAndFetchPlayers } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';


const AddPlayers = () => {
  const { user } = userAuthState()
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { addNewPlayer, fetchPlayersOfTeam } = addAndFetchPlayers();
  const [player, setPlayer] = useState("+91")
  const  currentTeam  = useSelector(state => state.currentTeam)



  // to add new players to the team
  const onAddPlayerPressed = () => {
    addNewPlayer(currentTeam, player);
    setPlayer("+91")
  }

  return (
    <View style={styles.parent}>
      <CustomInput
        value={player}
        setValue={(text) => setPlayer(text)} />
      <CustomButton text="Add Player" type="SECONDARY" onPress={onAddPlayerPressed} />
    </View>
  )
}

export default AddPlayers

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#101112",
  },
  text: {
    color: "white",
    marginVertical: 10,
  },
})