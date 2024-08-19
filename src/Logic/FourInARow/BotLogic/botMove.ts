import { ref } from 'vue'
import { checkForTie, handleDropInAnimation, toggleButtons } from '../GameLogic/functions'
import { delay } from '../delay'
import { botValue, playerTurn } from '../GameLogic/variables'
import { resetChoices } from './BotInit'
import { placePiece } from '../GameLogic/placePieceOnBoard'
import { logMove } from '../GameLogic/logMove'
import { incrementPieces, pieces } from '../GameLogic/pieces'
import { checkWinner } from '../GameLogic/checkWinner'

export const botCalculating = ref<boolean>(false)

export const botMove = async (board: number[][], row: number, slot: number) => {
  toggleButtons(true)

  //console.log('botMove')

  botCalculating.value = true
  await delay(1200) // simulating the bot thinking
  botCalculating.value = false

  await executePlacement(board, row, slot, botValue)

  playerTurn.value = true

  resetChoices()

  return [row, slot]
}

export const executePlacement = async (
  board: number[][],
  row: number,
  slot: number,
  playerValue: number
) => {
  //console.log('executePlacement', row, slot, playerValue)

  placePiece(board, row, slot, playerValue)
  logMove([row, slot])

  incrementPieces()

  await handleDropInAnimation(row, slot)

  toggleButtons(false)

  checkWinner(true)
  checkForTie(pieces.value)
}
