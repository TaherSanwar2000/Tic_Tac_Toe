import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

export default function GameSetupScreen({ navigation }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const startGame = () => {
    if (player1 && player2) {
      navigation.navigate("GameScreen", { player1, player2 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems:"center",marginTop:'20%'}}>
      <Image source={require('../assets/tic_tac_toe.gif')} style={{width:300,height:200,}} resizeMode="contain"/>

      </View>
      <View style={{alignItems:"center"}}>

      <Text style={styles.title}>Enter Player Names</Text>
      <TextInput
        style={styles.input}
        placeholder="Player 1"
        value={player1}
        onChangeText={setPlayer1}
        placeholderTextColor='#bababa'
      />
      <TextInput
        style={styles.input}
        placeholder="Player 2"
        value={player2}
        onChangeText={setPlayer2}
        placeholderTextColor='#bababa'

      />
      <TouchableOpacity style={styles.button} onPress={startGame}>
        <Text style={styles.buttomText}>Start Game</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffe0'
  },
  title: { fontSize: 24, marginBottom: 20, fontFamily: "Montaga",color:'#000' },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
    fontFamily: "Montaga",
    borderRadius: 12,
    color:'#000'
  },
  button: {
    backgroundColor: "#ffdf00",
    padding: 12,
    borderRadius: 12,
    marginTop:'5%'
  },
  buttomText: {
    fontSize: 24,
    fontFamily: "Montaga",
    color: "#000",
  },
});
