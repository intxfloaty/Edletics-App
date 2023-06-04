import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectMyCurrentTeam } from "../redux/actions/actions";
import Icon from "react-native-vector-icons/Ionicons";

const SelectTeam = ({ myTeams, closeModal }) => {
  const navigation = useNavigation();
  const currentTeam = useSelector((state) => state.currentTeam);
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.parent, { opacity: fadeAnim }]}>
      {myTeams?.map((myTeam, index) => {
        return (
          <TouchableHighlight
            underlayColor="#4a4a4a"
            style={styles.teamContainer}
            onPress={() => {
              dispatch(selectMyCurrentTeam(myTeam));
              closeModal();
            }}
            key={index}
          >
            <>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{myTeam?.teamName}</Text>
                <Text style={styles.subText}>Rating</Text>
                <Text style={styles.subText}>5v5</Text>
              </View>
              <Icon
                name="chevron-forward-outline"
                size={20}
                style={styles.arrowIcon}
                color="white"
              />
            </>
          </TouchableHighlight>
        );
      })}
    </Animated.View>
  );
};

export default SelectTeam;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    height: "100%",
    padding: 10,
    backgroundColor: "#101112",
  },
  teamContainer: {
    marginTop: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    minHeight: "10%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 25,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  subText: {
    fontSize: 16,
    color: "gray",
  },
  arrowIcon: {
    color: "#46b5d1",
  },
});
