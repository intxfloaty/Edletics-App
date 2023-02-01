import React, { useState } from 'react';
import { View,Image, Text, TextInput, StyleSheet } from 'react-native';
import Logo from "../../assets/images/edlogo.png"
import CustomButton from '../components/CustomButton';

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '','']);

  const handleChange = (index, text) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.label}>Enter OTP:</Text>
      <View style={styles.gridContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(index, text)}
          />
        ))}
      </View>
      <CustomButton text="Submit"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101112",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  logo: {
    width: "70%",
    height: 100,
    marginBottom: 50,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
    color: "white"
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    color:"white"
  },
});

export default OTPScreen;
