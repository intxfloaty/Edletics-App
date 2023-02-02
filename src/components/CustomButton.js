import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ text, onPress, isDisabled }) => {
  return (
    <Pressable
      onPress={onPress}
       style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(0, 0, 0)' : '#0A99FF',
        },
        styles.buttonContainer,
      ]}
      disabled={isDisabled}>
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
    // backgroundColor: "#0A99FF",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
})