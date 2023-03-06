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
        teamId: (`${teamInfo.teamName}_${playerDetails?.phoneNumber}`),
        teamAdminName: playerDetails?.fullName,
        teamAdminId: playerDetails?.phoneNumber,
        teamAdmin: playerDetails?.userId
      })
      .then(() => {
        console.log('team added!');
        setNumberOfTeams(numberOfTeams + 1)

        // update the player document with team information
        firestore()
          .collection("players")
          .doc(`${playerDetails?.phoneNumber}`)
          .collection("myTeams")
          .doc(`${teamInfo.teamName}_${playerDetails?.phoneNumber}`)
          .set({
            teamName: teamInfo.teamName,
            teamLocation: teamInfo.teamLocation,
            teamId: (`${teamInfo.teamName}_${playerDetails?.phoneNumber}`),
            teamAdminName: playerDetails?.fullName,
            teamAdminId: playerDetails?.phoneNumber,
            teamAdmin: playerDetails?.userId
          })
          .then(() => {
            console.log("Player updated with team information");
          })
          .catch((error) => {
            console.error("Error updating player: ", error);
          });
      })
      .catch(error => console.log(error, "can't create team"))
  }

  const fetchTeamDetails = (setMyTeams) => {
    useEffect(() => {
      firestore()
        .collection("players")
        .doc(`${playerDetails?.phoneNumber}`)
        .collection("myTeams")
        .get()
        .then((querySnapShot) => {
          const newTeams = []
          querySnapShot.forEach((doc) => {
            newTeams.push(doc.data())
          })
          setMyTeams(newTeams)
        })
    }, [playerDetails, numberOfTeams])
  }

  return { createTeam, fetchTeamDetails }
}


// to add new players to the team and fetch players in a team
export const addAndFetchPlayers = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState() //to keep a count of whenever a new player is added

  const addNewPlayer = (currentTeam, player) => {

    // add new player to the team
    firestore()
      .collection("teams")
      .doc(currentTeam?.teamId)
      .collection("players")
      .add({
        playerId: player,
      })
      .then((docRef) => {
        console.log("Player added with ID: ", docRef.id);
        setNumberOfPlayers(numberOfPlayers + 1);
        // Update the player document with team information
        firestore()
          .collection("players")
          .doc(player)
          .collection("myTeams")
          .doc(currentTeam?.teamId)
          .set(currentTeam)
          .then(() => {
            console.log("Player updated with team information");
          })
          .catch((error) => {
            console.error("Error updating player: ", error);
          });
      })
      .catch((error) => {
        console.error("Error adding player: ", error);
      });
  }

  // to fetch players of a team
  const fetchPlayersOfTeam = (currentTeam, setPlayerList) => {
    useEffect(() => {
      const unsubscribe = firestore()
        .collection("teams")
        .doc(currentTeam?.teamId)
        .collection("players")
        .onSnapshot((querySnapShot) => {
          const promises = [];
          const newPlayerList = [];
          querySnapShot?.forEach((doc) => {
            const playerData = doc.data();
            const playerId = playerData.playerId;
            const promise = firestore()
              .collection("players")
              .doc(playerId)
              .get()
              .then((playerDoc) => {
                if (playerDoc.exists) {
                  const player = { id: playerId, ...playerDoc.data() };
                  newPlayerList.push(player);
                }
              });
            promises.push(promise);
          });
          Promise.all(promises).then(() => {
            setPlayerList(newPlayerList);
          });
        });
      return () => unsubscribe();
    }, [currentTeam]);
  };

  return { addNewPlayer, fetchPlayersOfTeam }
}


// to create new games and fetch new games created
export const createAndFetchGame = () => {

  // to create a new game and add it as a sub-collection to teams
  const createNewGame = (teamId, game, setGameId) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .add({
          ...game,
          gameId: "" // Add an empty gameId field
        })
        .then((doc) => {
          console.log("New game created! with ID: ", doc.id);
          // Update the gameId field with the newly generated document ID
          doc.update({ gameId: doc.id });
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  // to fetch the games created
  const fetchNewGame = (teamId, setNewGame) => {
    useEffect(() => {
      try {
        firestore()
          .collection("teams")
          .doc(teamId)
          .collection("newGame")
          .get()
          .then((querySnapShot) => {
            const newGame = []
            querySnapShot.forEach((doc) => {
              newGame.push(doc.data())
            })
            setNewGame(newGame)
          })
      } catch (error) {
        console.log(error, "error")
      }
    }, [])
  }

  return { createNewGame, fetchNewGame }
}

// to delete a "myTeam" document from "myTeams" subcollection
// export const deleteMyTeam = (playerId, teamId) => {
//   firestore()
//     .collection("players")
//     .doc(playerId)
//     .collection("myTeams")
//     .doc(teamId)
//     .delete()
//     .then(() => {
//       console.log("Team successfully deleted from players collection!")

//       // update "teams" document
//       firestore()
//         .collection("teams")
//         .doc(teamId)
//         .delete()
//         .then(() => {
//           console.log("Team successfully deleted from teams collection!")
//         })
//         .catch(error => console.log("Error removing team from teams collection: ", error))
//     })
//     .catch(error => console.log("Error removing team from players collection: ", error))
// }
