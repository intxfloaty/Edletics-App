import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { userAuthState } from '../firebase/firebase';


const NewActivityTournament = () => {
  const [tournamentDetails, setTournamentDetails] = useState({})
  const { user } = userAuthState()

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const tournamentRef = firestore().collection('tournament').doc('Damians Cup');
        const tournamentDoc = await tournamentRef.get();

        if (tournamentDoc.exists) {
          console.log("Here are the tourna details");
          setTournamentDetails(tournamentDoc.data());
        } else {
          console.log("No tourna is available");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTournamentDetails();
  }, []);

  return (
    <View>
      <View style={styles.activityTitle}>
        <Text style={styles.label}>Upcoming Tournaments</Text>
      </View>
      <View style={styles.tournamentDetailsContainer}>
        <Text style={styles.label}>Name: {tournamentDetails.eventName}</Text>
        <Text style={styles.label}>Location: {tournamentDetails.location}</Text>
        <Text style={styles.label}>Date: {tournamentDetails.date}</Text>
        <Text style={styles.label}>Category: {tournamentDetails.category}</Text>
        <Text style={styles.label}>Format: {tournamentDetails.format}</Text>
        <Text style={styles.label}>Squad Size: {tournamentDetails.squadSize}</Text>
        <Text style={styles.label}>Pool Prize: {tournamentDetails.poolPrize}</Text>
        <Text style={styles.label}>Total no of Teams: {tournamentDetails.totalTeams}</Text>
      </View>
    </View>
  )
}

export default NewActivityTournament

const styles = StyleSheet.create({
  activityTitle: {
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: '300',
  },
  tournamentDetailsContainer: {
    width: "100%",
    minheight: "50%",
    backgroundColor: "blue",
    zIndex: 2
  },
})