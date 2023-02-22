import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MyTeams from '../screens/MyTeams';


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

// to create new teams and fetch team details
export const createAndFetchTeam = (teamInfo, playerDetails) => {
const [numberOfTeams, setNumberOfTeams] = useState() //to keep a count whenever a new team is added

  const createTeam = () => {
    firestore()
      .collection('teams')
      .doc(`${teamInfo.teamName}_${playerDetails?.phoneNumber}`)
      .set({
        teamName: teamInfo.teamName,
        teamLocation: teamInfo.teamLocation,
        teamAdminName: playerDetails?.fullName,
        teamAdminId: playerDetails?.phoneNumber,
      })
      .then(() => {
        console.log('team added!');
        setNumberOfTeams(numberOfTeams + 1)
      });
  }

  const fetchTeamDetails = (setMyTeams) => {
    useEffect(() => {
      firestore()
        .collection("teams")
        .get()
        .then((querySnapShot) => {
          const newTeams = []
          querySnapShot.forEach((doc) => {
            newTeams.push(doc.data())
          })
          setMyTeams(newTeams)
        })
    }, [numberOfTeams])
  }

  return { createTeam, fetchTeamDetails }
}





