import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from './CustomInput'

const NewActivityPractice = () => {
  return (
    <View>
      <View style={styles.activityTitle}>
        <Text style={styles.label}>Title</Text>
        <CustomInput type="activity" />
      </View>

      <View style={styles.activityLocation}>
        <Text style={styles.label}>Location</Text>
        <CustomInput />
      </View>

      <View style={styles.activityDateAndTime}>
        <Text style={styles.label}>Time</Text>
        <CustomInput />
      </View>

      <View style={styles.activityInvitations}>
        <Text style={styles.label}>Invitations</Text>
        <CustomInput />
      </View>

      <View style={styles.activityAdditionalInfo}>
        <Text style={styles.label}>Additional Information</Text>
        <CustomInput />
      </View>

      <View style={styles.privateNotesForCoaches}>
        <Text style={styles.label}>Private notes for Coaches</Text>
        <CustomInput />
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