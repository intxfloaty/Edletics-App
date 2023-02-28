import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TeamAnnouncement from './TeamAnnouncement';
import TeamChat from './TeamChat';
import TeamMatches from './TeamMatches';
import TeamSquad from './TeamSquad';
import TeamStats from './TeamStats';


const Tab = createMaterialTopTabNavigator()

const TeamScreenTabs = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: "white" },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "#202224" },
        tabBarScrollEnabled: true
      }}>
      <Tab.Screen name='Announcements' component={TeamAnnouncement} />
      {/* <Tab.Screen name='Chat' component={TeamChat} /> */}
      <Tab.Screen name='Matches' component={TeamMatches} />
      <Tab.Screen name='Squad' component={TeamSquad} />
      <Tab.Screen name='Stats' component={TeamStats} />
    </Tab.Navigator>
  )
}

export default TeamScreenTabs

const styles = StyleSheet.create({

})