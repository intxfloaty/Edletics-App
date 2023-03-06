import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userAuthState, usePlayerDetails, createAndFetchGame, updateTeamWithPlayers } from '../../firebase/firebase';
import GameModal from '../../components/GameModal';
import CustomButton from '../../components/CustomButton';

const TeamBulletin = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { fetchNewGame } = createAndFetchGame()
  const { updateTeamWithPlayersGoing, updateTeamWithPlayersNotGoing, deleteGame } = updateTeamWithPlayers()
  const [newGame, setNewGame] = useState([])
  const [visible, setVisible] = React.useState(false);
  const [going, setGoing] = useState(false)
  const navigation = useNavigation()

  fetchNewGame(currentTeam?.teamId, setNewGame)

  const onAddPressed = () => {
    navigation.navigate("CreateGame")
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <View style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {newGame.map((game, index) => {
            return (
              <Pressable key={index} style={styles.newGameContainer} onPress={showModal}>
                {currentTeam?.teamAdmin === playerDetails?.userId &&
                  <Icon
                    name="trash-outline"
                    size={25}
                    color={"black"}
                    style={styles.trashIcon}
                    onPress={() => {
                      deleteGame(currentTeam?.teamId, game.gameId)
                    }} />
                }
                <Text style={styles.text}>{game.format} - {game.mode}</Text>
                <Text style={styles.text}>{game.location}</Text>
                <Text style={styles.text}>{game.date}</Text>
                <Text style={styles.text}>{game.gameId}</Text>
                <View style={styles.btn}>
                  {!going &&
                    <CustomButton text="Going" type="TERTIORY" onPress={() => {
                      setGoing(true)
                      updateTeamWithPlayersGoing(currentTeam?.teamId, game.gameId, playerDetails?.fullName)
                    }} />
                  }
                  <CustomButton text="Not Going" type="TERTIORY" onPress={() => {
                    setGoing(false)
                    updateTeamWithPlayersNotGoing(currentTeam?.teamId, game.gameId, playerDetails?.fullName)
                  }} />
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
  trashIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})