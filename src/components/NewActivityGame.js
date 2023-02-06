import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const NewActivityGame = ({ game, setGame }) => {

  // function to date and time of practice
  const showDatepicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate.toLocaleString();
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

  return (
    <View>
      <View style={styles.activityTitle}>
        <Text style={styles.label}>Opponent</Text>
        <CustomInput
          value={game.opponent}
          setValue={(value) => setGame({ ...game, opponent: value })} />
      </View>

      <View style={styles.activityTitle}>
        <Text style={styles.label}>Title</Text>
        <CustomInput
          value={game.title}
          setValue={(value) => setGame({ ...game, title: value })} />
      </View>

      <View style={styles.activityLocation}>
        <Text style={styles.label}>Location</Text>
        <CustomInput
          value={game.location}
          setValue={(value) => setGame({ ...game, location: value })} />
      </View>

      <View style={styles.activityDateAndTime}>
        <Text style={styles.label}>Time</Text>
        <CustomInput
          onPressIn={showDatepicker}
          showSoftInputOnFocus={false}
          value={game.date} />
      </View>

      <View style={styles.activityInvitations}>
        <Text style={styles.label}>Invitations</Text>
        <CustomInput
          value={game.invitations}
          setValue={(value) => setGame({ ...game, invitations: value })} />
      </View>

      <View style={styles.activityAdditionalInfo}>
        <Text style={styles.label}>Additional Information</Text>
        <CustomInput
          value={game.additionalInfo}
          setValue={(value) => setGame({ ...game, additionalInfo: value })}
          multiline={true}
          numberOfLines={4} />
      </View>

      <View style={styles.privateNotesForCoaches}>
        <Text style={styles.label}>Private notes for Coaches</Text>
        <CustomInput
          value={game.privateNotes}
          setValue={(value) => setGame({ ...game, privateNotes: value })}
          multiline={true}
          numberOfLines={4} />
      </View>
    </View>
  )
}

export default NewActivityGame

const styles = StyleSheet.create({
  activityTitle: {
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: '300',
  },
})