import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import NewActivityPractice from '../components/NewActivityPractice'
import NewActivityGame from '../components/NewActivityGame'
import NewActivityTournament from '../components/NewActivityTournament'
import firestore from '@react-native-firebase/firestore';

const TeamActivity = () => {
  const [typeOfActivityPressed, setTypeOfActivityPressed] = useState({
    Practice: false,
    Game: false,
    Tournament: false,
  })
  const [typeOfActivity, setTypeOfActivity] = useState("Practice")
  const [practice, setPractice] = useState({
    title: "",
    location: "",
    date: "",
    invitations: "",
    additionalInfo: "",
    privateNotes: ""
  })
  const [game, setGame] = useState({
    opponent: "",
    title: "",
    location: "",
    date: "",
    invitations: "",
    additionalInfo: "",
    privateNotes: ""
  })
  const [tournament, setTournament] = useState({
    title: "",
    location: "",
    date: "",
    invitations: "",
    additionalInfo: "",
    privateNotes: ""
  })

  const onPracticePressed = () => {
    setTypeOfActivityPressed({ ...typeOfActivityPressed, Practice: true })
    setTypeOfActivity("Practice")
  }

  const onGamePressed = () => {
    setTypeOfActivityPressed({ ...typeOfActivityPressed, Game: true })
    setTypeOfActivity("Game")
  }

  const onTournamentPressed = () => {
    setTypeOfActivityPressed({ ...typeOfActivityPressed, Tournament: true })
    setTypeOfActivity("Tournament")
  }

  const createActivity = () => {
    firestore()
      .collection("New_activity")
      .doc(`${typeOfActivity}`)
      .set({
        opponent: typeOfActivity === "Game" ? opponent : "",
        title: practice.title,
        location: location,
        date: date,
        invitations: invitations,
        additionalInfo: additionalInfo,
        privateNotes: privateNotes,
      })
      .then(() => {
        console.log("New Activity added!")
      })
      .catch((error) => console.log(error, "error message"))
  }

  return (
    <View style={styles.parent}>
      <View style={styles.activityHeader}>
        <Pressable style={styles.closeButton}>
          <Text style={styles.headerText}>X</Text>
        </Pressable>
        <Text style={styles.headerText}>New Activity</Text>
        <Pressable style={styles.createButton} onPress={createActivity}>
          <Text style={styles.headerText}>Create</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.activityContainer}>
        <View style={styles.typeOfActivity}>
          <CustomButton
            text="Practice"
            type={typeOfActivity === "Practice" ? "activityPressed" : "activity"}
            onPress={onPracticePressed} />
          <CustomButton
            text="Game"
            type={typeOfActivity === "Game" ? "activityPressed" : "activity"}
            onPress={onGamePressed} />
          <CustomButton
            text="Tournament"
            type={typeOfActivity === "Tournament" ? "activityPressed" : "activity"}
            onPress={onTournamentPressed} />
        </View>

        {typeOfActivity === "Practice" &&
          <NewActivityPractice
            practice={practice}
            setPractice={setPractice}
          />
        }


        {typeOfActivity === "Game" &&
          <NewActivityGame
            game={game}
            setGame={setGame} />
        }

        {typeOfActivity === "Tournament" &&
          <NewActivityTournament
            tournament={tournament}
            setTournament={setTournament} />
        }
      </ScrollView>
    </View>
  )
}

export default TeamActivity

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101112",
  },
  activityHeader: {
    position: "relative",
    top: 0,
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 2
  },
  closeButton: {
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white"
  },
  activityContainer: {
    height: "100%"
  },
  typeOfActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})