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
    startTime: "",
    endTime: "",
    squadSize: 1,
    status: "InProgress"
  });
  const [dateError, setDateError] = useState("");
  const navigation = useNavigation();

  // function to date and time of practice
  const onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const selectedDateObject = new Date(selectedDate);
      const currentDateObject = new Date();
      // Set the time portion of the current date to 0 to compare only the date part
      currentDateObject.setHours(0, 0, 0, 0);

      if (selectedDateObject >= currentDateObject) {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(selectedDateObject);
        setSquad({ ...squad, date: formattedDate });
        setDateError("");
      } else {
        // You can display an error message or alert to inform the user that past dates are not allowed
        setDateError('Invalid Date, past dates are not valid.');
        setSquad({ ...squad, date: "" });
      }
    }
  };

  const onTimeChange = (type, event, selectedTime) => {
    if (selectedTime !== undefined) {
      const selectedTimeObject = new Date(selectedTime);
      const formattedTime = new Intl.DateTimeFormat('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(selectedTimeObject);
      setSquad({ ...squad, [type]: formattedTime });
    }
  };

  const showMode = (currentMode, type) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedTime) =>
        currentMode === "date" ? onDateChange(event, selectedTime) : onTimeChange(type, event, selectedTime),
      mode: currentMode,
      is24Hour: true
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = (type) => {
    showMode("time", type);
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
          {dateError.length != 0 && <Text style={{ color: "red" }}>{dateError}</Text>}
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.locationText}>Time Range:</Text>
          <Text style={styles.locationText}>Start</Text>
          <CustomInput
            onPressIn={() => showTimepicker("startTime")}
            showSoftInputOnFocus={false}
            value={squad.startTime} />
          <Text style={styles.locationText}>End</Text>
          <CustomInput
            onPressIn={() => showTimepicker("endTime")}
            showSoftInputOnFocus={false}
            value={squad.endTime} />
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