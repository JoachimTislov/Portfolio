import { checkForLoop } from '../BotLogic/Algorithms/checks/checkForLoop'
import { resetChoices } from '../BotLogic/BotInit'
import { startBotVBot } from '../BotLogic/startBotVBot'

import { delay } from '../delay'
import { decrementPieces } from './pieces'
import { resetGame } from './resetGame'

import { board, boardHeight, boardWidth, botGame, botValue, botVBot, droppingPiece, gameMode, 
  GameOver, log, losing_Coordinates, nonStopTesting, playerStatus, playerTurn, ShowBoard, ShowWinner, Stop, waitingTime, winnerMsg } from './variables'

export function toggleButtons(bool: boolean) {
    droppingPiece.value = bool
}

export const handleDropInAnimation = async (colIndex: number, rowIndex: number) => {
  const specific_slot = document.querySelector('.slot' + colIndex + '-' + rowIndex)
  if (specific_slot != null) {
    specific_slot.classList.add('drop-in')

    const animationTime = botVBot.value ? waitingTime.value/2 : 1000
    await delay(animationTime)
   
    specific_slot.classList.remove('drop-in')
  }
}

export async function handleGameModeSwitch() {
  botVBot.value = false
  Stop.value = true

  switch(gameMode.value) {
    case 'Player vs Player':
          botGame.value = false
      break
    case 'Player vs Bot':
          botValue.value = 3
          botGame.value = true
      break
    case 'Bot vs Bot':
          botGame.value = true
          botVBot.value = true
      break
  }
}

export function getNumber() {
  return botGame.value ? 1 : 0
}

export const previousMove = () => {
  const remove_last_move = () => {
    const [x, y]: number[] = log.value.pop() ?? [-1, 0]
    if (x != -1) {
      board[x][y] = 0
      decrementPieces();
    }
  }

  GameOver.value = false
  losing_Coordinates.value = []

  if (!botGame.value || (ShowWinner.value && log.value.length % 2 !== 0)) {
    remove_last_move()
  } else {
    if (log.value.length % 2 === 0 && log.value.length >= 2) {
      for (let i = 0; i < 2; i++) {
        remove_last_move()
      }
    }
  }
  if (ShowWinner.value) {
    ShowWinner.value = !ShowWinner.value
  }

  if (!botGame.value) {
    updatePlayerStatus()
  } else {
    resetChoices()
  }
}

export const getSlotColor = (value: number) => {
  const colors = ['white', 'red', 'blue', 'black', 'green', 'blue']
  return colors[value]
}

export const getNameOfSlot = (colIndex: number, rowIndex: number) => {
  return 'slot' + colIndex + '-' + rowIndex
}

export const updatePlayerStatus = () => {
  playerStatus.value = playerStatus.value === 1 ? 2 : 1
}

export const checkForTie = async (pieces: number) => {
  if(!GameOver.value && pieces == boardWidth.value * boardHeight.value) {
    console.log("Checked for tie")


    ShowBoard.value = botVBot.value ? true : false
    winnerMsg.value = 'It was a tie'
    ShowWinner.value = true

    if(botVBot.value) {
      await checkForLoop()
    }
  }
}