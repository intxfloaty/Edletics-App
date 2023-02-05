import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomProfileOptions = ({ mainText, subText, iconName, onPress }) => {
  return (
    <Pressable style={styles.profileOptionsContainer} onPress={onPress}>
      <View style={styles.options}>
        <Icon name={iconName} size={25} color="white" />
        <View style={styles.optionText}>
          <Text style={styles.mainText}>{mainText}</Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>
      </View>
      <Icon name="chevron-forward-outline" size={25} color="white" />
    </Pressable>
  )
}

export default CustomProfileOptions

const styles = StyleSheet.create({
  profileOptionsContainer: {
    marginTop: 15,
    height: 75,
    width: "100%",
    backgroundColor: "#202224",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionText: {
    marginLeft: 20,
  },
  mainText: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
  },
  subText: {
    color: "white",
    fontSize: 12
  },
})