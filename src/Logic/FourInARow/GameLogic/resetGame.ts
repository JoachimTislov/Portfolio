import { resetChoices } from '../BotLogic/BotInit'
import { initBotStarts } from './functions'
import { assignPiecesWithInt } from './pieces'
import {
  board,
  botGame,
  GameOver,
  log,
  losing_Coordinates,
  playerStatus,
  playerTurn,
  ShowBoard
} from './variables'

export const resetGame = () => {
  // resetting board
  board.forEach((row: number[]) => {
    row.fill(0) // Fill each row with 0
  })

  resetChoices()

  ShowBoard.value = true
  playerTurn.value = true

  GameOver.value = false

  assignPiecesWithInt(0)

  if (botGame.value) {
    initBotStarts()
  }

  log.value = []
  losing_Coordinates.value = []

  playerStatus.value = 1
}
