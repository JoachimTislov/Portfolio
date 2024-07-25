import { ref } from "vue"
import { executePlacement, toggleButtons } from "../GameLogic/functions"
import { delay } from "../delay"
import { botValue, playerTurn } from "../GameLogic/variables"
import { resetChoices } from "./BotInit"

export const botCalculating = ref<boolean>(false)

export const botMove = async (board: number[][], row: number, slot: number) => {
  
  toggleButtons(true)

  botCalculating.value = true
  await delay(1500) // simulating the bot thinking
  botCalculating.value = false

  await executePlacement(row, slot, botValue)
  
  playerTurn.value = true

  resetChoices()

  return [row, slot]
}