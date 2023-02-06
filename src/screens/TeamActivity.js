import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import NewActivityPractice from '../components/NewActivityPractice'
import NewActivityGame from '../components/NewActivityGame'
import NewActivityTournament from '../components/NewActivityTournament'
import firestore from '@react-native-firebase/firestore';

const TeamActivity = () => {
  const [isDisabled, setIsDisabled] = useState(false)
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

  // function to check if the value of all keys in an object are not empty.
  const isObjectNotEmpty = (obj) => {
    for (const key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  }

  useEffect(() => {
    if (isObjectNotEmpty(practice)) {
      setIsDisabled(true)
    } else setIsDisabled(false)
  }, [practice])

  const createActivity = () => {
    if (isObjectNotEmpty(practice)) {
      firestore()
        .collection("New_activity")
        .doc(`${typeOfActivity}`)
        .set(practice)
        .then(() => {
          console.log("New Activity added!")
        })
        .catch((error) => console.log(error, "error message"))
    }
  }

  return (
    <View style={styles.parent}>
      <View style={styles.activityHeader}>
        <Pressable style={styles.closeButton}>
          <Text style={styles.headerText}>X</Text>
        </Pressable>
        <Text style={styles.headerText}>New Activity</Text>
        <CustomButton
          text="Create"
          type={isDisabled ? "active" : "disabled"}
          onPress={createActivity}
          isDisabled={isDisabled} />
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