import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({ placeholder, value, setValue, onPressIn, showSoftInputOnFocus, type, multiline, numberOfLines }) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onPressIn={onPressIn}
        showSoftInputOnFocus={showSoftInputOnFocus}
        multiline={multiline}
        numberOfLines={numberOfLines} />
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
    marginVertical: 5,
  },
  input: {
    color: "white",
    backgroundColor: "#202224",
  },
  container_activity: {

  },
})