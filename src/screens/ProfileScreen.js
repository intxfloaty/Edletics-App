import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const ProfileScreen = () => {
  const [fullName, setFullName] = useState("")
  const [date, setDate] = useState(new Date(1598051730000));
  const [emailAddress, setEmailAddress] = useState("")
  const [location, setLocation] = useState("")


  const showDatepicker = () => {
    console.log(date.toLocaleString().replace(", 4:45:30 AM", " "), "date")
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };

    showMode('date');
  };

  return (
      <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.profileImageContainer}></Pressable>
        <View style={styles.profileInfoContainer} >
          <Text style={styles.inputText}>FULL NAME</Text>
          <CustomInput
            value={fullName}
            setValue={(text) => setFullName(text)}
          />
          <Text style={styles.inputText}>DATE OF BIRTH</Text>
          <CustomInput
            onPressIn={showDatepicker}
            showSoftInputOnFocus={false}
            value={date.toLocaleString().replace(", 4:45:30 AM", " ")}
          />
          <Text style={styles.inputText}>EMAIL ADDRESS</Text>
          <CustomInput
            keyboardType="email-address"
            value={emailAddress}
            inputName="emailAddress"
            setValue={(text) => setEmailAddress(text)}
          />
          <Text style={styles.inputText}>LOCATION</Text>
          <CustomInput
            value={location}
            inputName="location"
            setValue={(text) => setLocation(text)}
          />
          <CustomButton
            text="SUBMIT"
          // onPress={onSubmitPressed} 
          />
        </View>
      </ScrollView >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImageContainer: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
  },
  profileInfoContainer: {
    width: "100%"
  },
  inputText: {
    marginTop: 10,
    color: "white"
  },

})