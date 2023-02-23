import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userAuthState, usePlayerDetails, createAndFetchTeam } from '../firebase/firebase';
import CreateTeam from '../components/CreateTeam';
import { useNavigation } from "@react-navigation/native"


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
  const [currentTeam, setCurrentTeam] = useState({})
  const navigation = useNavigation()


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

  const currentTeamInfo = (myTeam) => {
    setCurrentTeam(myTeam);
  }

  useEffect(() => {
    if (currentTeam && currentTeam.teamId) {
      navigation.navigate("AddPlayers", { currentTeam })
    }
  }, [currentTeam]);


  return (
    <View style={styles.parent}>
      <Text style={styles.modalText}>MY TEAMS</Text>
      {myTeams?.map((myTeam, index) => {
        return (
          <Pressable style={styles.teamContainer}
            onPress={() => {
              currentTeamInfo(myTeam);
            }} key={index}>
            {/* <Image style={styles.teamLogo} /> */}
            <Text style={styles.teamInfo}>{myTeam.teamName}</Text>
            <Text style={styles.teamInfo}>{myTeam.teamId}</Text>
          </Pressable>
        )
      })
      }

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
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  modalText: {
    margin: 20,
    color: "white",
    fontSize: 22,
    marginBottom: 15,
    textAlign: "center"
  },
  teamContainer: {
    backgroundColor: "#202224",
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  teamInfo: {
    fontSize: 18,
    color: "white"
  },
})
