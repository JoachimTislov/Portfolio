import { ref } from "vue"
import { checkForTie, handleDropInAnimation, toggleButtons } from "../GameLogic/functions"
import { delay } from "../delay"
import { botValue, botVBot, playerTurn, waitingTime } from "../GameLogic/variables"
import { resetChoices } from "./BotInit"
import { placePiece } from "../GameLogic/placePieceOnBoard"
import { logMove } from "../GameLogic/logMove"
import { incrementPieces, pieces } from "../GameLogic/pieces"
import { checkWinner } from "../GameLogic/checkWinner"

export const botCalculating = ref<boolean>(false)

export const botMove = async (board: number[][], row: number, slot: number) => {

  const botThinkingTime = botVBot.value ? waitingTime.value/2 : 1200

  toggleButtons(true)

  botCalculating.value = true
  await delay(botThinkingTime) // simulating the bot thinking
  botCalculating.value = false

  await executePlacement(board, row, slot, botValue.value)

  if (!botVBot.value) playerTurn.value = true

  resetChoices()

  return [row, slot]
}

export const executePlacement = async (board: number[][], row: number, slot: number, participant: number) => {
  
  placePiece(board, row, slot, participant)
  logMove([row, slot], participant)

  incrementPieces()

  await handleDropInAnimation(row, slot)

  toggleButtons(false)
  
  await checkWinner()
  await checkForTie(pieces.value)
} 