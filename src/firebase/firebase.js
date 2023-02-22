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


// to fetch player details
export const usePlayerDetails = (phoneNumber) => {
  const [playerDetails, setPlayerDetails] = useState({});
  const [isPlayerDetail, setIsPlayerDetail] = useState(false)
  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const playerRef = firestore().collection("players").doc(`${phoneNumber}`);
        const playerDoc = await playerRef.get();

        if (playerDoc.exists) {
          setIsPlayerDetail(true)
          console.log(playerDoc.data(), "playerDetails");
          setPlayerDetails(playerDoc.data());
        } else {
          console.log("Player details not available");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (phoneNumber) {
      fetchPlayerDetails();
    }
  }, [phoneNumber]);

  return { playerDetails, isPlayerDetail };
};

// to fetch team details
export const fetchTeamDetails = () => {
  const [myTeams, setMyTeams] = useState([])
  const [teamId, setTeamId] = useState('')

  useEffect(() => {
    firestore()
      .collection("teams")
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data())
          setMyTeams(myTeams.concat(doc.data()))
          setTeamId(doc.id)
        })
      })
  }, [])

  return {myTeams, teamId}
}





