import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { userAuthState, usePlayerDetails, fetchTeamDetails } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';

const MyTeams = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const {teamId, myTeams} = fetchTeamDetails();
  const [shareLinkModal, setShareLinkModal] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamLocation: "",
  })

  // to create new teams 
  const onContinuePressed = () => {
    firestore()
      .collection('teams')
      .doc(`${teamInfo.teamName}_${playerDetails?.phoneNumber}`)
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

  // to fetch myTeams
  // useEffect(() => {
  //   firestore()
  //     .collection("teams")
  //     .get()
  //     .then((querySnapShot) => {
  //       querySnapShot.forEach((doc) => {
  //         console.log(doc.id, '=>', doc.data())
  //         setMyTeams(myTeams.concat(doc.data()))
  //         setTeamId(doc.id)
  //       })
  //     })
  // }, [])

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
