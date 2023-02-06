import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const NewActivityPractice = ({ tournament, setTournament }) => {

  // function to date and time of practice
  const showDatepicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate.toLocaleString();
      setTournament({ ...tournament, date: currentDate });
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
          value={tournament.title}
          setValue={(value) => setTournament({ ...tournament, title: value })} />
      </View>

      <View style={styles.activityLocation}>
        <Text style={styles.label}>Location</Text>
        <CustomInput
          value={tournament.location}
          setValue={(value) => setTournament({ ...tournament, location: value })} />
      </View>

      <View style={styles.activityDateAndTime}>
        <Text style={styles.label}>Time</Text>
        <CustomInput
          onPressIn={showDatepicker}
          showSoftInputOnFocus={false}
          value={tournament.date} />
      </View>

      <View style={styles.activityInvitations}>
        <Text style={styles.label}>Invitations</Text>
        <CustomInput
          value={tournament.invitations}
          setValue={(value) => setTournament({ ...tournament, invitations: value })} />
      </View>

      <View style={styles.activityAdditionalInfo}>
        <Text style={styles.label}>Additional Information</Text>
        <CustomInput
          value={tournament.additionalInfo}
          setValue={(value) => setTournament({ ...tournament, additionalInfo: value })}
          multiline={true}
          numberOfLines={4} />
      </View>
      <View style={styles.privateNotesForCoaches}>
        <Text style={styles.label}>Private notes for Coaches</Text>
        <CustomInput
          value={tournament.privateNotes}
          setValue={(value) => setTournament({ ...tournament, privateNotes: value })}
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