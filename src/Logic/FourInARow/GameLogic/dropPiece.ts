import { ref } from "vue"
import { initiateAlgorithms } from "../BotLogic/BotInit"
import { updatePlayerStatus, toggleButtons, executePlacement } from "./functions"
import { board, botGame, GameOver, playerStatus, playerTurn, ShowWinner } from "./variables"

export const busy = ref<boolean>(false)

export const dropPiece = async (row: number) => {
  if(!GameOver.value && !busy.value) {
    busy.value = true
    if(botGame.value && playerTurn.value || !botGame.value) {
      for (let slot = 0; slot < 7; slot++) {
        if (board[row][slot] === 0) {
            toggleButtons(true)
            
            await executePlacement(row, slot, playerStatus.value)
            
            playerTurn.value = false
            
            if (botGame.value && !ShowWinner.value) {
                await initiateAlgorithms(board)
            }

            if (!botGame.value) {
            updatePlayerStatus()
            }

            break
        }
      }
    }
    busy.value = false
  }
}