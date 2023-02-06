import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const TeamActivity = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.activityHeader}>
        <Pressable style={styles.closeButton}>
          <Text style={styles.headerText}>X</Text>
        </Pressable>
        <Text style={styles.headerText}>New Activity</Text>
        <Pressable style={styles.createButton}>
          <Text style={styles.headerText}>Create</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.activityContainer}>
        <View style={styles.typeOfActivity}>
          <CustomButton text="Practice" type="activity" />
          <CustomButton text="Game" type="activity" />
          <CustomButton text="Tournament" type="activity" />
        </View>

        <View style={styles.activityTitle}>
          <Text style={styles.label}>Title</Text>
          <CustomInput type="activity" />
        </View>

        <View style={styles.activityLocation}>
          <Text style={styles.label}>Location</Text>
          <CustomInput />
        </View>

        <View style={styles.activityTime}>
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

      </ScrollView>
    </View>
  )
}

export default TeamActivity

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#101112",
  },
  activityHeader: {
    position: "relative",
    top: 0,
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 2
  },
  closeButton: {
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: "black"
  },
  activityContainer: {
    height: "100%"
  },
  typeOfActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  activityTitle: {
  },
  label: {
    color: "black",
    fontSize: 20,
    fontWeight: '400',
  },
})