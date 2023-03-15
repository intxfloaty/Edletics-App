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

      <SelectOpponentModal
        toggleModal={toggleModal}
        handleBackdropPress={handleBackdropPress}
        modalVisible={modalVisible}
        currentTeam={currentTeam}
        currentGame={currentGame} />


      <View style={styles.btn}>
        <CustomButton text="Join Squad" type="TERTIORY" onPress={() => {
          console.log(first)
        }} />
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