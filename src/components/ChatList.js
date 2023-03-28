import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';



const ChatList = () => {
  const [searchText, setSearchText] = useState('')
  const [chats, setChats] = useState(['Chat 1'])

  const filteredChats = chats.filter(chat =>
    chat.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <View style={styles.parent}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} color="white" />
        <TextInput
          style={styles.searchBox}
          placeholder="Search and connect with teams"
          placeholderTextColor="#ccc"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
      </View>

      <TouchableHighlight
        underlayColor="#4a4a4a"
        style={styles.myTeamchatContainer}
        onPress={() => {

        }}>
        <>
          <Avatar.Text size={40} label="MT" style={styles.avatar} color="white" />
          <View style={styles.textContainer}>
            <Text style={styles.text}>My Team Fc</Text>
            <Text style={styles.subText}>Rating</Text>
          </View>
        </>
      </TouchableHighlight>

      <View style={styles.chatListContainer}>
        {filteredChats.map(chat => (
          <TouchableHighlight
            underlayColor="#4a4a4a"
            style={styles.myTeamchatContainer}
            onPress={() => {

            }}>
            <>
              <Avatar.Text size={40} label="OT" style={styles.avatar} color="black" />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Opponent Team Fc</Text>
                <Text style={styles.subText}>Rating</Text>
              </View>
            </>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#101112',
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchBox: {
    minHeight: 40,
    width: '100%',
    color: '#fff',
    marginLeft: 10,
  },

  myTeamchatContainer: {
    marginTop: 10,
    // backgroundColor: '#1e1e1e',
    borderRadius: 10,
    minHeight: "10%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    position: "absolute",
    left: 10,
  },
  textContainer: {
    display: "flex",
    position: "absolute",
    left: 70
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  subText: {
    fontSize: 16,
    color: "gray"
  },
  chatListContainer: {
    flex: 1,
    marginTop: 20,
  },
  chatContainer: {
    padding: 10,
    marginBottom: 10,
  },
  chatText: {
    color: '#fff',
  },
})

export default ChatList
