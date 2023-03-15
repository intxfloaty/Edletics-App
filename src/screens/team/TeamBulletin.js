import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthState, usePlayerDetails, createSquad, updateNewGameSquad } from '../../firebase/firebase';
import { selectMyCurrentGame } from '../../redux/actions/actions';

const TeamBulletin = () => {
  const dispatch = useDispatch()
  const currentTeam = useSelector(state => state.currentTeam)
  const currentGame = useSelector(state => state.currentGame)
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { fetchSquad } = createSquad()
  const { deleteNewGameSquad } = updateNewGameSquad()
  const newSquad = fetchSquad(currentTeam?.teamId)
  const navigation = useNavigation()

  const onAddPressed = () => {
    navigation.navigate("CreateSquad")
  }

  return (
    <>
      <View style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {newSquad?.map((squad, index) => {
            return (
              <Pressable key={index} style={styles.newGameContainer} onPress={() => {
                // dispatch(selectMyCurrentGame(game))
                // if (currentGame?.gameId) {
                navigation.navigate("GameDetails", { squadId: squad.squadId })
                // }
              }}>
                {currentTeam?.teamAdmin === playerDetails?.userId &&
                  <Icon
                    name="trash-outline"
                    size={25}
                    color={"black"}
                    style={styles.trashIcon}
                    onPress={() => {
                      deleteNewGameSquad(currentTeam?.teamId, squad.squadId)
                    }} />
                }
                <Text style={styles.text}>{squad.numOfPlayers}-{squad.format} - {squad.mode}</Text>
                <Text style={styles.text}>{squad.location}</Text>
                <Text style={styles.text}>{squad.date}</Text>
                <Text style={styles.text}>{squad.squadId}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
        {currentTeam?.teamAdmin === playerDetails?.userId &&
          <Icon
            name="add-outline"
            size={40}
            style={styles.addIcon}
            color={"white"}
            onPress={onAddPressed}
          />
        }
      </View>
    </>
  )
}

export default TeamBulletin

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  text: {
    color: "black",
    fontSize: 20,
    marginVertical: 2
  },
  addIcon: {
    position: "absolute",
    bottom: 5,
    right: 2,
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
  gameControllerIcon: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  trashIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
})