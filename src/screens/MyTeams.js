import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userAuthState, usePlayerDetails, createAndFetchTeam } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';

const MyTeams = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  // const {teamId, myTeams} = fetchTeamDetails();
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
    <CreateTeam
      teamInfo={teamInfo}
      setTeamInfo={setTeamInfo}
      myTeams={myTeams}
      shareLinkModal={shareLinkModal}
      setShareLinkModal={setShareLinkModal}
      onContinuePressed={onContinuePressed} />
  )
}

export default MyTeams
