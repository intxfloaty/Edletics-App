import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userAuthState, usePlayerDetails, createAndFetchTeam } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';
import SelectTeam from '../components/SelectTeam';
import SelectOpponent from '../components/team/SelectOpponent';

const MyTeams = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const [shareLinkModal, setShareLinkModal] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamFormat: "",
    teamLocation: "",
  })
  const { createTeam, fetchTeamDetails } = createAndFetchTeam(teamInfo, playerDetails)
  const [myTeams, setMyTeams] = useState([])
  const [activeTab, setActiveTab] = useState('myTeams')


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

  return (
    <View style={styles.parent}>

      <View style={styles.tabContainer}>
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
      </View>

      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {activeTab === 'myTeams' && <SelectTeam myTeams={myTeams} />}
      {activeTab === 'opponent' && <SelectOpponent />}
      {/* </ScrollView> */}


      <CreateTeam
        teamInfo={teamInfo}
        setTeamInfo={setTeamInfo}
        shareLinkModal={shareLinkModal}
        setShareLinkModal={setShareLinkModal}
        onContinuePressed={onContinuePressed} />
    </View>
  )
}

export default MyTeams

const styles = StyleSheet.create({
  parent: {
    minHeight: "100%",
    backgroundColor: "#101112",
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  tabText: {
    color: "white",
    fontSize: 20,
  },
  activeTab: {
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "blue",
  },
  inactiveTab: {
    paddingHorizontal: 20,
  },
})
