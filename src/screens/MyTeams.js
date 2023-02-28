import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userAuthState, usePlayerDetails, createAndFetchTeam } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';
import SelectTeam from '../components/SelectTeam';
import CustomButton from '../components/CustomButton';

const MyTeams = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const [shareLinkModal, setShareLinkModal] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamLocation: "",
  })
  const { createTeam, fetchTeamDetails } = createAndFetchTeam(teamInfo, playerDetails)
  const [myTeams, setMyTeams] = useState([])


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
      <Text style={styles.text}>My Teams</Text>
      <ScrollView horizontal showsVerticalScrollIndicator={false}>
        <SelectTeam
          myTeams={myTeams} />
      </ScrollView>
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
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 16,
  },
})
