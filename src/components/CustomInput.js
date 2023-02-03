import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({ placeholder, value, setValue, onPressIn, showSoftInputOnFocus }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onPressIn={onPressIn}
        showSoftInputOnFocus={showSoftInputOnFocus} />
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
  }
})