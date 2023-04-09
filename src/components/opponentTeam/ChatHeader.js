import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatHeader = ({ opponentTeam, onAddIconPressed, onFootballIconPressed }) => {
  return (
    <View style={styles.chatHeaderBox}>
      <Text style={styles.text}>{opponentTeam?.teamName}</Text>
      <View style={styles.iconContainer}>
        <Icon name="add-outline" size={30} color="white" onPress={onAddIconPressed} />
        <Icon name="football-outline" size={30} color="white" onPress={onFootballIconPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2f3136',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginVertical: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },
});

export default ChatHeader;
