import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { userAuthState, usePlayerDetails, addAndFetchOpponent, sendAndFetchGameRequest, updateGameRequestStatus, useOpponentMessages } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';

const OpponentChat = ({ route }) => {
  const { opponentTeam } = route.params
  console.log(opponentTeam?.teamId, "opponentTeam")
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const currentTeam = useSelector(state => state.currentTeam)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const teams = fetchOpponentTeams(currentTeam)
  const {sendGameRequestToOpponent, fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId)
  const { acceptGameRequest, declineGameRequest } = updateGameRequestStatus()
  const { messages, sendMessage } = useOpponentMessages(opponentTeam, currentTeam);
  const [chatMessages, setChatMessages] = useState([]);

  const onFootballIconPressed = () => {
    sendGameRequestToOpponent(currentTeam, opponentTeam)
    const customMessage = `${opponentTeam?.teamName} sent you a game request!`; // Replace this with the desired custom message
    sendMessage(customMessage, user?.uid);
  };

  useLayoutEffect(() => {
    setChatMessages(
      messages.map((message) => ({
        ...message,
        user: {
          _id: message?.user?._id,
          name: message?.user?.name,
          // avatar: 'https://placeimg.com/140/140/any',
        },
      })),
    );
  }, [messages]);


  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    sendMessage(message.text, user?.uid);
  }, [user]);

  return (
    <View style={styles.parent}>
      <View style={styles.chatHeaderBox}>
        <Text style={styles.text}>{opponentTeam?.teamName}</Text>
        <Icon 
          name="football-outline"
          size={30}
          color="white"
          onPress={onFootballIconPressed}
        />
      </View>
      <GiftedChat
        messages={chatMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
        }}
      />
    </View>
  );
}

export default OpponentChat

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
  },
  chatHeaderBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2f3136",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginVertical: 2
  },
})
