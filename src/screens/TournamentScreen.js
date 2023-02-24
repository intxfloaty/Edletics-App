import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


const TournamentScreen = () => {
  const [activeTab, setActiveTab] = useState('DETAILS')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <View style={styles.header}>
      <View style={styles.topContainer}>
        <Icon
          name="arrow-back"
          size={25}
          color={"white"}
        />
        <View style={styles.nameYear}>
          <Text style={styles.tournamentName}>Premier League</Text>
          <Text style={styles.year}>22/23</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <ScrollView horizontal={true}>
          <Pressable onPress={() => handleTabClick('DETAILS')}>
            <Text style={[styles.optionName, activeTab === 'DETAILS' && styles.activeOptionName]}>DETAILS</Text>
          </Pressable>
          <Pressable onPress={() => handleTabClick('FIXTURES')}>
            <Text style={[styles.optionName, activeTab === 'FIXTURES' && styles.activeOptionName]}>FIXTURES</Text>
          </Pressable>
          <Pressable onPress={() => handleTabClick('STANDINGS')}>
            <Text style={[styles.optionName, activeTab === 'STANDINGS' && styles.activeOptionName]}>STANDINGS</Text>
          </Pressable>
          <Pressable onPress={() => handleTabClick('STATS')}>
            <Text style={[styles.optionName, activeTab === 'STATS' && styles.activeOptionName]}>STATS</Text>
          </Pressable>
          <Pressable onPress={() => handleTabClick('TOP PLAYER')}>
            <Text style={[styles.optionName, activeTab === 'TOP PLAYER' && styles.activeOptionName]}>TOP PLAYER</Text>
          </Pressable>
          <Pressable onPress={() => handleTabClick('TOP TEAMS')}>
            <Text style={[styles.optionName, activeTab === 'TOP TEAMS' && styles.activeOptionName]}>TOP TEAMS</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* <View style={styles.content}>
        {activeTab === 'DETAILS'}
        {activeTab === 'FIXTURES'}
        {activeTab === 'STANDINGS' }
        {activeTab === 'STATS' }
        {activeTab === 'TOP PLAYER' }
        {activeTab === 'TOP TEAMS'}
      </View> */}
    </View>
  )
}

export default TournamentScreen

const styles = StyleSheet.create({
  header: {
    width: "100%",
    minHeight: "15%",
    backgroundColor: "#202224",
    padding: 10,

  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
  },
  nameYear: {
    marginLeft: 25
  },
  tournamentName: {
    color: "white",
  },
  year: {
    color: "white",
    fontSize: 24
  },
  bottomContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row"
  },
  optionName: {
    color: "white",
    fontSize: 18,
    marginRight: 30
  },
})