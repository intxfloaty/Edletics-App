import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const JoinTournament = ({ route }) => {
  const { currentTournament } = route.params;
  const currentTeam = useSelector(state => state.currentTeam)
  const navigation = useNavigation()

  const onJoinPressed = () => {
    console.log("navigate to payment page and make payment")
    navigation.navigate("TournamentScreen")
    // add team to the tournament
    // if (currentTeam?.teamId) {
    //   firestore()
    //     .collection("tournament")
    //     .doc(`${currentTournament?.eventName}`)
    //     .collection("tournamentTeams")
    //     .add(currentTeam)
    //     .then(() => {
    //       console.log("team added to the tournament")
    //       // update the team document with the tournament info
    //       firestore()
    //         .collection("teams")
    //         .doc(`${currentTeam?.teamId}`)
    //         .collection("myTournaments")
    //         .add(currentTournament)
    //         .then(() => {
    //           console.log("We joined the tournament")
    //         })
    //         .catch(error => console.log(error))
    //     })
    //     .catch(error => console.log(error))
    // }
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