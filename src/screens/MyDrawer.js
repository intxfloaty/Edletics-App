import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTeams from './MyTeams';
import HomeScreen from './HomeScreen';
import Tournament from './Tournament';
import Leaderboard from './Leaderboard';
import PlayerDetails from './PlayerDetails';
import Inbox from './Inbox';
import SignOut from './SignOut';
import EdleticsAcademy from './EdleticsAcademy';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { userAuthState, usePlayerDetails } from '../firebase/firebase';
import Icon from 'react-native-vector-icons/Ionicons';



const MyDrawer = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)


  const Drawer = createDrawerNavigator();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
         <View style={styles.drawerHeader}>
          <Text style={styles.name}>{playerDetails?.fullName}</Text>
          <Text style={styles.phoneNumber}>{playerDetails?.phoneNumber}</Text>
        </View>
        <View style={styles.divider} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: '#101112' },
        headerTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#101112',
        },
        drawerLabelStyle: { color: "white" , fontSize: 16}
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="home-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Home'
        component={HomeScreen} />

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="person-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Profile'
        component={PlayerDetails} />

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="chatbox-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Inbox'
        component={Inbox} />

      <Drawer.Screen options={{
        headerShown: false,
        drawerIcon: () => <Icon
          name="people-outline"
          size={25}
          style={styles.chatIcon}
          color={"white"}
        />
      }}
        name="My Teams"
        component={MyTeams} />

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="trophy-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Tournaments'
        component={Tournament} />

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="podium-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Leaderboard'
        component={Leaderboard} />

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="football-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Edletics Academy'
        component={EdleticsAcademy} />

      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon
            name="log-out-outline"
            size={25}
            style={styles.chatIcon}
            color={"white"} />
        }}
        name='Log Out'
        component={SignOut} />

    </Drawer.Navigator>
  )
}

export default MyDrawer

const styles = StyleSheet.create({
   drawerHeader: {
    height: 100,
    backgroundColor: "#101112",
  },
  name: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20
  },
  phoneNumber: {
    color: "white",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10
  },
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20
  }
})
