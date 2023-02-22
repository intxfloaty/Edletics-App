import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native"
import { userAuthState, usePlayerDetails } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';

const MyTeams = () => {
  const [shareLinkModal, setShareLinkModal] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamLocation: "",
  })
  const [myTeams, setMyTeams] = useState([])

  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)


  const navigation = useNavigation();

  const onContinuePressed = () => {
    firestore()
      .collection('teams')
      .doc(`${teamInfo.teamName}`)
      .set({
        teamName: teamInfo.teamName,
        teamLocation: teamInfo.teamLocation,
        teamAdminName: playerDetails?.fullName,
        teamAdminId: playerDetails?.phoneNumber,
      })
      .then(() => {
        console.log('team added!');
        setTeamInfo({
          teamName: "",
          teamLocation: "",
        })
      });
    setShareLinkModal(true)
  }

  useEffect(() => {
  }, [])

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
