import { StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { userAuthState, usePlayerDetails, addAndFetchOpponent, sendAndFetchGameRequest, updateGameRequestStatus, useMessages } from '../../firebase/firebase'


const SelectOpponent = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const currentTeam = useSelector(state => state.currentTeam)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const teams = fetchOpponentTeams(currentTeam)
  const { fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId)
  const { acceptGameRequest, declineGameRequest } = updateGameRequestStatus()
  const [searchText, setSearchText] = useState('')
  const [chats, setChats] = useState(['Chat 1'])

  const filteredChats = chats.filter(chat =>
    chat.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.parent}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} color="white" />
        <TextInput
          style={styles.searchBox}
          placeholder="Search and connect with teams"
          placeholderTextColor="#ccc"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
      </View>

      {/* <TouchableHighlight
        underlayColor="#4a4a4a"
        style={styles.myTeamchatContainer}
        onPress={() => {

        }}>
        <>
          <Avatar.Text size={40} label="MT" style={styles.avatar} color="white" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>My Team Fc</Text>
            <Text style={styles.subText}>Rating</Text>
          </View>
        </>
      </TouchableHighlight> */}

      <Text style={styles.text}>Opponents</Text>
      {teams?.map((team, index) => {
        return (
          <TouchableHighlight
            underlayColor="#4a4a4a"
            style={styles.opponentTeamContainer}
            key={index}
            onPress={() => {
              addOpponent(currentTeam?.teamId, currentTeam, team.teamId, team)
            }}>
            <>
              <Avatar.Text size={40} label="MT" style={styles.avatar} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{team.teamName} Fc</Text>
                <Text style={styles.subText}>Rating</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} style={styles.arrowIcon} color="white" />
            </>
          </TouchableHighlight>
        )
      })}

      {/* <Text style={styles.text}>Game Requests</Text>
        {gameRequest?.map((request, index) => {
          return (
            <Pressable key={index} style={styles.newGameContainer} onPress={() => {
            }}>
              <Text style={styles.text}>{request.date}</Text>
              <Text style={styles.text}>{request.format}</Text>
              <Text style={styles.text}>{request.location}</Text>
              <Text style={styles.text}>{request.mode}</Text>
              {currentTeam?.teamAdmin === playerDetails?.userId &&
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Accept"
                    type="TERTIORY"
                    onPress={() => {
                      acceptGameRequest(currentTeam?.teamId, request?.gameRequestId, currentTeam?.teamName, request)
                    }}
                  />
                  <CustomButton
                    text="Decline"
                    type="TERTIORY"
                    onPress={() => {
                      declineGameRequest(currentTeam?.teamId, request?.gameRequestId)
                    }}
                  />
                </View>}
            </Pressable>
          )
        })} */}
    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    height: '100%',
    padding: 10,
    backgroundColor: '#101112',
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchBox: {
    minHeight: 40,
    width: '100%',
    color: '#fff',
    marginLeft: 10,
  },

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
    color: "blue",
    fontSize: 20,
  },
  subText: {
    fontSize: 16,
    color: "gray"
  },
  arrowIcon : {
    position: "absolute",
    right: 10,
  },
  chatListContainer: {
    flex: 1,
    marginTop: 20,
  },
  chatContainer: {
    padding: 10,
    marginBottom: 10,
  },
  chatText: {
    color: '#fff',
  },
  newGameContainer: {
    backgroundColor: 'white',
    minHeight: 150,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  // text: {
  //   color: "blue",
  //   fontSize: 20,
  //   marginVertical: 2
  // },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
})



export default SelectOpponent
