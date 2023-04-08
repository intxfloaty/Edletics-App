import { StyleSheet, Text, TextInput, View, TouchableHighlight, Modal, } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCheckSquad } from '../../firebase/firebase'

const OpponentTeam = ({ team, navigation }) => {
    const isSquadReady = useCheckSquad(team?.teamId);
  
    return (
      <TouchableHighlight
        underlayColor="#4a4a4a"
        style={
          isSquadReady
            ? styles.opponentTeamContainerReady
            : styles.opponentTeamContainer
        }
        onPress={() => {
          navigation.navigate("OpponentChat", { opponentTeam: team, isSquadReady});
        }}
      >
        <>
          <Avatar.Text
            size={40}
            label="MT"
            style={styles.avatar}
            color="white"
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{team.teamName} </Text>
            <Text style={styles.subText}>Rating</Text>
          </View>
          <Icon
            name="chevron-forward-outline"
            size={20}
            style={styles.arrowIcon}
            color="white"
          />
        </>
      </TouchableHighlight>
    );
  };

  const styles = StyleSheet.create({
    opponentTeamContainer: {
        marginTop: 10,
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        minHeight: "10%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      opponentTeamContainerReady: {
        marginTop: 10,
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        minHeight: "10%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: 'green'
      },
      avatar: {
        position: "absolute",
        left: 10,
      },
      textContainer: {
        display: "flex",
        position: "absolute",
        left: 70
      },
      text: {
        color: "white",
        fontSize: 20,
      },
      subText: {
        fontSize: 16,
        color: "gray"
      },
      arrowIcon: {
        position: "absolute",
        right: 10,
      }
    });

export default OpponentTeam