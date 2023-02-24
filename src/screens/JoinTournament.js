import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton';

const JoinTournament = ({ route }) => {
  const { currentTournament } = route.params;

  const onJoinPressed = () => {
    console.log("navigate to payment page and make payment")
  }

  return (
    <View style={styles.parent}>
      <Text style={styles.tournamentInfo}>{currentTournament.eventName}</Text>
      <Text style={styles.tournamentInfo}>{currentTournament.location}</Text>
      <Text style={styles.tournamentInfo}>{currentTournament.date}</Text>
      <Text style={styles.tournamentInfo}>{currentTournament.poolPrize}</Text>
      <CustomButton
        text="Join"
        onPress={onJoinPressed} />
    </View>
  )
}

export default JoinTournament

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tournamentInfo: {
    fontSize: 18,
    color: "white"
  },
})