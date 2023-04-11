import React, { useState, useEffect, useRef } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
export const createAndFetchTeam = () => {
  const [numberOfTeams, setNumberOfTeams] = useState() //to keep a count whenever a new team is added

  const createTeam = (teamInfo, playerDetails) => {
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

  const fetchTeamDetails = (playerDetails, setMyTeams) => {
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

  return { addOpponent, fetchOpponentTeams }
}




// send game request to other team
export const sendAndFetchGameRequest = () => {

  const sendGameRequestToOpponent = (currentTeam, opponentTeam, game) => {
    const teamId = currentTeam?.teamId
    const opponentId = opponentTeam?.teamId
    const opponentName = currentTeam?.teamName
    try {
      firestore()
        .collection("teams")
        .doc(opponentId)
        .collection("myOpponentTeams")
        .doc(teamId)
        .collection("gameRequest")
        .add({
          ...game,
          gameRequestId: teamId,
          opponentName: opponentName,
          gameRequestStatus: "pending"
        })
        .then((doc) => {
          console.log("Game Request sent successfully!")
          // update the doc with the gameRequestId
          doc.update({ gameRequestId: doc.id });
        })
        .catch(error => console.log(error, "error"))
    } catch (error) {
      console.log(error, "error")
    }
  }

  // fetch game request sent to me
  const fetchGameRequest = (teamId, opponentId) => {
    const [gameRequest, setGameRequest] = useState([])
    useEffect(() => {
      const subscribe = firestore()
        .collection("teams")
        .doc(teamId)
        .collection("myOpponentTeams")
        .doc(opponentId)
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

  const acceptGameRequest = (currentTeam, opponentTeam, game) => {

    const teamId = currentTeam?.teamId
    const myTeamName = currentTeam?.teamName
    const opponentName = opponentTeam?.teamName
    const opponentId = opponentTeam?.teamId
    const gameRequestId = game?.gameRequestId
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .collection("myOpponentTeams")
        .doc(opponentId)
        .collection("gameRequest")
        .doc(gameRequestId)
        .update({
          gameRequestStatus: "accepted",
          opponentName: opponentName
        })
        .then(() => {
          console.log("Game Request accepted successfully!")
          // create the game request doc in opponent
          firestore()
            .collection("teams")
            .doc(opponentId)
            .collection("myOpponentTeams")
            .doc(teamId)
            .collection("gameRequest")
            .doc(gameRequestId)
            .set({
              ...game,
              opponentName: myTeamName,
              gameRequestStatus: "accepted",
            })
            .then(() => {
              console.log("Game Request accepted successfully!")
            }
            )
            .catch(error => console.log(error, "error1"))

        })
        .catch(error => console.log(error, "error2"))
    } catch (error) {
      console.log(error, "error3")
    }


    // update the squad object for my team
    try {
      firestore()
        .collection("teams")
        .doc(teamId)
        .update({
          "squad.game": game,
          "squad.game.opponentName": opponentName
        })
        .then(() => console.log("Game is Fixed!"))
        .catch(error => console.log(error, "statusError"))
    } catch (error) {
      console.log(error, "statusError")
    }

    // update the squad object for opponent team
    try {
      firestore()
        .collection("teams")
        .doc(opponentId)
        .update({
          "squad.game": game,
          "squad.game.opponentName": myTeamName
        })
        .then(() => console.log("Game is Fixed!"))
        .catch(error => console.log(error, "statusError"))
    } catch (error) {
      console.log(error, "statusError")
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



// to store and fetch teamMessages from firestore
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


export const useOpponentMessages = (opponentTeam, currentTeam) => {
  const [messages, setMessages] = useState([]);


  const opponentTeamId = opponentTeam.teamId;
  const myTeamId = currentTeam.teamId;

  const createMessageObj = (text, uid) => ({
    text,
    uid,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  const getMessageCollectionKey = (teamId1, teamId2) => {
    return teamId1 < teamId2 ? `${teamId1}_${teamId2}` : `${teamId2}_${teamId1}`;
  };

  const teamIdsAddedKey = getMessageCollectionKey(myTeamId, opponentTeamId);

  const checkTeamIdsAdded = async () => {
    const value = await AsyncStorage.getItem(teamIdsAddedKey);
    console.log(value)
    return value
  };

  const setTeamIdsAdded = async () => {
    try {
      await AsyncStorage.setItem(teamIdsAddedKey, 'true');
    } catch (error) {
      console.log(error, 'error');
    };
  };

  const addTeamsAsOpponents = async () => {
    const opponentTeamRef = firestore().collection('teams').doc(opponentTeamId);
    const myTeamRef = firestore().collection('teams').doc(myTeamId);

    try {
      await opponentTeamRef.collection('myOpponentTeams').doc(myTeamId).set(currentTeam);
      await myTeamRef.collection('myOpponentTeams').doc(opponentTeamId).set(opponentTeam);
    } catch (error) {
      console.log(error, 'error');
    }
  };


  const sendMessage = async (text, uid) => {
    const messageObj = createMessageObj(text, uid);
    const messageCollectionKey = getMessageCollectionKey(myTeamId, opponentTeamId);

    try {
      const docRef = firestore().collection('messages').doc(messageCollectionKey);

      // Check if team IDs have been added
      if (!(await checkTeamIdsAdded())) {
        const docSnapshot = await docRef.get();

        // Add team IDs and teams as opponents if they don't exist
        if (!docSnapshot.exists) {
          await docRef.set({
            teamId1: myTeamId,
            teamId2: opponentTeamId,
          });
          console.log('Team Ids added successfully!');

          // Add the teams as each others opponents
          await addTeamsAsOpponents();

          // Set the value to 'true' in AsyncStorage
          await setTeamIdsAdded();
        }
      }

      // Send the message
      await firestore()
        .collection('messages')
        .doc(messageCollectionKey)
        .collection('chats')
        .add(messageObj);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const messageCollectionKey = getMessageCollectionKey(myTeamId, opponentTeamId);

    const unsubscribe = firestore()
      .collection('messages')
      .doc(messageCollectionKey)
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const messageDocs = querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
            user: {
              _id: doc.data().uid,
            },
          }));
          setMessages(messageDocs);
        },
        (error) => {
          console.error('Error fetching messages:', error);
        },
      );

    return () => unsubscribe();
  }, [myTeamId]);

  return { messages, sendMessage };
};



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

// check if the squad is ready for the opponent
export const useCheckSquad = (teamId) => {
  const [isSquadReady, setIsSquadReady] = useState(false)

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("teams")
      .doc(teamId)
      .onSnapshot((doc) => {
        const squad = doc?.data()?.squad
        if (squad?.status === "Ready") {
          setIsSquadReady(true)
        }
      })
    return () => unsubscribe()
  }, [teamId])

  return isSquadReady
}