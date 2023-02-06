import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const NewActivityPractice = ({ title, setTitle, location, setLocation, date, setDate, invitations, setInvitations, additionalInfo, setAdditionalInfo, privateNotes, setPrivateNotes }) => {

  // function to date and time of practice
  const showDatepicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate.toLocaleString();
      setDate(currentDate);
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

  return (
    <View>
      <View style={styles.activityTitle}>
        <Text style={styles.label}>Title</Text>
        <CustomInput
          value={title}
          setValue={setTitle} />
      </View>

      <View style={styles.activityLocation}>
        <Text style={styles.label}>Location</Text>
        <CustomInput
          value={location}
          setValue={setLocation} />
      </View>

      <View style={styles.activityDateAndTime}>
        <Text style={styles.label}>Time</Text>
        <CustomInput
          onPressIn={showDatepicker}
          showSoftInputOnFocus={false}
          value={date} />
      </View>

      <View style={styles.activityInvitations}>
        <Text style={styles.label}>Invitations</Text>
        <CustomInput
          value={invitations}
          setValue={setInvitations} />
      </View>

      <View style={styles.activityAdditionalInfo}>
        <Text style={styles.label}>Additional Information</Text>
        <CustomInput
          value={additionalInfo}
          setValue={setAdditionalInfo} />
      </View>

      <View style={styles.privateNotesForCoaches}>
        <Text style={styles.label}>Private notes for Coaches</Text>
        <CustomInput
          value={privateNotes}
          setValue={setPrivateNotes} />
      </View>
    </View>
  )
}

export default NewActivityPractice

const styles = StyleSheet.create({
  activityTitle: {
  },
  label: {
    color: "black",
    fontSize: 20,
    fontWeight: '400',
  },
})