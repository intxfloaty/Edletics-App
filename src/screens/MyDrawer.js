import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTeams from './MyTeams';
import TeamActivity from './TeamActivity';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

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
      }}>
      <Drawer.Screen name='HomeScreen' component={HomeScreen} />
      <Drawer.Screen name="My Teams" component={MyTeams} />
      <Drawer.Screen name="Team Activity" component={TeamActivity} />
    </Drawer.Navigator>
  )
}

export default MyDrawer
