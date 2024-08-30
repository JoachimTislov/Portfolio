import { ref } from 'vue'
import { initiateAlgorithms } from '../BotLogic/BotInit'
import { board, GameOver, playerValue, playerTurn, log } from './variables'
import { executePlacement } from './executePlacement'

export const busy = ref<boolean>(false)

export const dropPiece = async (row: number) => {
  if (!GameOver.value && !busy.value) {
    busy.value = true
    if (playerTurn.value) {
      for (let slot = 0; slot < 7; slot++) {
        if (board[row][slot] === 0) {
          // Prevent mix up between moves in next move buffer and future moves
          // The future moves will be wrong and therefore removed
          log.value.future = []

          await executePlacement(board, row, slot, playerValue)

          playerTurn.value = false

          if (!GameOver.value) {
            await initiateAlgorithms(board)
          }

          break
        }
      }
    }
    busy.value = false
  }
}
