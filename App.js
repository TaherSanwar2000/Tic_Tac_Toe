import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GameScreen from "./src/GameScreen";
import GameSetupScreen from "./src/GameSetup";
import AppLoading from 'expo-app-loading'; 
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Matemasie": require('./assets/fonts/Matemasie-Regular.ttf'),
    "Montaga": require('./assets/fonts/Montaga-Regular.ttf'),

  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameSetup" screenOptions={{headerShown:false}}>
        <Stack.Screen name="GameSetup" component={GameSetupScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
