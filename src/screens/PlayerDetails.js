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

  useEffect(() => {
    if (playerDetails?.phoneNumber) {
      navigation.navigate("Home")
    } else {
      setLoading(false)
    }
  }, [playerDetails?.phoneNumber])

  return (
    <>
      {loading ? <LoadingScreen /> : !(playerDetails?.phoneNumber) ? <PlayerDetailsForm /> : <LoadingScreen />}
    </>
  );
};


export default PlayerDetails