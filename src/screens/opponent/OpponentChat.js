import { StyleSheet, View, Text, Modal, TouchableHighlight, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { userAuthState, usePlayerDetails, addAndFetchOpponent, sendAndFetchGameRequest, updateGameRequestStatus, useOpponentMessages, updateGameSquad } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat';
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '../../components/CustomModal'
import CustomInput from '../../components/CustomInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const OpponentChat = ({ route }) => {
  const { opponentTeam } = route.params
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const currentTeam = useSelector(state => state.currentTeam)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const teams = fetchOpponentTeams(currentTeam)
  const { sendGameRequestToOpponent, fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId, opponentTeam?.teamId)
  const { acceptGameRequest, declineGameRequest } = updateGameRequestStatus()
  const { messages, sendMessage } = useOpponentMessages(opponentTeam, currentTeam);
  const [chatMessages, setChatMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [gameRequestModalVisible, setGameRequestModalVisible] = useState(false)
  const formatOptions = ["5v5"]
  const modeOptions = ["Rated", "Friendly"]
  const locationOptions = ["MRIS Turf", "Kicksal", "Jasola Sports Complex", "Addidas base chhatarpur"]
  const numberOfPlayers = ["1", "3", "5", "6", "7", "8", "9", "10", "11"]
  const [game, setGame] = useState({
    format: "5v5",
    mode: "Rated",
    location: "",
    date: "",
    time: "",
    squadSize: 1,
    status: "InProgress"
  })

  // function to date and time of practice
  const onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const selectedDateObject = new Date(selectedDate);
      const formattedDate = selectedDateObject.toLocaleDateString();
      setGame({ ...game, date: formattedDate });
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      const selectedTimeObject = new Date(selectedTime);
      const formattedTime = selectedTimeObject.toLocaleTimeString();
      setGame({ ...game, time: formattedTime });
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: currentMode === "date" ? onDateChange : onTimeChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const openGameRequestModal = () => {
    setGameRequestModalVisible(true)
  }

  const closeGameRequestModal = () => {
    setGameRequestModalVisible(false)
  }

  const onAddIconPressed = () => {
    openGameRequestModal()
    // 
    // const customMessage = `${opponentTeam?.teamName} sent you a game request!`; // Replace this with the desired custom message
    // sendMessage(customMessage, user?.uid);
  };

  const onFootballIconPressed = () => {
    openModal()
  };

  useLayoutEffect(() => {
    setChatMessages(
      messages.map((message) => ({
        ...message,
        user: {
          _id: message?.user?._id,
          name: message?.user?.name,
          // avatar: 'https://placeimg.com/140/140/any',
        },
      })),
    );
  }, [messages]);


  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    sendMessage(message.text, user?.uid);
  }, [user]);

  return (
    <View style={styles.parent}>
      <View style={styles.chatHeaderBox}>
        <Text style={styles.text}>{opponentTeam?.teamName}</Text>
        <View style={styles.iconContainer}>
          <Icon
            name="add-outline"
            size={30}
            color="white"
            onPress={onAddIconPressed}
          />
          <Icon
            name="football-outline"
            size={30}
            color="white"
            onPress={onFootballIconPressed}
          />
        </View>
      </View>
      <GiftedChat
        messages={chatMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
        }}
      />


      {/* Modal component for sending game requests - ADDIcon */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameRequestModalVisible}
        onRequestClose={closeGameRequestModal}>
        <View style={styles.modalView}>
          <View style={styles.searchContainer}>
            <Icon name="arrow-back-outline" size={25} style={styles.searchIcon} color="white" onPress={closeGameRequestModal} />
          </View>
          <ScrollView>
            <View style={styles.formatContainer}>
              <Text style={styles.label}>Format</Text>
              <CustomModal
                options={formatOptions}
                selectedValue={game.format}
                handleOptionPress={(optionValue) => {
                  setGame({ ...game, format: optionValue })
                }} />
            </View>
            <View style={styles.modeContainer}>
              <Text style={styles.label}>Mode</Text>
              <CustomModal
                options={modeOptions}
                selectedValue={game.mode}
                handleOptionPress={(optionValue) => {
                  setGame({ ...game, mode: optionValue })
                }}
              />
            </View>
            <View style={styles.numOfPlayersContainer}>
              <Text style={styles.label}>Number of Players</Text>
              <CustomModal
                options={numberOfPlayers}
                selectedValue={game.squadSize}
                handleOptionPress={(optionValue) => {
                  setGame({ ...game, squadSize: optionValue })
                }} />
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Location</Text>
              <CustomModal
                options={locationOptions}
                selectedValue={game.location}
                handleOptionPress={(optionValue) => {
                  setGame({ ...game, location: optionValue })
                }}
              />
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.locationText}>Date </Text>
              <CustomInput
                onPressIn={showDatepicker}
                showSoftInputOnFocus={false}
                value={game.date} />
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.locationText}>Time</Text>
              <CustomInput
                onPressIn={showTimepicker}
                showSoftInputOnFocus={false}
                value={game.time} />
            </View>
            <View style={styles.btnContainer}>
              <CustomButton
                text="Send Request"
                onPress={() => sendGameRequestToOpponent(currentTeam, opponentTeam, game)}
                type="SECONDARY"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>



      {/* Modal component for received game requests - footballIcon */}
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
                {currentTeam?.teamAdmin === playerDetails?.userId && request?.gameRequestStatus === "pending"
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
    </View>
  );
}

export default OpponentChat

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
  },
  chatHeaderBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2f3136",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "20%",
  },
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  formatContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  categoryContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  modeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  numOfPlayersContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,

  },
  locationContainer: {
    justifyContent: "center"
  },
  locationText: {
    color: "white",
    fontSize: 20,
    fontWeight: '300',
    marginVertical: 10,
  },
  label: {
    marginVertical: 10,
    marginHorizontal: 10,
    color: "white",
    fontSize: 20,
    fontWeight: '300',
  },
})
