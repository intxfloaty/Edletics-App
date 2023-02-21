import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import PlayerDetailsForm from '../components/PlayerDetailsForm'
import { userAuthState, usePlayerDetails } from '../firebase/firebase'
import { useNavigation } from "@react-navigation/native"


const PlayerDetails = () => {
  const [loading, setLoading] = useState(true);
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const navigation = useNavigation()

  useEffect(() => {
    if (Object.keys(playerDetails).length !== 0) {
      setLoading(false);
      navigation.navigate("Home")
    }
  }, [playerDetails]);

  return (
    <>
      {loading ? <LoadingScreen /> : null}
      <PlayerDetailsForm />
    </>
  );
};


export default PlayerDetails
