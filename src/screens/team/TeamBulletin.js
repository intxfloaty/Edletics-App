import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createAndFetchGame } from '../../firebase/firebase';
import { Modal, Portal } from 'react-native-paper';



const TeamBulletin = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { fetchNewGame } = createAndFetchGame()
  const [newGame, setNewGame] = useState([])
  const navigation = useNavigation()
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, height: "100%" };

  fetchNewGame(currentTeam?.teamId, setNewGame)

  console.log(newGame, "newGame")
  const onAddPressed = () => {
    navigation.navigate("CreateGame")
  }

  const onGamePressed = () => {

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
              </Pressable>
            )
          })}
        </ScrollView>
        <Icon
          name="add-outline"
          size={40}
          style={styles.addIcon}
          color={"white"}
          onPress={onAddPressed}
        />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          <Icon
            name="arrow-back"
            size={40}
            style={styles.arrowBackIcon}
            color={"black"}
            onPress={hideModal}
          />
        </Modal>
      </Portal>
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
  arrowBackIcon: {
    position: "absolute",
    top: 0,
    left: 5
  },

  newGameContainer: {
    backgroundColor: 'white',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})