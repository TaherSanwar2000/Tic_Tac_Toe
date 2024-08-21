import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";

export default function GameScreen({ route, navigation }) {
  const { player1, player2 } = route.params;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer === player1 ? "X" : "O";
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setWinner(currentPlayer);
    } else if (newBoard.every((cell) => cell)) {
      setWinner("Tie");
    } else {
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    }
  };

  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(player1);
    setWinner(null);
  };

  const getImageSource = () => {
    if (winner === "Tie") {
      return require("../assets/draw.png");
    } else {
      return require("../assets/trophy.jpeg");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Player: {currentPlayer}</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {winner && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View>
                <Image
                  source={getImageSource()}
                  resizeMode="contain"
                  style={{ height: 200, width: 200 }}
                />
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>
                  {winner === "Tie" ? "It's a Draw!" : `${winner} Wins!`}
                </Text>
                <TouchableOpacity style={styles.button} onPress={resetGame}>
                  <Text style={styles.buttomText}>Reset Game</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffe0",
  },
  title: { fontSize: 24, marginBottom: 20, fontFamily: "Montaga" },
  board: { width: 300, height: 300, flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: "33%",
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  cellText: { fontSize: 36, fontFamily: "Matemasie", color: "#ffdf00" },
  messageContainer: { marginTop: 20, alignItems: "center" },
  message: { fontSize: 24, marginBottom: 10, fontFamily: "Montaga" },
  button: {
    backgroundColor: "#ffdf00",
    padding: 8,
    borderRadius: 12,
    marginTop: "5%",
    paddingHorizontal: 16,
  },
  buttomText: {
    fontSize: 20,
    fontFamily: "Montaga",
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    width: 300,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    elevation:5
  },
});
