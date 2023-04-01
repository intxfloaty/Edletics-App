import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userAuthState, usePlayerDetails, createAndFetchTeam } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';
import SelectTeam from '../components/SelectTeam';
import SelectOpponent from '../components/team/SelectOpponent';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MyTeams = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const currentTeam = useSelector(state => state.currentTeam)
  console.log(currentTeam, "currentTeam")
  const [shareLinkModal, setShareLinkModal] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamFormat: "",
    teamLocation: "",
  })
  const { createTeam, fetchTeamDetails } = createAndFetchTeam(teamInfo, playerDetails)
  const [myTeams, setMyTeams] = useState([])
  const [activeTab, setActiveTab] = useState('myTeams')
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation();



  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }


  fetchTeamDetails(setMyTeams);

  // to create new teams 
  const onContinuePressed = () => {
    createTeam();
    setTeamInfo({
      teamName: "",
      teamLocation: "",
    })
    setShareLinkModal(true)
  }

  const onChatIconPressed = () => {
    navigation.navigate("TeamChat")
  }

  return (
    <View style={styles.parent}>
      <View style={styles.currentTeamBox}>
        <Icon
          name="chatbox-outline"
          size={25}
          style={styles.chatIcon}
          color={"white"}
          onPress={onChatIconPressed}
        />
        <TouchableHighlight
          underlayColor="#4a4a4a"
          onPress={() => navigation.navigate('TeamScreen')}
        >
          <>
            <Text style={styles.currentTeamText}>{currentTeam?.teamName}</Text>
          </>
        </TouchableHighlight>
        <Icon
          name="chevron-down-outline"
          size={30}
          color="white"
          onPress={openModal} />
      </View>

      <SelectOpponent />





      {/* Add a Modal component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <SelectTeam myTeams={myTeams} closeModal={closeModal} />

          <CreateTeam
            teamInfo={teamInfo}
            setTeamInfo={setTeamInfo}
            shareLinkModal={shareLinkModal}
            setShareLinkModal={setShareLinkModal}
            onContinuePressed={onContinuePressed} />
        </View>
      </Modal>



      {/* <View style={styles.tabContainer}>
        <TouchableHighlight
          onPress={() => setActiveTab('myTeams')}
          style={activeTab === 'myTeams' ? styles.activeTab : styles.inactiveTab}
        >
          <Text style={styles.tabText}>My Teams</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setActiveTab('opponent')}
          style={activeTab === 'opponent' ? styles.activeTab : styles.inactiveTab}
        >
          <Text style={styles.tabText}>Opponent</Text>
        </TouchableHighlight>
      </View> */}

      {/* {activeTab === 'myTeams' && <SelectTeam myTeams={myTeams} />}
      {activeTab === 'opponent' && <SelectOpponent />} */}


    </View>
  )
}

export default MyTeams

const styles = StyleSheet.create({
  parent: {
    minHeight: "100%",
    backgroundColor: "#101112",
  },
  currentTeamBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#202224',
  },
  currentTeamText: {
    color: "white",
    fontSize: 22,
  },

  modalView: {
    flex: 1,
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  // tabContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginVertical: 30,
  // },
  // tabText: {
  //   color: "white",
  //   fontSize: 20,
  // },
  // activeTab: {
  //   paddingHorizontal: 20,
  //   height: 40,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   backgroundColor: "blue",
  // },
  // inactiveTab: {
  //   paddingHorizontal: 20,
  // },
})
