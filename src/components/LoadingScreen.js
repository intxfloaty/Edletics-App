import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {/* <Text style={styles.text}>Loading...</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#101112",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:"white"
  },
});

export default LoadingScreen;
