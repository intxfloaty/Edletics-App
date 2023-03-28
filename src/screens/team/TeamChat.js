import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { userAuthState, usePlayerDetails, addAndFetchOpponent, sendAndFetchGameRequest, updateGameRequestStatus, useMessages } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat';

const TeamChat = () => {
  const { user } = userAuthState();
  const { playerDetails } = usePlayerDetails(user?.phoneNumber)
  const currentTeam = useSelector(state => state.currentTeam)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const teams = fetchOpponentTeams(currentTeam)
  const { fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId)
  const { acceptGameRequest, declineGameRequest } = updateGameRequestStatus()
  const { messages, sendMessage } = useMessages(currentTeam?.teamId);
  const [chatMessages, setChatMessages] = useState([]);


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

export default TeamChat

const styles = StyleSheet.create({
  parent: {
    height: "100%",
    backgroundColor: "#101112",
    padding: 10,
  },
  newGameContainer: {
    backgroundColor: 'white',
    minHeight: 150,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "blue",
    fontSize: 20,
    marginVertical: 2
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  }
})




 