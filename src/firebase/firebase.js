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


// to create squad for games and tournaments
export const createSquad = () => {

  const createSquadForGame = (teamId,  squad) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGameSquad")
        .add({
          ...squad,
          squadId: "",
        })
        .then((docRef) => {
          console.log("Squad added with ID: ", docRef.id);
          // Update the squadId field with the newly generated document ID
          docRef.update({ squadId: docRef.id });
        })
        .catch((error) => {
          console.error("Error adding squad: ", error);
        });
    } catch (error) { 
      console.log(error)
    }
  }

  // to fetch the squad created
  const fetchSquad = (teamId) => {
    const [newSquad, setNewSquad] = useState([])
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGameSquad")
        .onSnapshot((querySnapShot) => {
          const newSquad = []
          querySnapShot.forEach((doc) => {
            newSquad.push(doc.data())
          })
          setNewSquad(newSquad)
        })
      return () => subscribe()
    }, [])
    return newSquad
  }

  return { createSquadForGame , fetchSquad }
}


// to create new games and fetch new games created
export const createAndFetchGame = () => {

  // to create a new game and add it as a sub-collection to teams
  const createNewGame = (teamId, game) => {
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

  const createNewGameFromGameRequest = (teamId, gameId, game) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .doc(gameId)
        .set({ ...game }
          // gameId: "" // Add an empty gameId field
        )
        .then((doc) => {
          console.log("New game created! with ID: ", doc.id);
          // Update the gameId field with the newly generated document ID
          // doc.update({ gameId: doc.id });
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  // to fetch the games created
  const fetchNewGame = (teamId) => {
    const [newGame, setNewGame] = useState([])
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .onSnapshot((querySnapShot) => {
          const newGame = []
          querySnapShot.forEach((doc) => {
            newGame.push(doc.data())
          })
          setNewGame(newGame)
        })
      return () => subscribe()
    }, [])
    return newGame
  }

  return { createNewGame, fetchNewGame, createNewGameFromGameRequest }
}







//  function to update the team with players going for a game
export const updateTeamWithPlayers = () => {
  const updateTeamWithPlayersGoing = (teamId, gameId, player) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .doc(gameId)
        .update({
          playersGoing: firestore.FieldValue.arrayUnion(`${player}`)
        })
        .then(() => {
          console.log("Players going updated successfully!")
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  const updateTeamWithPlayersNotGoing = (teamId, gameId, player) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .doc(gameId)
        .update({
          playersGoing: firestore.FieldValue.arrayRemove(`${player}`)
        })
        .then(() => {
          console.log("Players not going updated successfully!")
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  // to fetch players going for a game
  const fetchPlayersGoing = (teamId, gameId) => {
    const [playersGoing, setPlayersGoing] = useState([])
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .doc(gameId)
        .onSnapshot((doc) => {
          const playersGoing = doc.data().playersGoing
          setPlayersGoing(playersGoing)
        })
      return () => subscribe()
    }, [])
    return playersGoing
  }

  // to delete a game
  const deleteGame = (teamId, gameId) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .doc(gameId)
        .delete()
        .then(() => {
          console.log("Game deleted successfully!")
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  return {
    updateTeamWithPlayersGoing,
    updateTeamWithPlayersNotGoing,
    deleteGame,
    fetchPlayersGoing,
  }
}

// to update the team with opponent
export const updateTeamWithOpponent = () => {
  const updateOpponent = (teamId, gameId, opponent) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("newGame")
        .doc(gameId)
        .update({
          opponent: opponent
        })
        .then(() => {
          console.log("Opponent updated successfully!")
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }
  return { updateOpponent }
}


// to fetch all the teams
export const fetchAllTeams = (currentTeamAdminId) => {
  const [allTeams, setAllTeams] = useState([])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("teams")
      .where("teamAdminId", "!=", currentTeamAdminId) // exclude teams created by currentTeamAdmin
      .onSnapshot((querySnapShot) => {
        const newAllTeams = [];
        querySnapShot.forEach((doc) => {
          newAllTeams.push(doc.data());
        });
        setAllTeams(newAllTeams);
      });
    return () => unsubscribe();
  }, []);

  return allTeams
}

// send game request to other team
export const sendGameRequest = () => {

  // create a game request
  const createGameRequest = (myTeamId, gameRequest, opponentTeamId) => {
    try {
      firestore()
        .collection("teams")
        .doc(myTeamId)
        .collection("gameRequest")
        .add({
          ...gameRequest,
          gameStatus: "pending", // Add a gameStatus field with value "pending"
          gameRequestedTo: opponentTeamId, // Add an empty gameRequestedTo field
          gameRequestId: "" // Add an empty gameRequestId field
        })
        .then((doc) => {
          console.log("Game request sent! with ID: ", doc.id);
          // Update the gameRequestId field with the newly generated document ID
          doc.update({ gameRequestId: doc.id });
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  const sendGameRequestToTeam = (opponentTeamId, gameRequest, myTeamId) => {
    try {
      firestore()
        .collection("teams")
        .doc(opponentTeamId)
        .collection("gameRequest")
        .add({
          ...gameRequest,
          gameStatus: "pending", // Add a gameStatus field with value "pending"
          gameRequestedBy: myTeamId, // Add an empty gameRequestedBy field
          playersGoing: [], // Add an empty playersGoing field
          gameRequestId: "" // Add an empty gameRequestId field
        })
        .then((doc) => {
          console.log("Game request sent! with ID: ", doc.id);
          // Update the gameRequestId field with the newly generated document ID
          doc.update({ gameRequestId: doc.id });
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  // to fetch game requests sent to a team
  const fetchGameRequest = (teamId) => {
    const [gameRequest, setGameRequest] = useState([])
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .collection("gameRequest")
        .onSnapshot((querySnapShot) => {
          const gameRequest = []
          querySnapShot.forEach((doc) => {
            gameRequest.push(doc.data())
          })
          setGameRequest(gameRequest)
        })
      return () => subscribe()
    }, [])
    return gameRequest
  }

  return { createGameRequest, sendGameRequestToTeam, fetchGameRequest }
}