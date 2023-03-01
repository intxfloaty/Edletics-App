import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TeamMatches = () => {
  return (
    <View style={styles.parent}>
      <Text>TeamMatches</Text>
    </View>
  )
}

export default TeamMatches

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 20
  },
})