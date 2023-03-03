import { StyleSheet, Text, View, Modal, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from 'react-redux';
import { selectMyCurrentTeam } from '../redux/actions/actions';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectTeam = ({ myTeams }) => {
  const navigation = useNavigation()
  const currentTeam = useSelector(state => state.currentTeam)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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

  return (
    <View style={styles.parent}>
      {myTeams?.map((myTeam, index) => {
        return (
          <Pressable style={styles.teamContainer}
            onPress={() => {
              console.log(myTeam, "my")
              dispatch(selectMyCurrentTeam(myTeam))
              if (currentTeam.teamId) {
                navigation.navigate("TeamScreen")
              }
            }} key={index}>
            <Image source={{
              uri: selectedItem === myTeam ? image : null,
            }} style={styles.profileImage} />
            <Text style={styles.teamName}>{myTeam?.teamName}</Text>
            <Icon
              name="camera-outline"
              size={30}
              style={styles.camera}
              color={"black"}
              onPress={() => {
                setSelectedItem(myTeam)
                choseFromLibrary();
              }}
            />
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
  teamName: {
    fontSize: 26,
    color: "black",
    position: "absolute",
    top: 0
  },
  camera: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5
  },
})