import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { createAndFetchGame, sendGameRequest } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native';

const TeamChat = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { fetchGameRequest } = sendGameRequest()
  const { createNewGameFromGameRequest } = createAndFetchGame()
  const gameRequest = fetchGameRequest(currentTeam?.teamId)
  const navigation = useNavigation()

  return (
    <View style={styles.parent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {gameRequest.map((game, index) => {
          return (
            <Pressable key={index} style={styles.newGameContainer}>
              <Text style={styles.text}>{game.numOfPlayers}-{game.format} - {game.mode}</Text>
              <Text style={styles.text}>{game.location}</Text>
              <Text style={styles.text}>{game.date}</Text>
              <Text style={styles.text}>{game.gameId}</Text>
              <View style={styles.buttonContainer}>
                <CustomButton text="Add Players" type="TERTIORY" onPress={() => {
                  createNewGameFromGameRequest(currentTeam?.teamId, game.gameId, game)
                  navigation.goBack("TeamScreen")
                }} />
                <CustomButton text="Decline" type="TERTIORY" />
              </View>
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