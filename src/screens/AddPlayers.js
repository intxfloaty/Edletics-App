import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userAuthState } from '../firebase/firebase'
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


const AddPlayers = () => {
  const { user } = userAuthState()
  const [admin, setAdmin] = useState("")
  const [player, setPlayer] = useState("+91")

  useEffect(() => {
    const fetchAdminDetails = async () => {
      if (user) {
        try {
          const adminRef = firestore().collection("players").doc(`${user.phoneNumber}`)
          const adminDoc = await adminRef.get()

          if (adminDoc.exists) {
            const adminData = adminDoc.data();
            if (adminData && adminData.fullName) {
              setAdmin(adminData.fullName);
              console.log("Admin fullName:", adminData.fullName);
            } else {
              console.log("Admin fullName not found in document:", adminData);
            }
          } else {
            console.log("Admin document not found:", adminDoc);
          }
        } catch (error) {
          console.log("Error fetching admin details:", error);
        }
      };
    }

    fetchAdminDetails();
  }, [user]);

  const onAddPlayerPressed = () => {
    firestore()
      .collection("teams")
      .doc("White Devils Fc")
      .collection("players")
      .add({
        playerId: player
      })
      .then((docRef) => {
        console.log("Player added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding player: ", error);
      });
  }

  return (
    <ScrollView>
      <View style={styles.parent}>
        <Text style={styles.text}>Admin: {admin}</Text>
        <CustomInput
          value={player}
          setValue={(text) => setPlayer(text)} />
        <CustomButton text="Add Player" onPress={onAddPlayerPressed} />
      </View>
    </ScrollView>
  )
}

export default AddPlayers

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#101112",
  },
  text: {
    color: "white",
    marginVertical: 10,
  },
})