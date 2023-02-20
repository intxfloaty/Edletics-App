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
  const [teamName, setTeamName] = useState("")
  const [teamCode, setTeamCode] = useState()
  const [joinTeamCode, setJoinTeamCode] = useState()
  const [myTeams, setMyTeams] = useState([])
  const [shareLinkModal, setShareLinkModal] = useState(false)

  console.log(myTeams, "my Team");

  const navigation = useNavigation();

  const onContinuePressed = () => {
    const min = 10000;
    const max = 99999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    setTeamCode(code)
    firestore()
      .collection('teams')
      .doc(`${teamName}`)
      .set({
        teamName: teamName,
        teamCode: code
      })
      .then(() => {
        console.log('team added!');
      });
    setShareLinkModal(true)
  }

  const onConfirmPressed = () => {
    if (teamCode == joinTeamCode) {
      firestore()
        .collection('teams').doc()
        .update({
          squad: {
            player_1: "P1"
          }
        })
        .then(() => {
          console.log('player added!');
        });
    }
  }

  useEffect(() => {
    firestore()
      .collection('My_teams_info')
      .onSnapshot(querySnapshot => {
        console.log('Total teams: ', querySnapshot.size);
        var newArr = []

        querySnapshot.forEach(documentSnapshot => {
          console.log('Team ID: ', documentSnapshot.id, documentSnapshot.data());
          newArr.push(documentSnapshot.data())
        });
        if (newArr.length > myTeams.length) {
          setMyTeams(myTeams.concat(newArr))
        }
      });
  }, [])


  return (
    <View style={styles.parent} >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.modalText}>MY TEAMS</Text>
        {myTeams?.map((myTeam, index) => {
          return (
            <Pressable style={styles.teamContainer} onPress={() => navigation.navigate('TeamActivity')} key={index}>
              <Image style={styles.teamLogo} />
              <Text style={styles.teamName}>{myTeam.teamName}</Text>
              <Text style={styles.teamName}><Icon name="flash-outline" size={18} color="white" />5000</Text>
            </Pressable>
          )
        })
        }
        <View style={styles.createTeamContainer} >
          <CustomButton text="CREATE TEAM" type='SECONDARY' onPress={() => setCreateTeamModal(true)} />
          <CustomButton text="JOIN TEAM" type='SECONDARY' onPress={() => setJoinTeamModal(true)} />
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
              <Text style={styles.teamName}>What is the name of your Team?</Text>
              <CustomInput
                value={teamName}
                setValue={(text) => setTeamName(text)} />
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
                    <Text style={styles.secondModalText}>TM-{teamCode}</Text>
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