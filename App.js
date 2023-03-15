import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import { userAuthState } from './src/firebase/firebase'
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTeams from './src/screens/MyTeams';
import HomeScreen from './src/screens/HomeScreen';
import PlayerDetails from './src/screens/PlayerDetails';
import JoinTournament from './src/screens/JoinTournament';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper'
import store from './src/redux/store';
import TournamentScreen from './src/screens/TournamentScreen';
import MyDrawer from './src/screens/MyDrawer';
import TeamScreenTabs from './src/screens/team/TeamScreenTabs';
import TeamSettings from './src/screens/team/TeamSettings';
import CreateSquad from './src/screens/team/CreateSquad';
import CreateGame from './src/screens/CreateGame';
import GameDetails from './src/screens/team/GameDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import TeamChat from './src/screens/team/TeamChat';


const Stack = createNativeStackNavigator();

const YourApp = () => {
  const { user, initializing } = userAuthState();

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.root}>
        <SignInScreen />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlayerDetails" component={PlayerDetails} />
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name="MyTeams" component={MyTeams} />
            <Stack.Screen name="TeamScreen" component={TeamScreenTabs} />
            <Stack.Screen name = "CreateSquad" component = {CreateSquad} />
            <Stack.Screen name="CreateGame" component={CreateGame} />
            <Stack.Screen name="GameDetails" component={GameDetails} />
            <Stack.Screen name="TeamChat" component={TeamChat} />

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="TeamSettings" component={TeamSettings} />
            </Stack.Group>

            <Stack.Screen name="JoinTournament" component={JoinTournament} />
            <Stack.Screen name="TournamentScreen" component={TournamentScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default YourApp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})