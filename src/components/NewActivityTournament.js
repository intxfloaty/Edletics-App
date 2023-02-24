import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const NewActivityTournament = () => {
  const [tournamentDetails, setTournamentDetails] = useState([])
  const [currentTournament, setCurrentTournament] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const tournamentRef = firestore().collection('tournament').doc('Damians Cup');
        const tournamentDoc = await tournamentRef.get();

        if (tournamentDoc.exists) {
          console.log("Here are the tourna details");
          setTournamentDetails(tournamentDetails.concat(tournamentDoc.data()));
        } else {
          console.log("No tourna is available");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTournamentDetails();
  }, []);

  useEffect(() => {
    if (currentTournament && currentTournament.eventName) {
      navigation.navigate("JoinTournament", { currentTournament })
    }
  }, [currentTournament]);

  return (
    <View>
      <View style={styles.activityTitle}>
        <Text style={styles.label}>Upcoming Tournaments</Text>
      </View>
      {tournamentDetails?.map((tournament, index) => {
        return (
          <Pressable style={styles.tournamentDetailsContainer} key={index} onPress={()=>setCurrentTournament(tournament)}>
            <Text style={styles.label}>Name: {tournament.eventName}</Text>
            <Text style={styles.label}>Location: {tournament.location}</Text>
            <Text style={styles.label}>Date: {tournament.date}</Text>
            <Text style={styles.label}>Category: {tournament.category}</Text>
            <Text style={styles.label}>Format: {tournament.format}</Text>
            <Text style={styles.label}>Squad Size: {tournament.squadSize}</Text>
            <Text style={styles.label}>Pool Prize: {tournament.poolPrize}</Text>
            <Text style={styles.label}>Total no of Teams: {tournament.totalTeams}</Text>
          </Pressable>
        )
      })}
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