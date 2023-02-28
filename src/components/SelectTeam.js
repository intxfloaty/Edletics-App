import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from 'react-redux';
import { selectMyCurrentTeam } from '../redux/actions/actions';
import ImagePicker from 'react-native-image-crop-picker';

const SelectTeam = ({ myTeams }) => {
  const navigation = useNavigation()
  const currentTeam = useSelector(state => state.currentTeam)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);

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

  const onSettingsPressed = () => {

  }

  return (
    <View style={styles.parent}>
      {myTeams?.map((myTeam, index) => {
        return (
          <Pressable style={styles.teamContainer}
            onPress={() => {
              dispatch(selectMyCurrentTeam(myTeam))
              // choseFromLibrary()
              if (currentTeam.teamId) {
                navigation.navigate("TeamScreen")
              }
            }} key={index}>
            <Image source={{
              uri: image,
            }} style={styles.profileImage} />
            {/* <Text style={styles.teamInfo}>{myTeam.teamName}</Text> */}
            {/* <Text style={styles.teamInfo}>{myTeam.teamAdminName}</Text> */}
          </Pressable>
        )
      })
      }
    </View>
  )
}

export default SelectTeam

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  teamContainer: {
    backgroundColor: '#0A99FF',
    maxHeight: 600,
    maxWidth: 350,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    marginHorizontal: 20,
  },
  profileImage: {
    height: 600,
    width: 350,
    borderWidth: 1,
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5
  },
})