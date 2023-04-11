import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/edlogo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import OTPScreen from './OTPScreen';

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  // if null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  // handle the button press
  const signInWithPhoneNumber = async (phoneNumber) => {
    const errors = validate(phoneNumber);
    if (errors.length === 0) {
      const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
      setConfirm(confirmation);
    } else {
      setPhoneNumberError(errors);
      setIsDisabled(true);
    }
  };

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const validate = (phoneNumber) => {
    let error = '';
    if (phoneNumber.length !== 10) {
      error = 'Please enter a valid 10 digit mobile number';
    }
    return error;
  };

  useEffect(() => {
    const errors = validate(phoneNumber);
    if (errors.length === 0) {
      setIsDisabled(false);
      setPhoneNumberError('');
    }
  }, [phoneNumber]);

  if (!confirm) {
    return (
      <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
        <View style={styles.child}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <CustomInput
              placeholder="Enter mobile number"
              value={phoneNumber}
              setValue={setPhoneNumber}
              type="SIGNIN"
            />
          </View>
          {phoneNumberError !== '' && <Text style={styles.errorText}>{phoneNumberError}</Text>}
          <CustomButton
            text="Send OTP"
            onPress={() => {
              signInWithPhoneNumber(phoneNumber);
            }}
            isDisabled={isDisabled}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <>
      <OTPScreen setCode={setCode} confirmCode={() => confirmCode()} />
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    backgroundColor: '#101112',
  },
  child: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    height: 100,
    marginBottom: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  countryCode: {
    height: 50,
    marginTop: 5,
    fontSize: 16,
    color: 'white',
    textAlignVertical: 'center',
    marginRight: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#202224',
  },
});
