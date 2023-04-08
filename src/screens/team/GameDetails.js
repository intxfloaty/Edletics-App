import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerDetails, userAuthState, sendAndFetchGameRequest, createAndFetchSquad } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { updateGameSquad } from '../../firebase/firebase'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GameDetails = () => {
  const { user } = userAuthState();
  const currentTeam = useSelector(state => state.currentTeam)
  const { fetchSquad } = createAndFetchSquad()
  const squad = fetchSquad(currentTeam?.teamId)
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { updateGameSquadList } = updateGameSquad()
  const navigation = useNavigation()
  const { fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId,)


  return (
    <View style={styles.parent}>
      <Icon
        name="arrow-back"
        size={25}
        style={styles.arrowBackIcon}
        color={"white"}
        onPress={() => {
          navigation.goBack("TeamBulletin")
        }} />

      {/* players going for the game*/}
      <View style={styles.playersGoingContainer}>
        <Text style={styles.text}>Going:</Text>
        {squad?.playerList?.map((player, index) => {
          return (
            <View key={index} style={styles.playersGoingList}>
              <Text style={styles.listItem}>{player.name}</Text>
              <Icon
                name="checkmark-circle-outline"
                size={25}
                style={styles.checkmarkIcon}
                color={"white"}
                onPress={() => {
                  navigation.goBack("TeamBulletin")
                }} />
            </View>
          )
        })
        }
      </View>
      {/* end */}

      {squad?.game &&
        <View>
          <>
            <Text style={styles.text}>Game On!</Text>
            <Text style={styles.text}>Mode : {squad?.game?.mode}</Text>
            <Text style={styles.text}>Format : {squad?.game?.format}</Text>
            <Text style={styles.text}>Location: {squad?.game?.location}</Text>
            <Text style={styles.text}>Date : {squad?.game?.date}</Text>
            <Text style={styles.text}>Opponent : {squad?.game?.opponentName}</Text>
          </>
        </View>
      }


      {!(squad?.playerList?.some((player) => player.name === playerDetails?.fullName))
        &&
        <View style={styles.btn}>
          <CustomButton text="Join Squad" type="TERTIORY" onPress={() => {
            updateGameSquadList(currentTeam?.teamId, playerDetails?.fullName)
          }} />
        </View>}
    </View>
  )
}

export default GameDetails

const styles = StyleSheet.create({
  parent: {
    minHeight: "100%",
    backgroundColor: "#101112",
    padding: 20,
  },
  arrowBackIcon: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
  playersGoingContainer: {
    // backgroundColor: "#1E1F20",
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 50,
  },
  playersGoingList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
  },
  checkmarkIcon: {
    // position: "absolute",
    // right: 10,
    // top: 10,
    zIndex: 1,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20
  },
  listItem: {
    marginVertical: 20,
    color: "white",
    fontSize: 20,
  }
})