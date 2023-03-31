import { StyleSheet, Text, View, Modal, Image, TouchableHighlight, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from 'react-redux';
import { selectMyCurrentTeam } from '../redux/actions/actions';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';


const SelectTeam = ({ myTeams }) => {
  const navigation = useNavigation()
  const currentTeam = useSelector(state => state.currentTeam)
  const dispatch = useDispatch()

 
  return (
    <View style={styles.parent}>
      {myTeams?.map((myTeam, index) => {
        return (
          <TouchableHighlight
            underlayColor="#4a4a4a"
            style={styles.teamContainer}
            onPress={() => {
              dispatch(selectMyCurrentTeam(myTeam))
              if (currentTeam.teamId) {
                navigation.navigate("TeamScreen")
              }
            }} key={index}>
            <>
              <Avatar.Text size={40} label="MT" style={styles.avatar} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{myTeam?.teamName}</Text>
                <Text style={styles.subText}>Rating</Text>
                <Text style={styles.subText}>5v5</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} style={styles.arrowIcon} color="white" />
            </>
          </TouchableHighlight>
        )
      })
      }
    </View>
  )
}

export default SelectTeam

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    height: '100%',
    padding: 10,
    backgroundColor: '#101112',
  },
  teamContainer: {
    marginTop: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    minHeight: "10%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    left: 10,
  },
  textContainer: {
    display: "flex",
    position: "absolute",
    left: 70
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  subText: {
    fontSize: 16,
    color: "gray"
  },
  arrowIcon : {
    position: "absolute",
    right: 10,
  }
})