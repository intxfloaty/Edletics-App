import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { usePlayerDetails, userAuthState, sendAndFetchGameRequest, createAndFetchSquad } from '../../firebase/firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';


const TeamMatches = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { fetchSquad } = createAndFetchSquad()
  const squad = fetchSquad(currentTeam?.teamId)

  const pastMatches = [
    // Add past match data here
  ]

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {squad?.game && (
            <TouchableOpacity style={styles.matchCard}>
              <View style={styles.dateContainer}>
                <Text style={styles.matchDate}>{squad?.game?.date}</Text>
                <Text style={styles.matchTime}>{squad?.game?.time}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.teamContainer}>
                <Text style={styles.matchText}>{currentTeam?.teamName}</Text>
                <Text style={styles.matchDate}>vs</Text>
                <Text style={styles.matchText}>{squad?.game?.opponentName}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Matches</Text>
          {pastMatches.map((match, index) => (
            <TouchableOpacity key={index} style={styles.matchCard}>
              <Text style={styles.matchText}>{match.title}</Text>
              <Text style={styles.matchDate}>{match.date}</Text>
              <Icon name="chevron-forward" size={20} color="#B2B2B2" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default TeamMatches

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101112',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1D1F',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  dateContainer: {
    alignItems: 'flex-start',
  },
  matchDate: {
    fontSize: 14,
    color: '#B2B2B2',
  },
  matchTime: {
    fontSize: 12,
    color: '#B2B2B2',
  },
  divider: {
    width: 1,
    backgroundColor: '#B2B2B2',
    height: '80%',
    marginHorizontal: 15,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  matchText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
})
