import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native"

const MyTeams = () => {
  const [createTeamModal, setCreateTeamModal] = useState(false)
  const [joinTeamModal, setJoinTeamModal] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    teamLocation: "",
  })
  const [joinTeamCode, setJoinTeamCode] = useState()
  const [myTeams, setMyTeams] = useState([])
  const [shareLinkModal, setShareLinkModal] = useState(false)

  console.log(myTeams, "my Team");

  const navigation = useNavigation();

  const onContinuePressed = () => {
    firestore()
      .collection('teams')
      .doc(`${teamInfo.teamName}`)
      .set(teamInfo)
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
    <View style={styles.parent} >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.modalText}>MY TEAMS</Text>
        {myTeams?.map((myTeam, index) => {
          return (
            <Pressable style={styles.teamContainer} onPress={() => navigation.navigate('AddPlayers')} key={index}>
              {/* <Image style={styles.teamLogo} /> */}
              <Text style={styles.teamName}>{myTeam.teamName}</Text>
            </Pressable>
          )
        })
        }
        <View style={styles.createTeamContainer} >
          <CustomButton text="CREATE TEAM" type='SECONDARY' onPress={() => setCreateTeamModal(true)} />
        </View>
      </ScrollView>

      {/* Create team modal */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={createTeamModal}
          onRequestClose={() => {
            setCreateTeamModal(!createTeamModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.teamName}>Team Name:</Text>
              <CustomInput
                value={teamInfo.teamName}
                setValue={(text) => setTeamInfo({ ...teamInfo, teamName: text })} />
              <Text style={styles.teamName}>Team Location:</Text>
              <CustomInput
                value={teamInfo.teamLocation}
                setValue={(text) => setTeamInfo({ ...teamInfo, teamLocation: text })} />
              <CustomButton text="Continue" onPress={onContinuePressed} />

              <Modal
                animationType="slide"
                transparent={true}
                visible={shareLinkModal}
                onRequestClose={() => {
                  setShareLinkModal(!shareLinkModal);
                  setCreateTeamModal(!createTeamModal)
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.secondModalText}>Get the team onboard</Text>
                    <Text style={styles.secondModalTextInfo}>It's easy to get everyone onboard, simply share the team invite link or team code with your team.</Text>
                    <CustomButton text="Share link" onPress={() => setSecondModalVisible(!secondModalVisible)} />
                    <View style={styles.Continue}>
                      <CustomButton text="Continue" onPress={() => {
                        setShareLinkModal(!shareLinkModal)
                        setCreateTeamModal(!createTeamModal)
                      }} />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </Modal>
      </View>
      {/* end of create team modal */}

      {/* join team modal */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={joinTeamModal}
          onRequestClose={() => {
            setJoinTeamModal(!joinTeamModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.teamName}>Please enter your team code</Text>
              <CustomInput
                value={joinTeamCode}
                setValue={(text) => setJoinTeamCode(text)} />
              <CustomButton text="Confirm" onPress={onConfirmPressed} />
            </View>
          </View>
        </Modal>
      </View>
      {/* end of join team modal */}
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
  teamLogo: {
    marginVertical: 10,
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: "white"
  },
  teamName: {
    fontSize: 18,
    color: "white"
  },
  createTeamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "100%",
    margin: 20,
    backgroundColor: "#101112",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  secondModalText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10
  },
  secondModalTextInfo: {
    color: "white",
    fontSize: 16,
    fontWeight: '400'
  },
})