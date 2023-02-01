import { Text, View, StyleSheet } from "react-native";
import OTPScreen from "./src/screens/OTPScreen";
import SignInScreen from "./src/screens/SignInScreen";


const YourApp = () => {
  return (
    <View style={styles.root}>
      <SignInScreen />
    </View>
  )
}

export default YourApp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})