import { Pressable, ScrollView, StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../components/CustomInput';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CustomModal from '../components/CustomModal';


const CreateGame = () => {
  const formatOptions = ["5v5", "6v6", "7v7", "8v8", "9v9", "11v11"]
  const categoryOptions = ["open", "U23", "U21", "U19", "U16", "corporate"]
  const modeOptions = ["Rated", "Friendly"]
  const locationOptions = ["MRIS Turf", "Kicksal", "Jasola Sports Complex", "Addidas base chhatarpur"]


  const [game, setGame] = useState({
    format: "5v5",
    category: "open",
    mode: "Rated",
    location: "",
    date: "",
  })

  // function to date and time of practice
  const showDatepicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate.toLocaleString()
      setGame({ ...game, date: currentDate });
    };
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: new Date(1598051730000),
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };

    showMode('date');
  };


  // function to check if the value of all keys in an object are not empty.
  const isObjectNotEmpty = (obj) => {
    for (const key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  }

  const onGamePressed = () => {
    if (isObjectNotEmpty(game)) {
      try {
        firestore()
          .collection("newGame")
          .doc(`${game?.format}_${game?.category}`)
          .set(game);
        console.log("New Activity added!");
      } catch (error) {
        console.log(error, "error message");
      }
    } else console.log("no activity")
  }

  return (
    <View style={styles.parent}>
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
        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Category</Text>
          <CustomModal
            options={categoryOptions}
            selectedValue={game.category}
            handleOptionPress={(optionValue) => {
              setGame({ ...game, category: optionValue })
            }}
          />
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
          <Text style={styles.locationText}>Date and Time</Text>
          <CustomInput
            onPressIn={showDatepicker}
            showSoftInputOnFocus={false}
            value={game.date} />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            text=" Create Game"
            onPress={onGamePressed}
            type="SECONDARY"
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateGame

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
  btnContainer: {
    alignItems: "center",
  }
})