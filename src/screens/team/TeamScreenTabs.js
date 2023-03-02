import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TeamBulletin from './TeamBulletin';
import TeamMatches from './TeamMatches';
import TeamSquad from './TeamSquad';
import TeamStats from './TeamStats';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator()

const TeamScreenTabs = () => {
  const navigation = useNavigation()

  const onSettingsPressed = () => {
    navigation.navigate("TeamSettings")
  }

  return (
    <>
      <View style={styles.header}>
        <Icon
          name="settings-outline"
          size={20}
          style={styles.settings}
          color={"white"}
          onPress={onSettingsPressed}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, color: "white" },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "#202224" },
          tabBarScrollEnabled: true,
        }}
        >
        <Tab.Screen
          name='Bulletin'
          component={TeamBulletin}
        // options={{
        //   tabBarLabel: ({ focused }) => (
        //     <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelActive]}>
        //       ANNOUNCEMENTS
        //     </Text>
        //   ),
        // }}
        />
        <Tab.Screen name='Matches' component={TeamMatches} />
        <Tab.Screen name='Squad' component={TeamSquad} />
        <Tab.Screen name='Stats' component={TeamStats} />
      </Tab.Navigator>
    </>
  )
}

export default TeamScreenTabs

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#202224",
    minHeight: 50,
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10
  },
})