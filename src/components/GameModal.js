import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { addAndFetchPlayers } from '../firebase/firebase'
import { useSelector } from 'react-redux';


const GameModal = ({ visible, hideModal }) => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { fetchPlayersOfTeam } = addAndFetchPlayers();
  const [playerList, setPlayerList] = useState([])


  fetchPlayersOfTeam(currentTeam, setPlayerList);

  const containerStyle = { backgroundColor: 'black', padding: 20, height: "100%" };

  return (
    <View style={styles.parent}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Icon
            name="arrow-back"
            size={40}
            style={styles.arrowBackIcon}
            color={"white"}
            onPress={hideModal}
          />
          {playerList?.map((player, index) => {
            return (
              <List.Section key={index} >
                <List.Accordion
                  title={player?.fullName}
                  left={props => <List.Icon {...props} />}
                  >
                  <List.Item title="Going" titleStyle={styles.listItem}  />
                  <List.Item title="Not Going" titleStyle={styles.listItem} style={{color:"blue"}}/>
                </List.Accordion>
              </List.Section>
            )
          })}

        </Modal>
      </Portal>
    </View>
  )
}

export default GameModal

const styles = StyleSheet.create({
  parent:{
    
  },
  arrowBackIcon: {
    position: "absolute",
    top: 0,
    left: 5
  },
  listItem:{
    color:"white"
  }

})