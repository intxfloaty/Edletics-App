import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { addAndFetchPlayers } from '../../firebase/firebase';
import { Avatar } from 'react-native-paper';

const TeamSquad = () => {
  const currentTeam = useSelector(state => state.currentTeam)
  const { fetchPlayersOfTeam } = addAndFetchPlayers()
  const [playerList, setPlayerList] = useState([])

  // to fetch players
  fetchPlayersOfTeam(currentTeam, setPlayerList);

  return (
    <View style={styles.parent}>
      <ScrollView showsVerticalScrollIndicator >
    <View>
        <View style={styles.coach}>
          <Avatar.Text size={40} label="P" style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{currentTeam?.teamAdminName}</Text>
            <Text style={styles.subText}>Coach</Text>
          </View>
        </View>

        <View style={styles.forward}>
          <Text style={styles.title}>Forward</Text>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Karim Benzema</Text>
              <Text style={styles.subText}>9</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Vinicius Junior</Text>
              <Text style={styles.subText}>20</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Rodrygo</Text>
              <Text style={styles.subText}>21</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Eden Hazard</Text>
              <Text style={styles.subText}>7</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Marco Asensio</Text>
              <Text style={styles.subText}>11</Text>
            </View>
          </View>
        </View>

        <View style={styles.forward}>
          <Text style={styles.title}>Mid-Fielder</Text>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Luka Modric</Text>
              <Text style={styles.subText}>10</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Toni Kroos</Text>
              <Text style={styles.subText}>8</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Federico Valverde</Text>
              <Text style={styles.subText}>15</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Eduardo Camavinga</Text>
              <Text style={styles.subText}>12</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Aurellen Tchouameni</Text>
              <Text style={styles.subText}>18</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Dani Ceballos</Text>
              <Text style={styles.subText}>19</Text>
            </View>
          </View>
        </View>
        <View style={styles.forward}>
          <Text style={styles.title}>Defender</Text>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>David Alaba</Text>
              <Text style={styles.subText}>4</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Eder Militao</Text>
              <Text style={styles.subText}>3</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Antonio Rudiger</Text>
              <Text style={styles.subText}>22</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Daniel Carvajal</Text>
              <Text style={styles.subText}>2</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Ferland Mendy</Text>
              <Text style={styles.subText}>23</Text>
            </View>
          </View>
          <View style={styles.playerContainer}>
            <Avatar.Text size={40} label="MT" style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Nacho</Text>
              <Text style={styles.subText}>6</Text>
            </View>
          </View>
        </View>
        <View style={styles.forward}>
          <Text style={styles.title}>GoalKeeper</Text>
        </View>
        </View>
      <View style={styles.footer}></View>
      </ScrollView>
    </View>
  )
}

export default TeamSquad

const styles = StyleSheet.create({
  parent: {
    height:"100%",
    backgroundColor: "#101112",
  },
  coach: {
    minHeight: "5%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray"
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
  title: {
    fontSize: 16,
    color: "red",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  forward: {
    width: "100%",
    minHeight: "10%",
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  playerContainer: {
    minHeight: 60,
    marginVertical: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footer:{
    height:250,
    width:"100%",
    // backgroundColor:"blue",
    zIndex:2
  }
})