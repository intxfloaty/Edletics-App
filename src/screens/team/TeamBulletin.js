import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userAuthState, usePlayerDetails, createAndFetchGame } from '../../firebase/firebase';
import GameModal from '../../components/GameModal';
import CustomButton from '../../components/CustomButton';

const TeamBulletin = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { fetchNewGame } = createAndFetchGame()
  const [newGame, setNewGame] = useState([])
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation()

  fetchNewGame(currentTeam?.teamId, setNewGame)

  const onAddPressed = () => {
    navigation.navigate("CreateGame")
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onGoingPressed = () => {

  }

  const onNotGoingPressed = () => {

  }
  
  return (
    <>
      <View style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {newGame.map((game, index) => {
            return (
              <Pressable key={index} style={styles.newGameContainer} onPress={showModal}>
                <Text style={styles.text}>{game.format} - {game.mode}</Text>
                <Text style={styles.text}>{game.location}</Text>
                <Text style={styles.text}>{game.date}</Text>
                <View style={styles.btn}>
                  <CustomButton text="Going" type="TERTIORY" onPress={onGoingPressed} />
                  <CustomButton text="Not Going" type="TERTIORY" onPress={onNotGoingPressed} />
                </View>
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
      <GameModal
        visible={visible}
        hideModal={hideModal} />
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
    marginVertical: 10
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
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})