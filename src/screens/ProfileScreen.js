import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("")
  const [date, setDate] = useState(new Date(1598051730000));
  const [gender, setGender] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [location, setLocation] = useState("")
  const [genderPressed, setGenderPressed] = useState({
    male: false,
    female: false,
    other: false,
  })


  const choseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path)
    });
  }


  const showDatepicker = () => {
    console.log(date.toLocaleString().replace(", 4:45:30 AM", " "), "date")
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };

    showMode('date');
  };

  const isMaleGenderPressed = () => {
    setGenderPressed({ ...genderPressed, male: true })
    setGender("Male")
  }

  const isFemaleGenderPressed = () => {
    setGenderPressed({ ...genderPressed, female: true })
    setGender("Female")
  }

  const isOtherGenderPressed = () => {
    setGenderPressed({ ...genderPressed, other: true })
    setGender("Other")
  }

  return (
    <ScrollView contentContainerStyle={styles.parent} showsVerticalScrollIndicator={false}>
      <Pressable
        style={styles.profileImageContainer}
        onPress={choseFromLibrary}>
        <Image source={{
          uri: image,
        }} style={styles.profileImage} />
      </Pressable>
      <View style={styles.profileInfoContainer} >
        <Text style={styles.inputText}>FULL NAME</Text>
        <CustomInput
          value={fullName}
          setValue={(text) => setFullName(text)}
        />
        <Text style={styles.inputText}>DATE OF BIRTH</Text>
        <CustomInput
          onPressIn={showDatepicker}
          showSoftInputOnFocus={false}
          value={date.toLocaleString().replace(", 4:45:30 AM", " ")}
        />
        <Text style={styles.inputText}>GENDER</Text>
        <View style={styles.genderButton}>
          <Pressable
            style={gender === "Male" ? styles.btnPress : styles.btnNormal}
            onPress={isMaleGenderPressed}>
            <Text style={styles.btnText}>Male</Text>
          </Pressable>

          <Pressable
            style={gender === "Female" ? styles.btnPress : styles.btnNormal}
            onPress={isFemaleGenderPressed}>
            <Text style={styles.btnText}>Female</Text>
          </Pressable>

          <Pressable
            style={gender === "Other" ? styles.btnPress : styles.btnNormal}
            onPress={isOtherGenderPressed}>
            <Text style={styles.btnText}>Other</Text>
          </Pressable>
        </View>

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
  profileImage: {
    width: 200,
    height: 200,
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
  genderButton: {
    flexDirection: "row",
  },
  btnNormal: {
    width: "30%",
    height: 50,
    backgroundColor: "#101112",
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  btnPress: {
    width: "30%",
    height: 50,
    backgroundColor: "#0A99FF",
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    color: "white",
    fontWeight: "500",
  }

})