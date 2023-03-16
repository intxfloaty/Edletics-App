import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { addAndFetchOpponent } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native';

const TeamChat = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const teams = fetchOpponentTeams()
  const navigation = useNavigation()

  return (
    <View style={styles.parent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {teams?.map((team, index) => {
          return (
            <Pressable key={index} style={styles.newGameContainer} onPress={() => {
              addOpponent(currentTeam?.teamId, currentTeam, team.teamId, team)
            }}>
              <Text style={styles.text}>{team.teamName}</Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TeamChat

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  newGameContainer: {
    backgroundColor: 'white',
    minHeight: 150,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
    marginVertical: 2
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // width: "100%",
    marginTop: 10
  }
})