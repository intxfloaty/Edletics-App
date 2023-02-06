import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const NewActivityPractice = ({ practice, setPractice }) => {

  // function to date and time of practice
  const showDatepicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate.toLocaleString();
      setPractice({ ...practice, date: currentDate });
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
          value={practice.title}
          setValue={(value) => setPractice({ ...practice, title: value })} />
      </View>

      <View style={styles.activityLocation}>
        <Text style={styles.label}>Location</Text>
        <CustomInput
          value={practice.location}
          setValue={(value) => setPractice({ ...practice, location: value })} />
      </View>

      <View style={styles.activityDateAndTime}>
        <Text style={styles.label}>Time</Text>
        <CustomInput
          onPressIn={showDatepicker}
          showSoftInputOnFocus={false}
          value={practice.date} />
      </View>

      <View style={styles.activityInvitations}>
        <Text style={styles.label}>Invitations</Text>
        <CustomInput
          value={practice.invitations}
          setValue={(value) => setPractice({ ...practice, invitations: value })} />
      </View>

      <View style={styles.activityAdditionalInfo}>
        <Text style={styles.label}>Additional Information</Text>
        <CustomInput
          value={practice.additionalInfo}
          setValue={(value) => setPractice({ ...practice, additionalInfo: value })}
          multiline={true}
          numberOfLines={4} />
      </View>

      <View style={styles.privateNotesForCoaches}>
        <Text style={styles.label}>Private notes for Coaches</Text>
        <CustomInput
          value={practice.privateNotes}
          setValue={(value) => setPractice({ ...practice, privateNotes: value })}
          multiline={true}
          numberOfLines={4} />
      </View>
    </View>
  )
}

export default NewActivityPractice

const styles = StyleSheet.create({
  activityTitle: {
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: '300',
  },
})