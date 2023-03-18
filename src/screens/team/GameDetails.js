import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerDetails, userAuthState } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { updateGameSquad } from '../../firebase/firebase'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SelectOpponentModal from '../../components/CreateGameModal';
import CreateGameModal from '../../components/CreateGameModal';
import { sendAndFetchGameRequest } from '../../firebase/firebase'

const GameDetails = ({ route }) => {
  const { squad } = route.params
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { updateGameSquadList } = updateGameSquad()
  const currentTeam = useSelector(state => state.currentTeam)
  // const currentGame = useSelector(state => state.currentGame)
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [joinSquad, setJoinSquad] = useState(false)
  const { fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId)

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBackdropPress = () => {
    setModalVisible(false);
  };

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

      {gameRequest?.map((item, index) => {
        return (
          <View key={index}>
            {item?.gameRequestStatus === "accepted" &&
              <>
                <Text style={styles.text}>Game On!</Text>
                <Text style={styles.text}>Mode : {item?.mode}</Text>
                <Text style={styles.text}>Format : {item?.format}</Text>
                <Text style={styles.text}> Location: {item?.location}</Text>
                <Text style={styles.text}>Date : {item?.date}</Text>
                <Text style={styles.text}>Opponent : {item?.opponentName}</Text>
              </>
            }
          </View>
        )
      })
      }


      {squad?.playerList &&
        <Text style={styles.listItem}> Player: {squad.playerList.player}</Text>
      }


      <CreateGameModal
        toggleModal={toggleModal}
        handleBackdropPress={handleBackdropPress}
        modalVisible={modalVisible}
        currentTeam={currentTeam}
        squad={squad} />


      <View style={styles.btn}>
        {!(squad?.playerList?.player == playerDetails?.fullName) //so that players can join only once
          && !joinSquad &&
          <CustomButton text="Join Squad" type="TERTIORY" onPress={() => {
            updateGameSquadList(currentTeam?.teamId, playerDetails?.fullName, squad)
            setJoinSquad(true)
          }} />}
      </View>


      <View style={styles.btn}>
        {(currentTeam?.teamAdminName === playerDetails?.fullName) // so that only teamAdmins can create game
          &&  //TODO: so that game can be created only when squad is full
          <CustomButton
            text="Create Game"
            type="SECONDARY"
            onPress={() => {
              setModalVisible(true)
            }} />}
      </View>
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
    top: 5,
    left: 5
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
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