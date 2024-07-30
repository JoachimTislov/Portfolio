import { resetChoices } from "../BotLogic/BotInit"
import { assignPiecesWithInt } from "./pieces"
import { board, GameOver, log, playerStatus, ShowBoard, ShowWinner } from "./variables"

export const resetGame = async () => {
  // resetting board
  board.forEach((row: number[]) => {
    row.fill(0) // Fill each row with 0
  })

  resetChoices()
  log.value = []

  ShowBoard.value = true
  GameOver.value = false
  ShowWinner.value = false

  assignPiecesWithInt(0)
  playerStatus.value = 1
}
