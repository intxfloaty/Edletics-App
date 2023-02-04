import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState("")
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [location, setLocation] = useState("")
  const [genderPressed, setGenderPressed] = useState({
    male: false,
    female: false,
    other: false,
  })
  const [fieldErrors, setFieldErrors] = useState({})
  console.log(fieldErrors, "error")



  // function to select profile image
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

  // function to select date of birth
  const showDatepicker = () => {
    // console.log(date.toLocaleString().replace(", 4:45:30 AM", " "), "date")
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate.toLocaleString().replace(", 4:45:30 AM", " ");
      setDate(currentDate);
    };
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: new Date(1598051730000),
        onChange,
        mode: currentMode,
        is24Hour: true,
      });
    };

    showMode('date');
  };

  // functions to select genders
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

  // function to validate form fields
  const validate = () => {
    let errors = {}
    if (!fullName) {
      errors.fullName = "Please enter your full name"
    }
    if (!date) {
      errors.date = "Please select your date of birth"
    }
    if (!gender) {
      errors.gender = "Please select your gender"
    }
    if (!emailAddress) {
      errors.emailAddress = "Please enter your email address"
    }
    if (!location) {
      errors.location = "Please enter your location"
    }
    return errors
  }

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate())
    }
  }, [fullName, date, gender, emailAddress, location])

  const onSubmitPressed = () => {
    setFieldErrors(validate())
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.parent}>
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
          {fieldErrors.fullName !== "" && <Text style={styles.errorInfo}>{fieldErrors.fullName}</Text>}

          <Text style={styles.inputText}>DATE OF BIRTH</Text>
          <CustomInput
            onPressIn={showDatepicker}
            showSoftInputOnFocus={false}
            value={date}
          />
          {fieldErrors.date !== "" && <Text style={styles.errorInfo}>{fieldErrors.date}</Text>}

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
          {fieldErrors.gender !== "" && <Text style={styles.errorInfo}>{fieldErrors.gender}</Text>}


          <Text style={styles.inputText}>EMAIL ADDRESS</Text>
          <CustomInput
            keyboardType="email-address"
            value={emailAddress}
            inputName="emailAddress"
            setValue={(text) => setEmailAddress(text)}
          />
          {fieldErrors.emailAddress !== "" && <Text style={styles.errorInfo}>{fieldErrors.emailAddress}</Text>}

          <Text style={styles.inputText}>LOCATION</Text>
          <CustomInput
            value={location}
            inputName="location"
            setValue={(text) => setLocation(text)}
          />
          {fieldErrors.location !== "" && <Text style={styles.errorInfo}>{fieldErrors.location}</Text>}

          <CustomButton
            text="SUBMIT"
            onPress={onSubmitPressed}
          />
        </View>
      </View>
    </ScrollView >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#101112",
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
    marginBottom: 5
  },
  errorInfo: {
    color: "red"
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