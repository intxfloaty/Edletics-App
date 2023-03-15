import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { usePlayerDetails, userAuthState } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { updateNewGameSquad } from '../../firebase/firebase'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SelectOpponentModal from '../../components/SelectOpponentModal';

const GameDetails = ({ route }) => {
  const { squad } = route.params
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { updateNewGameSquadList } = updateNewGameSquad()
  const currentTeam = useSelector(state => state.currentTeam)
  const currentGame = useSelector(state => state.currentGame)
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);

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

      <Text style={styles.text}>{squad?.numOfPlayers}-{squad?.format} - {squad?.mode}</Text>
      <Text style={styles.text}>{squad?.location}</Text>
      <Text style={styles.text}>{squad?.date}</Text>
      <Text style={styles.text}>{squad?.squadId}</Text>

      {squad?.playersList?.map((player, index) => {
        console.log(player)
        return (
          <Text key={index} style={styles.listItem}>{player}</Text>
        )
      })}


      <SelectOpponentModal
        toggleModal={toggleModal}
        handleBackdropPress={handleBackdropPress}
        modalVisible={modalVisible}
        currentTeam={currentTeam}
        currentGame={currentGame} />


      <View style={styles.btn}>
        {!(squad?.playersList?.includes(`${playerDetails?.fullName}`)) &&
          <CustomButton text="Join Squad" type="TERTIORY" onPress={() => {
            updateNewGameSquadList(currentTeam?.teamId, squad?.squadId, playerDetails?.fullName)
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