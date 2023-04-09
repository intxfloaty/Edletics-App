import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import {
  userAuthState,
  addAndFetchOpponent,
  sendAndFetchGameRequest,
  useOpponentMessages,
  useCheckSquad
} from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import SendGameRequestModal from '../../components/opponentTeam/SendGameRequestModal';
import GameModal from '../../components/opponentTeam/GameModal';


const OpponentChat = ({ route }) => {
  const { opponentTeam } = route.params
  const { isSquadReady } = route.params
  const { user } = userAuthState();
  const currentTeam = useSelector(state => state.currentTeam)
  const isMySquadReady = useCheckSquad(currentTeam?.teamId)
  const { addOpponent, fetchOpponentTeams } = addAndFetchOpponent()
  const teams = fetchOpponentTeams(currentTeam)
  const { sendGameRequestToOpponent, fetchGameRequest } = sendAndFetchGameRequest()
  const gameRequest = fetchGameRequest(currentTeam?.teamId, opponentTeam?.teamId)
  const { messages, sendMessage } = useOpponentMessages(opponentTeam, currentTeam);
  const [chatMessages, setChatMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [gameRequestModalVisible, setGameRequestModalVisible] = useState(false)


  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const openGameRequestModal = () => {
    setGameRequestModalVisible(true)
  }

  const closeGameRequestModal = () => {
    setGameRequestModalVisible(false)
  }

  const onAddIconPressed = () => {
    openGameRequestModal()
  };

  const onFootballIconPressed = () => {
    openModal()
  };

  const generateAvatarUrl = (teamName) => {
    const name = encodeURIComponent(teamName?.trim());
    return `https://ui-avatars.com/api/?name=${name}&background=random&size=128`;
  };

  useLayoutEffect(() => {
    setChatMessages(
      messages.map((message) => ({
        ...message,
        user: {
          _id: message?.user?._id,
          name: message?.user?.name,
          avatar: generateAvatarUrl(message?.user?.name),
        },
      })),
    );
  }, [messages]);


  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    const teamName = currentTeam?.teamName;
    sendMessage(message.text, user?.uid, teamName);
  }, [user]);


  return (
    <View style={styles.parent}>
      <View style={styles.chatHeaderBox}>
        <Text style={styles.text}>{opponentTeam?.teamName}</Text>
        <View style={styles.iconContainer}>
          {isMySquadReady && isSquadReady && !(gameRequest?.length != 0) &&
            <Icon
              name="add-outline"
              size={30}
              color="white"
              onPress={onAddIconPressed}
            />}
          <Icon
            name="football-outline"
            size={30}
            color="white"
            onPress={onFootballIconPressed}
          />
        </View>
      </View>
      <GiftedChat
        messages={chatMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user?.uid,
        }}
      />


      {/* Modal component for sending game requests - ADDIcon */}
      <SendGameRequestModal
        user={user}
        gameRequestModalVisible={gameRequestModalVisible}
        closeGameRequestModal={closeGameRequestModal}
        currentTeam={currentTeam}
        opponentTeam={opponentTeam}
        sendGameRequestToOpponent={sendGameRequestToOpponent}
        sendMessage={sendMessage} />


      {/* Modal component for received game requests - footballIcon */}
      <GameModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        gameRequest={gameRequest}
        currentTeam={currentTeam}
        opponentTeam={opponentTeam} />
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "20%",
  },
})
