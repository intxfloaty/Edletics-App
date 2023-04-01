import { StyleSheet, Text, TextInput, View, TouchableHighlight, Modal, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { userAuthState, usePlayerDetails, addAndFetchOpponent, sendAndFetchGameRequest, updateGameRequestStatus, useOpponentsChatList } from '../../firebase/firebase'


const SelectOpponent = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const currentTeam = useSelector(state => state.currentTeam)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const opponentTeams = fetchOpponentTeams();
  const myOpponentsList = useOpponentsChatList(user?.phoneNumber)
  console.log(myOpponentsList, "myOpponentsList")
  const { fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId)
  const { acceptGameRequest, declineGameRequest } = updateGameRequestStatus()
  const [modalVisible, setModalVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredTeams, setFilteredTeams] = useState([])
  const navigation = useNavigation();

  const openSearchModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    if (searchText !== "") {
      fetchSearchedTeams(searchText);
    }
  }, [searchText]);

  const fetchSearchedTeams = (searchText) => {
    const fetchedTeams = opponentTeams?.filter((team) => {
      return (
        team?.teamAdmin === user?.uid &&
        team?.teamName.toLowerCase() === searchText.toLowerCase()
      );
    });
    setFilteredTeams(fetchedTeams);
  };


  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <Text style={styles.text}>Opponents</Text>
        <Icon
          name="search-outline"
          size={25}
          style={styles.searchIcon}
          color="white"
          onPress={openSearchModal} />
      </View>
      <View style={styles.opponentsList}>
        {myOpponentsList?.map((team, index) => (
          <TouchableHighlight
            underlayColor="#4a4a4a"
            style={styles.opponentTeamContainer}
            key={index}
            onPress={() => {
              navigation.navigate('OpponentChat', { opponentTeam: team })
            }}>
            <>
              <Avatar.Text size={40} label="MT" style={styles.avatar} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{team.teamName} </Text>
                <Text style={styles.subText}>Rating</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} style={styles.arrowIcon} color="white" />
            </>
          </TouchableHighlight>
        ))}
      </View>

      {/* Add a Modal component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={25} style={styles.searchIcon} color="white" />
            <TextInput
              style={styles.searchBox}
              placeholder="Search and connect with teams"
              placeholderTextColor="#ccc"
              onChangeText={text => setSearchText(text)}
              value={searchText}
              onFocus={openSearchModal}
            />
          </View>
          {filteredTeams?.map((team, index) => (
            <TouchableHighlight
              underlayColor="#4a4a4a"
              style={styles.opponentTeamContainer}
              key={index}
              onPress={() => {
                navigation.navigate('OpponentChat', { opponentTeam: team })
              }}>
              <>
                <Avatar.Text size={40} label="MT" style={styles.avatar} color="white" />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{team.teamName} </Text>
                  <Text style={styles.subText}>Rating</Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} style={styles.arrowIcon} color="white" />
              </>
            </TouchableHighlight>
          ))}
        </View>
      </Modal>
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
  container: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchIcon: {
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  modalView: {
    flex: 1,
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  searchContainer: {
    marginTop: 30,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginTop: 10,
  },
  searchBox: {
    minHeight: 40,
    width: '100%',
    color: '#fff',
    marginLeft: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  modalTeamContainer: {
    width: "100%",
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    minHeight: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  modalTeamName: {
    color: "white",
    fontSize: 20,
  },
})



export default SelectOpponent



{/* {filteredTeams?.map((team, index) => {
        return (
          <TouchableHighlight
            underlayColor="#4a4a4a"
            style={styles.opponentTeamContainer}
            key={index}
            onPress={() => {
              addOpponent(currentTeam?.teamId, currentTeam, team.teamId, team)
            }}>
            <>
              
          </TouchableHighlight>
        )
      })} */}

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
