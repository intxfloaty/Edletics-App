import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    padding: 15,
    marginVertical: 25,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#0A99FF",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
})