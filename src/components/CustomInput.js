import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = () => {
  return (
    <View style = {styles.container}>
      <TextInput>

      </TextInput>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#101112",
        width: "100%",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10, 
    }
})