import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerDetails, userAuthState } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { updateNewGameSquad } from '../../firebase/firebase'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SelectOpponentModal from '../../components/CreateGameModal';
import CreateGameModal from '../../components/CreateGameModal';

const GameDetails = ({ route }) => {
  const { squad } = route.params
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { updateNewGameSquadList } = updateNewGameSquad()
  const currentTeam = useSelector(state => state.currentTeam)
  // const currentGame = useSelector(state => state.currentGame)
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [joinSquad, setJoinSquad] = useState(false)

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

      <Text style={styles.text}>Mode : {squad?.mode}</Text>
      <Text style={styles.text}>Format : {squad?.format}</Text>
      <Text style={styles.text}>Players: {squad?.numOfPlayers}</Text>
      <Text style={styles.text}> Location: {squad?.location}</Text>
      <Text style={styles.text}>Date : {squad?.date}</Text>

      {squad?.playersList?.map((player, index) => {
        console.log(player)
        return (
          <Text key={index} style={styles.listItem}> Player: {player}</Text>
        )
      })}


      <CreateGameModal
        toggleModal={toggleModal}
        handleBackdropPress={handleBackdropPress}
        modalVisible={modalVisible}
        currentTeam={currentTeam}
        squad={squad} />


      <View style={styles.btn}>
        {!(squad?.playersList?.includes(`${playerDetails?.fullName}`)) //so that players can join only once
          && !joinSquad &&
          <CustomButton text="Join Squad" type="TERTIORY" onPress={() => {
            updateNewGameSquadList(currentTeam?.teamId, squad?.squadId, playerDetails?.fullName)
            setJoinSquad(true)
          }} />}
      </View>


      <View style={styles.btn}>
        {(currentTeam?.teamAdminName === playerDetails?.fullName) // so that only teamAdmins can create game
          && (squad?.playersList?.length == squad?.squadSize) && // so that game can be created only when squad is full
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