import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import NewActivityPractice from '../components/NewActivityPractice'
import NewActivityGame from '../components/NewActivityGame'
import NewActivityTournament from './NewActivityTournament'

const TeamActivity = () => {
  const [typeOfActivityPressed, setTypeOfActivityPressed] = useState({
    Practice: false,
    Game: false,
    Tournament: false,
  })
  const [typeOfActivity, setTypeOfActivity] = useState("Practice")

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

  return (
    <View style={styles.parent}>
      <View style={styles.activityHeader}>
        <Pressable style={styles.closeButton}>
          <Text style={styles.headerText}>X</Text>
        </Pressable>
        <Text style={styles.headerText}>New Activity</Text>
        <Pressable style={styles.createButton}>
          <Text style={styles.headerText}>Create</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.activityContainer}>
        <View style={styles.typeOfActivity}>
          <CustomButton text="Practice" type="activity" onPress={onPracticePressed} />
          <CustomButton text="Game" type="activity" onPress={onGamePressed} />
          <CustomButton text="Tournament" type="activity" onPress={onTournamentPressed} />
        </View>
        {typeOfActivity === "Practice" && <NewActivityPractice />}
        {typeOfActivity === "Game" && <NewActivityGame />}
        {typeOfActivity === "Tournament" && <NewActivityTournament />}
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
    // backgroundColor: "#101112",
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
    fontWeight: '700',
    color: "black"
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