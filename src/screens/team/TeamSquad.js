import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { addAndFetchPlayers } from '../../firebase/firebase';


const TeamSquad = () => {
  const  currentTeam  = useSelector(state => state.currentTeam)
  const {fetchPlayersOfTeam} = addAndFetchPlayers()
  const [playerList, setPlayerList] = useState([])

  // to fetch players
  fetchPlayersOfTeam(currentTeam, setPlayerList);

  return (
    <View style={styles.parent}>
      {playerList?.map((player, index) => {
        return (
          <Text style={styles.text} key={index}>{player.emailAddress}--{player.fullName}</Text>
        )
      })}
    </View>
  )
}

export default TeamSquad

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#101112",
  },
  text: {
    color: "white",
    marginVertical: 10,
  },
})