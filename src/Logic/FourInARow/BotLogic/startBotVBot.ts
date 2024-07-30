import { botValue, GameOver, Stop } from "../GameLogic/variables"
import { initiateAlgorithms } from "./BotInit"

export const startBotVBot = async (board: number[][]) => {
  Stop.value = false
  let counter = 0

  try {
    while (!GameOver.value && !Stop.value && counter <= 42) {

        botValue.value = botValue.value == 3 ? 5 : 3
        await initiateAlgorithms(board);

        counter++
    }
  } catch (error) {
    console.error('An error occurred during the game loop:', error);
  } finally {
    console.log('Game loop has ended.');
    // Perform any necessary cleanup here
  }
  
} 
