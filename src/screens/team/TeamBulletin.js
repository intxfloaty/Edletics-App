import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userAuthState, usePlayerDetails, createAndFetchSquad } from '../../firebase/firebase';

const TeamBulletin = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const { fetchSquad } = createAndFetchSquad()
  const squad = fetchSquad(currentTeam?.teamId)
  const navigation = useNavigation()

  const onAddPressed = () => {
    navigation.navigate("CreateSquad")
  }

  return (
    <>
      <View style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {squad &&
            <TouchableOpacity
              style={styles.newGameContainer}
              onPress={() => {
                navigation.navigate("GameDetails")
              }}>
              <View style={styles.upperSection}>
                <View style={styles.teamNames}>
                  <Text style={styles.matchText}>{currentTeam?.teamName}</Text>
                  <Text style={styles.text}> vs </Text>
                  <Text style={styles.matchText}>TBD</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.format}>
                  <Text style={styles.matchDate}>{squad?.mode}</Text>
                  <Text style={styles.matchDate}>{squad?.format}</Text>
                </View>
              </View>
              <View style={styles.details}>
                <Text style={styles.matchDate}>{squad.date}</Text>
                <Text style={styles.matchDate}>{squad?.startTime} - {squad?.endTime}</Text>
                <Text style={styles.matchDate}>{squad?.location}</Text>
              </View>
            </TouchableOpacity>
          }
        </ScrollView>
        {currentTeam?.teamAdmin === playerDetails?.userId &&
          <Icon
            name="add-outline"
            size={40}
            style={styles.addIcon}
            color={"white"}
            onPress={onAddPressed}
          />
        }
      </View>
    </>
  )
}

export default TeamBulletin

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  text: {
    color: '#B2B2B2',
    fontSize: 16,
    marginVertical: 2,
  },
  newGameContainer: {
    backgroundColor: '#202224',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    padding: 10,
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  teamNames: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  divider: {
    height: "60%",
    width: 1,
    backgroundColor: '#B2B2B2',
  },
  format: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  matchText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  matchDate: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  details: {
    flexDirection: "column",
    alignItems: "center",
  },
  addIcon: {
    position: "absolute",
    bottom: 5,
    right: 2,
    padding: 10,
  },
})