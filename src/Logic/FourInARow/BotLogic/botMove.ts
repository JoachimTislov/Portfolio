import { ref } from 'vue'
import { delay } from '../delay'
import { botValue, playerTurn } from '../GameLogic/variables'
import { resetChoices } from './BotInit'
import { executePlacement } from '../GameLogic/executePlacement'
import { toggleButtons } from '../GameLogic/functions'

export const botCalculating = ref<boolean>(false)

export const botMove = async (board: number[][], row: number, slot: number) => {
  toggleButtons(true)

  botCalculating.value = true
  await delay(1200) // simulating the bot thinking
  botCalculating.value = false

  await executePlacement(board, row, slot, botValue)

  playerTurn.value = true

  resetChoices()

  return [row, slot]
}
