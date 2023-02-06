import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ text, onPress, type, isDisabled }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(0, 0, 0)' : '#0A99FF',
        },
        styles.buttonContainer,
        styles[`container_${type}`],
      ]}
      disabled={isDisabled}>
      <Text
        style={[
          styles.buttonText,
          styles[`text_${type}`]]}>{text}</Text>
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  container_activity: {
    width: "30%",
    marginVertical: 5,
    marginHorizontal: 2,
    padding: 5,
    fontSize: 16,
  },
  text_activity: {
    fontSize: 16,
    fontWeight: "500",
  },
  container_activityPressed: {
    width: "30%",
    marginVertical: 5,
    marginHorizontal: 2,
    padding: 5,
    fontSize: 16,
    backgroundColor: "red"
  }
})