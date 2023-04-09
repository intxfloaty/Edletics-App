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
              <View style={styles.section}>
                <View style={styles.gameDetails}>
                  <View style={styles.dateTime}>
                    <Text style={styles.matchDate}>{squad.date}</Text>
                    <Text style={styles.matchTime}>{squad.time}</Text>
                  </View>
                  <View style={styles.divider}></View>
                  <View style={styles.teamNames}>
                    <Text style={styles.matchText}>{currentTeam?.teamName}</Text>
                    <Text style={styles.matchDate}>vs</Text>
                    <Text style={styles.matchText}>TBD</Text>
                    <Text style={styles.matchDate}>{squad?.location}</Text>
                  </View>
                  <View style={styles.divider}></View>
                  <View style={styles.formatDetails}>
                    <Text style={styles.matchDate}>{squad?.mode}</Text>
                    <Text style={styles.matchDate}>{squad?.format}</Text>
                    
                  </View>

                </View>
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
    fontSize: 20,
    marginVertical: 2,
  },
  whiteText: {
    color: 'white',
  },
  newGameContainer: {
    backgroundColor: '#202224',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  lineupRequest: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
  section: {
    marginBottom: 10,
  },
  gameDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  matchDate: {
    fontSize: 14,
    color: '#B2B2B2',
  },
  matchTime: {
    fontSize: 12,
    color: '#B2B2B2',
  },
  teamNames: {
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    width: 1,
    backgroundColor: '#B2B2B2',
    height: '60%',
    marginHorizontal: 15,
  },
  dateTime: {
    marginLeft: 10,
  },
  matchText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  addIcon: {
    position: "absolute",
    bottom: 5,
    right: 2,
    padding: 10,
  },
  formatDetails: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
})