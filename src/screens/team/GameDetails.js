import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerDetails, userAuthState } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { updateTeamWithPlayers, updateTeamWithOpponent } from '../../firebase/firebase'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SelectOpponentModal from '../../components/SelectOpponentModal';

const GameDetails = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { updateTeamWithPlayersGoing, updateTeamWithPlayersNotGoing, fetchPlayersGoing } = updateTeamWithPlayers()
  const { updateOpponent } = updateTeamWithOpponent()
  const currentTeam = useSelector(state => state.currentTeam)
  const currentGame = useSelector(state => state.currentGame)
  const playersGoing = fetchPlayersGoing(currentTeam?.teamId, currentGame?.gameId)
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBackdropPress = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.parent}>
        <Icon
          name="arrow-back"
          size={25}
          style={styles.arrowBackIcon}
          color={"white"}
          onPress={() => {
            navigation.goBack("TeamBulletin")
          }} />

        <Text style={styles.text}>{currentGame?.numOfPlayers}-{currentGame?.format} - {currentGame?.mode}</Text>
        <Text style={styles.text}>{currentGame?.location}</Text>
        <Text style={styles.text}>{currentGame?.date}</Text>
        <Text style={styles.text}>{currentGame?.gameId}</Text>
        {currentGame?.opponent && <Text style={styles.text}>Opponent: {currentGame?.opponent}</Text>}

        {playersGoing?.includes(`${playerDetails?.fullName}`) && playersGoing?.length >= currentGame.numOfPlayers &&
          <Icon
            name="game-controller-outline"
            size={25}
            color={"white"}
            style={styles.gameControllerIcon}
            onPress={toggleModal} />
        }

        <SelectOpponentModal
          toggleModal={toggleModal}
          handleBackdropPress={handleBackdropPress}
          modalVisible={modalVisible}
          currentTeam={currentTeam}
          currentGame={currentGame} />


        <View style={styles.btn}>
          {!playersGoing?.includes(`${playerDetails?.fullName}`) && <CustomButton text="Going" type="TERTIORY" onPress={() => {
            updateTeamWithPlayersGoing(currentTeam?.teamId, currentGame?.gameId, playerDetails?.fullName)
          }} />}
          <CustomButton text="Not Going" type="TERTIORY" onPress={() => {
            updateTeamWithPlayersNotGoing(currentTeam?.teamId, currentGame?.gameId, playerDetails?.fullName)
          }} />
        </View>
        {playersGoing?.includes(`${playerDetails?.fullName}`) && playersGoing?.length >= currentGame.numOfPlayers  &&
          < CustomButton text="Axxept Game" type="SECONDARY" onPress={() => {
            updateOpponent(currentGame?.opponentTeamId, currentGame?.gameId, currentTeam?.teamName)
          }} />
        }
      </View>
    </>
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
    top: 5,
    left: 5
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
  },
  gameControllerIcon: {
    position: "absolute",
    top: 5,
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