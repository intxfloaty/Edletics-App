import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal, Portal, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerDetails, userAuthState, addAndFetchPlayers } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { updateTeamWithPlayers } from '../../firebase/firebase'
import CustomButton from '../../components/CustomButton';


const GameDetails = ({ game, visible, hideModal }) => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { updateTeamWithPlayersGoing, updateTeamWithPlayersNotGoing, fetchPlayersGoing } = updateTeamWithPlayers()
  const currentTeam = useSelector(state => state.currentTeam)
  const currentGame = useSelector(state => state.currentGame)
  const { fetchPlayersOfTeam } = addAndFetchPlayers();
  const playersGoing = fetchPlayersGoing(currentTeam?.teamId, currentGame?.gameId)

  // fetchPlayersOfTeam(currentTeam, setPlayerList);

  return (
    <View style={styles.parent}>
      <Icon
        name="arrow-back"
        size={40}
        style={styles.arrowBackIcon}
        color={"white"}
        onPress={hideModal}
      />
      <Icon
        name="game-controller-outline"
        size={25}
        color={"white"}
        style={styles.gameControllerIcon}
        onPress={() => {
        }} />
      <View style={styles.btn}>
        {!playersGoing.includes(`${playerDetails?.fullName}`) && <CustomButton text="Going" type="TERTIORY" onPress={() => {
          updateTeamWithPlayersGoing(currentTeam?.teamId, currentGame?.gameId, playerDetails?.fullName)
        }} />}
        <CustomButton text="Not Going" type="TERTIORY" onPress={() => {
          updateTeamWithPlayersNotGoing(currentTeam?.teamId, currentGame?.gameId, playerDetails?.fullName)
        }} />
      </View>



      {/* {playerList?.map((player, index) => {
            return (
              <List.Section key={index} >
                <List.Accordion
                  title={player?.fullName}
                  left={props => <List.Icon {...props} />}
                >
                  <List.Item title="Going" titleStyle={styles.listItem} />
                  <List.Item title="Not Going" titleStyle={styles.listItem} style={{ color: "blue" }} />
                </List.Accordion>
              </List.Section>
            )
          })} */}
    </View>
  )
}

export default GameDetails

const styles = StyleSheet.create({
  parent: {
    minHeight: "100%",
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center"
  },
  arrowBackIcon: {
    position: "absolute",
    top: 0,
    left: 5
  },
  gameControllerIcon: {
    position: "absolute",
    top: 0,
    right: 5
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20
  },
  listItem: {
    color: "white"
  }

})