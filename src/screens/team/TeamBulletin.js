import { TouchableHighlight, StyleSheet, Text, View, ScrollView } from 'react-native'
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
          <View style={styles.headingText}>
            {/* <Text style={styles.headingText}>Join Squad</Text> */}
          </View>
          {squad &&
            <TouchableHighlight
              underlayColor="#4a4a4a"
              style={styles.newGameContainer}
              onPress={() => {
                navigation.navigate("GameDetails")
              }}>
              <>
                <Text style={styles.text}>Mode : {squad.mode}</Text>
                <Text style={styles.text}>Squad Size : {squad.squadSize}</Text>
                <Text style={styles.text}>Location : {squad.location}</Text>
                <Text style={styles.text}>Date : {squad.date}</Text>
              </>
            </TouchableHighlight>
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
  headingText: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  newGameContainer: {
    backgroundColor: '#202224',
    minHeight: 150,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    position: "absolute",
    bottom: 5,
    right: 2,
    padding: 10,
  },
})