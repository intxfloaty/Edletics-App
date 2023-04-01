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
        teamFormat: teamInfo.teamFormat,
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
            teamFormat: teamInfo.teamFormat,
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
      subscribe = firestore()
        .collection("players")
        .doc(`${playerDetails?.phoneNumber}`)
        .collection("myTeams")
        .onSnapshot((querySnapShot) => {
          const newTeams = []
          querySnapShot.forEach((doc) => {
            newTeams.push(doc.data())
          })
          setMyTeams(newTeams)
        })
      return () => subscribe()
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


// to update team with squad for games and tournaments
export const createAndFetchSquad = () => {

  const createSquadForGame = (teamId, squad) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .update({ squad: squad })
        .then((docRef) => {
          console.log("Team updated with Squad!");
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
    const [squad, setSquad] = useState({})
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .onSnapshot((querySnapShot) => {
          setSquad(querySnapShot.data()?.squad)
        }, (error) => {
          console.log(error, "error5")
        })
      return () => subscribe()
    }, [teamId])
    return squad
  }

  return { createSquadForGame, fetchSquad }
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


//  function to update the squad with players 
export const updateGameSquad = () => {
  const updateGameSquadList = (teamId, player) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .update({
          'squad.playerList': firestore.FieldValue.arrayUnion({ name: player }),
        })
        .then((doc) => {
          console.log("Players List updated successfully!")
          const teamRef = firestore().collection("teams").doc(teamId)

          teamRef.get().then((doc) => {
            if (Object.keys(doc.data()?.squad.playerList === doc.data()?.squad.squadSize)) {
              teamRef.update({
                "squad.status": "Ready"
              }).then(() => console.log("squad is ready"))
                .catch(error => console.log(error, "statusError"))
            }
          })
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }
  return { updateGameSquadList }
}

// to update the team with opponent
export const addAndFetchOpponent = () => {

  const addOpponent = (teamId, team, opponentId, opponent) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("opponent")
        .doc(opponentId)
        .set(opponent)
        .then(() => {
          console.log("Opponent added successfully!")

          // add myTeam to opponent
          firestore()
            .collection("teams")
            .doc(opponentId)
            .collection("opponent")
            .doc(teamId)
            .set(team)
            .then(() => {
              console.log("Opponent added successfully!")
            }
            )
            .catch(error => console.log(error, "error"))
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  const fetchOpponentTeams = () => {
    const [opponentTeams, setOpponentTeams] = useState([]);
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .onSnapshot((querySnapShot) => {
          const teams = [];
          querySnapShot.forEach((doc) => {
            teams.push(doc.data());
          });
          setOpponentTeams(teams);
        });
      return () => subscribe();
    }, []);
    return opponentTeams;
  };


  // fetch opponents whose squad is ready
  const fetchMyOpponentWithSquadReady = (teamId) => {
    const [opponent, setOpponent] = useState([])
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .collection("opponent")
        .onSnapshot((querySnapShot) => {
          const opponent = []
          querySnapShot.forEach((doc) => {
            const opponentRef = firestore().collection("teams").doc(doc.id)
            opponentRef.get().then((doc) => {
              if (doc.data()?.squad.status === "Ready") {
                opponent.push(doc.data())
              }
            })
          })
          setOpponent(opponent)
        })
      return () => subscribe()
    }, [])
    return opponent
  }

  return { addOpponent, fetchOpponentTeams, fetchMyOpponentWithSquadReady }
}




// send game request to other team
export const sendAndFetchGameRequest = () => {

  const sendGameRequestToOpponent = (teamId, opponentId, opponentName, game) => {
    try {
      firestore()
        .collection("teams")
        .doc(opponentId)
        .collection("gameRequest")
        .doc(teamId)
        .set({
          ...game,
          gameRequestId: teamId,
          opponentName: opponentName,
          gameRequestStatus: "pending"
        })
        .then(() => {
          console.log("Game Request sent successfully!")
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  // fetch game request sent to me
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
  return { sendGameRequestToOpponent, fetchGameRequest }
}

// to update the game request status
export const updateGameRequestStatus = () => {

  const acceptGameRequest = (teamId, opponentId, opponentName, game) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("gameRequest")
        .doc(opponentId)
        .update({
          gameRequestStatus: "accepted"
        })
        .then(() => {
          console.log("Game Request accepted successfully!")
          // create the game request doc in opponent
          firestore()
            .collection("teams")
            .doc(opponentId)
            .collection("gameRequest")
            .doc(teamId)
            .set({
              ...game,
              opponentName: opponentName,
              gameRequestStatus: "accepted",
              gameRequestId: teamId
            })
            .then(() => {
              console.log("Game Request accepted successfully!")
            }
            )
            .catch(error => console.log(error, "error"))

        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  const declineGameRequest = (teamId, opponentId) => {
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("gameRequest")
        .doc(opponentId)
        .delete()
        .then(() => {
          console.log("Game Request declined successfully!")
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }
  return { acceptGameRequest, declineGameRequest }
}



// to store and fetch messages from firestore
export const useMessages = (teamId) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text, uid) => {
    if (!teamId) return;

    firestore()
      .collection('teams')
      .doc(teamId)
      .collection('teamMessages')
      .add({
        text: text,
        uid: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Message sent successfully!');
      })
      .catch((error) => console.log(error, 'error sending message'));
  };

  useEffect(() => {
    if (!teamId) return;

    const unsubscribe = firestore()
      .collection('teams')
      .doc(teamId)
      .collection('teamMessages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const messageDocs = querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
            user: {
              _id: doc.data().uid,
              // name: 'User ' + doc.data().uid, // Replace this with the actual user name
              // avatar: 'https://placeimg.com/140/140/any',
            },
          }));
          setMessages(messageDocs);
        },
        (error) => {
          console.log(error, 'error');
        },
      );

    return () => unsubscribe();
  }, [teamId]);

  return { messages, sendMessage }
}



// to store and fetch messages of opponents
export const useOpponentMessages = (opponentTeam, currentTeam) => {
  const [messages, setMessages] = useState([]);
  const opponentTeamId = opponentTeam.teamId
  const myTeamId = currentTeam.teamId

  const sendMessage = (text, uid) => {
    const messageObj = {
      text: text,
      uid: uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    // Send message to my opponentMessages collection
    firestore()
      .collection('teams')
      .doc(myTeamId)
      .collection('myOpponentTeams')
      .doc(opponentTeamId)
      .collection('opponentMessages')
      .add(messageObj)
      .then(() => {
        console.log('Message sent to my opponentMessages collection successfully!');

        // add opponent to myOpponentTeams collection
        firestore()
          .collection('teams')
          .doc(myTeamId)
          .collection('myOpponentTeams')
          .doc(opponentTeamId)
          .set(opponentTeam)
          .then(() => {
            console.log('Opponent added to myOpponentTeams collection successfully!');
          })
          .catch((error) => console.log(error, 'error adding opponent to myOpponentTeams collection'));
      })
      .catch((error) => console.log(error, 'error adding message to my opponentMessages collection'));

    // Send message to the opponent's opponentMessages collection
    firestore()
      .collection('teams')
      .doc(opponentTeamId)
      .collection('myOpponentTeams')
      .doc(myTeamId)
      .collection('opponentMessages')
      .add(messageObj)
      .then(() => {
        console.log('Message sent to the opponent\'s opponentMessages collection successfully!');

        // add opponent to myOpponentTeams collection
        firestore()
          .collection('teams')
          .doc(opponentTeamId)
          .collection('myOpponentTeams')
          .doc(myTeamId)
          .set(currentTeam)
          .then(() => {
            console.log('Opponent added to the opponent\'s myOpponentTeams collection successfully!');
          })
          .catch((error) => console.log(error, 'error adding opponent to the opponent\'s myOpponentTeams collection'));
      })
      .catch((error) => console.log(error, 'error adding message to the opponent\'s opponentMessages collection'));
  };



  useEffect(() => {
    const unsubscribe = firestore()
      .collection('teams')
      .doc(myTeamId)
      .collection('myOpponentTeams')
      .doc(opponentTeamId)
      .collection('opponentMessages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const messageDocs = querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
            user: {
              _id: doc.data().uid,
              // name: 'User ' + doc.data().uid, // Replace this with the actual user name
              // avatar: 'https://placeimg.com/140/140/any',
            },
          }));
          setMessages(messageDocs);
        },
        (error) => {
          console.log(error, 'error');
        },
      );

    return () => unsubscribe();
  }, [myTeamId]);

  return { messages, sendMessage }
}


// fetch list of opponents a team has had chat with
export const useOpponentsChatList = (myTeamId) => {
  const [myOpponentsList, setmyOpponentsList] = useState([])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("teams")
      .doc(myTeamId)
      .collection("myOpponentTeams")
      .onSnapshot((querySnapShot) => {
        const opponents = []
        querySnapShot?.forEach((doc) => {
          opponents.push(doc.data())
        })
        setmyOpponentsList(opponents)
      })
    return () => unsubscribe()
  }, [myTeamId])

  return myOpponentsList
}
