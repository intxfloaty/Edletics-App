import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Details from './tournament/Details';
import Matches from './tournament/Matches';
import Standings from './tournament/Standings';
import Stats from './tournament/Stats';
import TopTeams from './tournament/TopTeams';


const Tab = createMaterialTopTabNavigator()

const TournamentScreen = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: "white" },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "#202224" },
        tabBarScrollEnabled: true
      }}>
      <Tab.Screen name='Details' component={Details} />
      <Tab.Screen name='Matches' component={Matches} />
      <Tab.Screen name='Standings' component={Standings} />
      <Tab.Screen name='Stats' component={Stats} />
      <Tab.Screen name='TopTeams' component={TopTeams} />
    </Tab.Navigator>
  )
}

export default TournamentScreen

const styles = StyleSheet.create({

})