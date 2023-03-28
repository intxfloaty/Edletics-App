import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomModal from '../../components/CustomModal'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { createAndFetchSquad } from '../../firebase/firebase'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const CreateSquad = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { createSquadForGame } = createAndFetchSquad()
  const formatOptions = ["5v5"]
  const modeOptions = ["Rated", "Friendly"]
  const locationOptions = ["MRIS Turf", "Kicksal", "Jasola Sports Complex", "Addidas base chhatarpur"]
  const numberOfPlayers = ["1", "3", "5", "6", "7", "8", "9", "10", "11"]
  const [squad, setSquad] = useState({
    format: "5v5",
    mode: "Rated",
    location: "",
    date: "",
    time: "",
    squadSize: 1,
    status: "InProgress"
  })
  const navigation = useNavigation()

  // function to date and time of practice
  const onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const selectedDateObject = new Date(selectedDate);
      const formattedDate = selectedDateObject.toLocaleDateString();
      setSquad({ ...squad, date: formattedDate });
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      const selectedTimeObject = new Date(selectedTime);
      const formattedTime = selectedTimeObject.toLocaleTimeString();
      setSquad({ ...squad, time: formattedTime });
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


  // function to check if the value of all keys in an object are not empty.
  const isObjectNotEmpty = (obj) => {
    for (const key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  }

  const onCreateSquadPressed = () => {
    if (isObjectNotEmpty(squad)) {
      createSquadForGame(currentTeam?.teamId, squad)
      navigation.goBack("TeamBulletin")
    } else console.log("no activity")
  }


  return (
    <View style={styles.parent}>
      <ScrollView>
        <View style={styles.formatContainer}>
          <Text style={styles.label}>Format</Text>
          <CustomModal
            options={formatOptions}
            selectedValue={squad.format}
            handleOptionPress={(optionValue) => {
              setSquad({ ...squad, format: optionValue })
            }} />
        </View>
        <View style={styles.modeContainer}>
          <Text style={styles.label}>Mode</Text>
          <CustomModal
            options={modeOptions}
            selectedValue={squad.mode}
            handleOptionPress={(optionValue) => {
              setSquad({ ...squad, mode: optionValue })
            }}
          />
        </View>
        <View style={styles.numOfPlayersContainer}>
          <Text style={styles.label}>Number of Players</Text>
          <CustomModal
            options={numberOfPlayers}
            selectedValue={squad.squadSize}
            handleOptionPress={(optionValue) => {
              setSquad({ ...squad, squadSize: optionValue })
            }} />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Location</Text>
          <CustomModal
            options={locationOptions}
            selectedValue={squad.location}
            handleOptionPress={(optionValue) => {
              setSquad({ ...squad, location: optionValue })
            }}
          />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.locationText}>Date </Text>
          <CustomInput
            onPressIn={showDatepicker}
            showSoftInputOnFocus={false}
            value={squad.date} />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.locationText}>Time</Text>
          <CustomInput
            onPressIn={showTimepicker}
            showSoftInputOnFocus={false}
            value={squad.time} />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            text=" Create Squad"
            onPress={onCreateSquadPressed}
            type="SECONDARY"
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateSquad

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 20
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