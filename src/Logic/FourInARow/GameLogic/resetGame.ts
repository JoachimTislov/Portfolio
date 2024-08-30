import { resetChoices } from '../BotLogic/BotInit'
import { initBotStarts } from './functions'
import { assignPiecesWithInt } from './pieces'
import { board, GameOver, log, playerTurn } from './variables'

export const resetGame = () => {
  // resetting board
  board.forEach((row: number[]) => {
    row.fill(0) // Fill each row with 0
  })

  resetChoices()

  playerTurn.value = true
  GameOver.value = false

  assignPiecesWithInt(0)

  initBotStarts()

  log.value = { past: [], future: [] }
}
