import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const userAuthState = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return { user, initializing };
}

export const fetchPlayerDetails = async (playerId) => {
  const [playerDetails, setPlayerDetails] = useState({});

  useEffect(() => {
    const getPlayerDetails = async () => {
      try {
        const playerRef = firestore().collection("players").doc(`${playerId}`);
        const playerDoc = await playerRef.get();

        if (playerDoc.exists) {
          console.log(playerDoc.data(), "playerDetails");
          setPlayerDetails(playerDoc.data());
        } else {
          console.log("Player details not available");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPlayerDetails();

    // return a cleanup function if necessary
    return () => {
      // do cleanup
    };
  }, []);

  return playerDetails;
};



