import { resetChoices } from "../BotLogic/Bot"
import { alterPreviousButton, alterRestartButton, initBotStarts } from "./functions"
import { board, botGame, GameOver, log, losing_Coordinates, playerStatus, playerTurn, ShowBoard, ShowWinner } from "./variables"

export const resetGame = (pieces: number, assignInt: (int: number) => void) => {
  // resetting board
  board.forEach((row: number[]) => {
    row.fill(0) // Fill each row with 0
  })

  assignInt(0)
  pieces = 0

  if(botGame.value) {
    initBotStarts(assignInt)
  } 
  
  alterRestartButton(pieces)
  alterPreviousButton(pieces)

  resetChoices()

  ShowBoard.value = true
  playerTurn.value = true

  GameOver.value = false
  ShowWinner.value = false
  
  log.value = []
  losing_Coordinates.value = []

  playerStatus.value = 1
}
