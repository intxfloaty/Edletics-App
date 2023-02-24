import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from 'react-redux';
import { selectMyCurrentTeam } from '../redux/actions/actions';

const SelectTeam = ({ myTeams }) => {
  const navigation = useNavigation()
  const currentTeam = useSelector(state => state.currentTeam)
  const dispatch = useDispatch()

  return (
    <View>
      {myTeams?.map((myTeam, index) => {
        return (
          <Pressable style={styles.teamContainer}
            onPress={() => {
              dispatch(selectMyCurrentTeam(myTeam))
              if (currentTeam.teamId) {
                navigation.navigate("AddPlayers")
              }
            }} key={index}>
            {/* <Image style={styles.teamLogo} /> */}
            <Text style={styles.teamInfo}>{myTeam.teamName}</Text>
            <Text style={styles.teamInfo}>{myTeam.teamId}</Text>
          </Pressable>
        )
      })
      }
    </View>
  )
}

export default SelectTeam

const styles = StyleSheet.create({
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