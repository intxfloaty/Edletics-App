import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react';
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import CustomModal from '../CustomModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const SendGameRequestModal = ({ user, gameRequestModalVisible, closeGameRequestModal, sendGameRequestToOpponent, currentTeam, opponentTeam, sendMessage }) => {
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

  return (
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
              onPress={() => {
                sendGameRequestToOpponent(currentTeam, opponentTeam, game)
                const customMessage = `${opponentTeam?.teamName} sent you a game request!`; // Replace this with the desired custom message
                sendMessage(customMessage, user?.uid);
                closeGameRequestModal()
              }}
              type="SECONDARY"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default SendGameRequestModal

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