import { Pressable, ScrollView, StyleSheet, Text, View, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { addAndFetchOpponent, sendAndFetchGameRequest } from '../firebase/firebase';

const CreateGameModal = ({ modalVisible, toggleModal, handleBackdropPress, currentTeam, squad }) => {
  const { fetchMyOpponentWithSquadReady } = addAndFetchOpponent()
  const opponent = fetchMyOpponentWithSquadReady(currentTeam?.teamId)
  const { sendGameRequestToOpponent } = sendAndFetchGameRequest()
  console.log(opponent, "opponent")

  return (
    <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Icon
                name="arrow-back"
                size={25}
                style={styles.arrowBackIcon}
                color={"white"}
                onPress={() => {
                  toggleModal()
                }} />

              <View style={styles.gameDetails}>
                <Text style={styles.text}>Mode : {squad?.mode}</Text>
                <Text style={styles.text}>Format : {squad?.format}</Text>
                <Text style={styles.text}>Players: {squad?.numOfPlayers}</Text>
                <Text style={styles.text}> Location: {squad?.location}</Text>
                <Text style={styles.text}>Date : {squad?.date}</Text>
              </View>

              <Text style={styles.opponent}>Select Opponent</Text>

              {opponent?.map((opponent, index) => {
                return (
                  <Pressable key={index} style={styles.teamList} onPress={() => {
                    sendGameRequestToOpponent(currentTeam?.teamId, opponent?.teamId, squad)
                  }}>
                    <Text style={styles.teamName}> Team: {opponent?.teamName}</Text>
                  </Pressable>
                )
              })
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default CreateGameModal

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: '#101112',
    borderRadius: 5,
    padding: 10,
  },
  arrowBackIcon: {
    position: "absolute",
    top: 5,
    left: 5
  },
  gameDetails: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
  },
  opponent: {
    color: "blue",
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center"
  },

  teamList: {
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  teamName: {
    fontSize: 20,
    color: "white",
  }
})