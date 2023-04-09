import { StyleSheet, View, Text, Modal, TouchableHighlight, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import CustomButton from '../CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { userAuthState, updateGameRequestStatus, updateGameSquad } from '../../firebase/firebase'

const GameModal = ({ modalVisible, closeModal, gameRequest, currentTeam, opponentTeam }) => {
  const { user } = userAuthState()
  const { acceptGameRequest, declineGameRequest } = updateGameRequestStatus()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalView}>
        <View style={styles.searchContainer}>
          <Icon name="arrow-back-outline" size={25} style={styles.searchIcon} color="white" onPress={closeModal} />

        </View>
        <Text style={styles.text}>Game Request</Text>
        {gameRequest?.map((request, index) => {
          console.log(request, "request")
          return (
            <Pressable key={index} style={styles.newGameContainer} onPress={() => {
            }}>
              {request?.gameRequestStatus === "accepted" && <Text style={styles.text}>Game is fixed!!</Text>}
              <Text style={styles.text}>Mode: {request.mode}</Text>
              <Text style={styles.text}>Format: {request.format}</Text>
              <Text style={styles.text}>Date: {request.date}</Text>
              <Text style={styles.text}>Location: {request.location}</Text>
              <Text style={styles.text}>Opponent: {request.opponentName}</Text>
              {currentTeam?.teamAdmin === user?.uid && request?.gameRequestStatus === "pending"
                &&
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Accept"
                    type="TERTIORY"
                    onPress={() => {
                      acceptGameRequest(currentTeam, opponentTeam, request)
                      updateGameSquad(currentTeam, opponentTeam, request)
                    }}
                  />
                  <CustomButton
                    text="Decline"
                    type="TERTIORY"
                    onPress={() => {
                      declineGameRequest(currentTeam?.teamId, request?.gameRequestId)
                    }}
                  />
                </View>}
            </Pressable>
          )
        })}
      </View>
    </Modal>
  )
}

export default GameModal

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    height: "100%",
    backgroundColor: "#101112",
    padding: 20,
  },
  newGameContainer: {
    backgroundColor: "#2f3136",
    minHeight: "10%",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
})