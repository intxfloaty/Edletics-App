import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MainMenuOptions from '../components/MainMenuOptions'
import Icon from 'react-native-vector-icons/Ionicons';
import CustomProfileOptions from '../components/CustomProfileOptions';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native"


const ProfileScreen = () => {
  const [personOutline, setPersonOutline] = useState(false)

  const navigation = useNavigation();

  const onMyTeamsPressed = () => {
    console.log("my teams");
    navigation.navigate('MyTeams')
  }

  return (
    <View style={styles.parent} showsVerticalScrollIndicator={false}>
      <View style={styles.personalInfoContainer}>
        <View style={styles.profileImage}></View>
        <View style={styles.personalInfo}>
          <Text style={styles.personalInfoName}>Pravesh <Icon name="chevron-forward-outline" size={22} color="white" /></Text>
          <Text style={styles.personalInfoText}>praveshjha5@gmail.com</Text>
          <Text style={styles.personalInfoText}>+91-8700502434</Text>
        </View>
      </View>

      <CustomProfileOptions
        mainText="My Teams"
        subText="Create your team/ Join a team"
        iconName="people-outline"
        onPress={onMyTeamsPressed}
      />

      <CustomProfileOptions
        mainText="Leaderboard"
        subText="Check your rankings"
        iconName="podium-outline" />

      <CustomProfileOptions
        mainText="Stats"
        subText="Check individual and team stats"
        iconName="stats-chart-outline" />

      <CustomProfileOptions
        mainText="Tournaments"
        subText="Join a tournament and win exciting prizes"
        iconName="trophy-outline" />

      <CustomProfileOptions
        mainText="Academy"
        subText="Join Edletics Football Academy"
        iconName="flash-outline" />

      <CustomProfileOptions
        mainText="Log Out"
        subText="Check app settings"
        iconName="settings-outline"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log("user logged out"))
        }}
      />
    <MainMenuOptions
    personOutline ={personOutline}
    setPersonOutline={setPersonOutline} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
  },
  personalInfoContainer: {
    height: 120,
    width: "100%",
    backgroundColor: "#202224",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
  },
  profileImage: {
    height: 70,
    width: 70,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1
  },
  personalInfo: {
    marginLeft: 15
  },
  personalInfoName: {
    color: "white",
    fontSize: 24
  },
  personalInfoText: {
    color: "white",
    fontSize: 14
  },
  root: {
    height: "100%",
    alignItems: 'flex-end',
    padding: 50,
    marginTop: 10,
  },
  team: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
})