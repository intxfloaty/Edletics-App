import { StyleSheet, Text, View, Modal, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'

const CreateTeam = ({ teamInfo, setTeamInfo, shareLinkModal, setShareLinkModal, onContinuePressed }) => {
  const [createTeamModal, setCreateTeamModal] = useState(false)
  const [modalOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (createTeamModal) {
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [createTeamModal]);


  return (
    <View style={styles.parent}>
      <View style={styles.createTeamContainer}>
        <CustomButton text="Create Team" type="SECONDARY" onPress={() => setCreateTeamModal(true)} />
      </View>

      {/* Create team modal */}
      <View>
        <Modal
          animationType="none"
          transparent={true}
          visible={createTeamModal}
          onRequestClose={() => {
            setCreateTeamModal(!createTeamModal);
          }}>
          <TouchableWithoutFeedback onPress={() => setCreateTeamModal(false)}>
            <View style={styles.centeredView}>
              <Animated.View style={[styles.modalView, { opacity: modalOpacity }]}>
                <Text style={styles.modalTitle}>Create New Team</Text>
                <Text style={styles.teamName}>Name:</Text>
                <CustomInput
                  value={teamInfo.teamName}
                  setValue={(text) => setTeamInfo({ ...teamInfo, teamName: text })}
                />
                <Text style={styles.teamName}>Format:</Text>
                <CustomInput
                  value={teamInfo.teamFormat}
                  setValue={(text) => setTeamInfo({ ...teamInfo, teamFormat: text })}
                />
                <Text style={styles.teamName}>Location:</Text>
                <CustomInput
                  value={teamInfo.teamLocation}
                  setValue={(text) => setTeamInfo({ ...teamInfo, teamLocation: text })}
                />
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
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


      </View>
      {/* end of create team modal */}
    </View>
  );
};

export default CreateTeam

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#101112",
    padding: 10,
  },
  createTeamContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalView: {
    width: "90%",
    minHeight: "50%",
    backgroundColor: "#202224",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  teamName: {
    fontSize: 18,
    color: "white",
    alignSelf: "flex-start",
  },
});
