import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTeams from './MyTeams';
import HomeScreen from './HomeScreen';
import CreateGame from './CreateGame';
import Tournament from './Tournament';
import Leaderboard from './Leaderboard';
import Stats from './Stats';
import PlayerDetails from './PlayerDetails';
import Inbox from './Inbox';
import SignOut from './SignOut';
import EdleticsAcademy from './EdleticsAcademy';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <View>
        <Text style={{ color: "white", fontSize: 28, marginLeft: 20 }}>Pravesh</Text>
        <Text style={{ color: "white", fontSize: 20, marginLeft: 20 }}>+919876543210</Text>
      </View> */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: { backgroundColor: '#101112' },
        headerTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#202224',
        },
        drawerLabelStyle: { color: "white" }
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Profile' component={PlayerDetails} />
      <Drawer.Screen name='Inbox' component={Inbox} />
      <Drawer.Screen options={{
        headerShown: false
      }} name="My Teams" component={MyTeams} />
      <Drawer.Screen name='Create a game' component={CreateGame} />
      <Drawer.Screen name='Tournaments' component={Tournament} />
      <Drawer.Screen name='Leaderboard' component={Leaderboard} />
      <Drawer.Screen name='Stats' component={Stats} />
      <Drawer.Screen name='Edletics Academy' component={EdleticsAcademy} />
      <Drawer.Screen name='Sign Out' component={SignOut} />
    </Drawer.Navigator>
  )
}

export default MyDrawer
