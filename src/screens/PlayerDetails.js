import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import PlayerDetailsForm from '../components/PlayerDetailsForm'
import { userAuthState, usePlayerDetails } from '../firebase/firebase'
import { useNavigation } from "@react-navigation/native"


const PlayerDetails = () => {
  const [loading, setLoading] = useState(true);
  const { user } = userAuthState();
  const navigation = useNavigation()
  const { playerDetails, isPlayerDetail } = usePlayerDetails(user?.phoneNumber)

  // initially playerDetails is an empty object, as usePlayerDetails is an async func, it takes some time to fetch details
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (playerDetails?.phoneNumber) {
        navigation.navigate("MyDrawer")
      } else {
        setLoading(false)
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [playerDetails?.phoneNumber]);


  return (
    <>
      {loading ? <LoadingScreen /> : <PlayerDetailsForm />}
    </>
  );
};


export default PlayerDetails
