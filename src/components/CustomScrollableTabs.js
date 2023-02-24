import { Pressable, StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const CustomScrollableTabs = () => {
  const [activeTab, setActiveTab] = useState('DETAILS')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }


  return (
    <>
      <View style={styles.header}>
        <View style={styles.topContainer}>
          <Icon
            name="arrow-back"
            size={25}
            color={"white"}
          />
          <View style={styles.nameYear}>
            <Text style={styles.tournamentName}>Damians League</Text>
            <Text style={styles.year}>22/23</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableHighlight
              underlayColor='#0A99FF'
              onPress={() => handleTabClick('DETAILS')}
              style={[styles.tabButton, activeTab === 'DETAILS' && styles.tabButtonActive,]}
            >
              <Text style={[styles.optionName, activeTab === 'DETAILS' && styles.activeOptionName]}>DETAILS</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#0A99FF'
              onPress={() => handleTabClick('FIXTURES')}
              style={[styles.tabButton, activeTab === 'FIXTURES' && styles.tabButtonActive,]}
            >
              <Text style={[styles.optionName, activeTab === 'FIXTURES' && styles.activeOptionName]}>FIXTURES</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#0A99FF'
              onPress={() => handleTabClick('STANDINGS')}
              style={[styles.tabButton, activeTab === 'STANDINGS' && styles.tabButtonActive,]}
            >
              <Text style={[styles.optionName, activeTab === 'STANDINGS' && styles.activeOptionName]}>STANDINGS</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#0A99FF'
              onPress={() => handleTabClick('STATS')}
              style={[styles.tabButton, activeTab === 'STATS' && styles.tabButtonActive,]}
            >
              <Text style={[styles.optionName, activeTab === 'STATS' && styles.activeOptionName]}>STATS</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#0A99FF'
              onPress={() => handleTabClick('TOP PLAYER')}
              style={[styles.tabButton, activeTab === 'TOP PLAYER' && styles.tabButtonActive,]}
            >
              <Text style={[styles.optionName, activeTab === 'TOP PLAYER' && styles.activeOptionName]}>TOP PLAYER</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#0A99FF'
              onPress={() => handleTabClick('TOP TEAMS')}
              style={[styles.tabButton, activeTab === 'TOP TEAMS' && styles.tabButtonActive,]}
            >
              <Text style={[styles.optionName, activeTab === 'TOP TEAMS' && styles.activeOptionName, { marginRight: 5 }]}>TOP TEAMS</Text>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </View>


      <View style={styles.content}>
        {activeTab === 'DETAILS' && <Text style={styles.year}>DETAILS</Text>}
        {activeTab === 'FIXTURES' && <Text style={styles.year}>FIXTURES</Text>}
        {activeTab === 'STANDINGS' && <Text style={styles.year}>STANDINGS</Text>}
        {activeTab === 'STATS' && <Text style={styles.year}>STATS</Text>}
        {activeTab === 'TOP PLAYER' && <Text style={styles.year}>TOP PLAYER</Text>}
        {activeTab === 'TOP TEAMS' && <Text style={styles.year}>TOP TEAMS</Text>}
      </View>
    </>
  )
}

export default CustomScrollableTabs

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
    fontSize: 22
  },
  bottomContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row"
  },
  optionName: {
    color: "gray",
    fontSize: 16,
    marginRight: 30,
  },
  activeOptionName: {
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 5,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tabButtonActive: {
  },
  content: {
    backgroundColor: "#101112",
    width: "100%",
    height: "100%"
  },
})