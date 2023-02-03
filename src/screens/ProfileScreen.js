import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const ProfileScreen = () => {
  const [fullName, setFullName]= useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [location, setLocation] = useState("")
  return (
    <View>
      <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.profileImageContainer}></Pressable>
        <View style={styles.profileInfoContainer} >
          <Text style={styles.inputText}>FULL NAME</Text>
          <CustomInput
            value={fullName}
            setValue={(text) => setFullName(text)}
          />
          <Text style={styles.inputText}>DATE OF BIRTH</Text>
          <CustomInput
            // onPressIn={showDatepicker}
            showSoftInputOnFocus={false}
            // value={date.toLocaleString().replace("04:45:30 ", "")}
          />
          <Text style={styles.inputText}>EMAIL ADDRESS</Text>
          <CustomInput
            keyboardType="email-address"
            value={emailAddress}
            inputName="emailAddress"
            setValue={(text) => setEmailAddress(text)}
          />
          <Text style={styles.inputText}>LOCATION</Text>
          <CustomInput
            value={location}
            inputName="location"
            setValue={(text) => setLocation(text)}
          />
          <CustomButton
            text="SUBMIT"
            // onPress={onSubmitPressed} 
            />
        </View>
      </ScrollView >

    </View >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImageContainer: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
  },
  profileInfoContainer: {
    width: "100%"
  },
  inputText: {
    marginTop: 10,
    color: "white"
  },

})