import { Pressable, ScrollView, StyleSheet, Text, View, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchAllTeams, sendGameRequest } from '../firebase/firebase';

const CustomModal = ({ modalVisible, toggleModal, handleBackdropPress, currentTeam, currentGame }) => {
  const allTeams = fetchAllTeams(currentTeam?.teamAdminId)
  const { createGameRequest, sendGameRequestToTeam } = sendGameRequest()

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
                size={40}
                style={styles.arrowBackIcon}
                color={"black"}
                onPress={() => {
                  toggleModal()
                }} />
              {allTeams.map((team, index) => {
                return (
                  <Pressable key={index} style={styles.teamList} onPress={() => {
                    createGameRequest(currentTeam?.teamId, currentGame, team?.teamId)
                    sendGameRequestToTeam(team?.teamId, currentGame, currentTeam?.teamId)
                  }}>
                    <Text style={styles.teamName}>{team.teamName}</Text>
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

export default CustomModal

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
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
  },
  arrowBackIcon: {
    position: "absolute",
    top: 5,
    left: 5
  },
  teamList: {
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  teamName: {
    fontSize: 20,
    color: "black",
  }
})