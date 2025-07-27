import { resetChoices } from '../BotLogic/BotInit'

import { delay } from '../delay'
import { executePlacement } from './executePlacement'
import { decrementPieces, incrementPieces } from './pieces'

import {
  board,
  boardHeight,
  boardWidth,
  botValue,
  droppingPiece,
  starting_player,
  GameOver,
  log,
  winnerMsg
} from './variables'

export function toggleButtons(bool: boolean) {
  droppingPiece.value = bool
}

export const handleDropInAnimation = async (colIndex: number, rowIndex: number) => {
  const specific_slot = document.querySelector('.slot' + colIndex + '-' + rowIndex)
  if (specific_slot != null) {
    specific_slot.classList.add('drop-in')

    await delay(1000)

    specific_slot.classList.remove('drop-in')
  }
}

const remove_last_move = () => {
  const last_move = log.value.past.pop()
  if (last_move) {
    log.value.future.push(last_move)

    const [x, y] = last_move.coords
    board[x][y] = 0
    decrementPieces()
  } else {
    alert('There are not any moves played')
  }
}

export const previousMove = () => {
  //console.log('Previous', GameOver.value, playerTurn.value)
  if (log.value.past.length > 1) {
    for (let i = 0; i < 2; i++) {
      remove_last_move()
    }
  }
  resetChoices()
}

const add_last_move = () => {
  const last_move = log.value.future.pop()

  if (last_move) {
    log.value.past.push(last_move)

    const [x, y] = last_move.coords
    board[x][y] = last_move.participant
    incrementPieces()
  }
}

export const nextMove = () => {
  if (log.value.future.length > 1) {
    for (let i = 0; i < 2; i++) {
      add_last_move()
    }
  }
  resetChoices()
}

export const initBotStarts = async () => {
  if (starting_player.value === 'bot') {
    const randomNumber = Math.round(Math.random() * (boardWidth.value - 1))
    await executePlacement(board, randomNumber, 0, botValue)
  }
}

export const getSlotColor = (value: number) => {
  const colors = ['white', 'red', 'black', 'green']
  return colors[value]
}

export const getNameOfSlot = (colIndex: number, rowIndex: number) => {
  return 'slot' + colIndex + '-' + rowIndex
}

export const checkForTie = (pieces: number) => {
  if (pieces == boardWidth.value * boardHeight.value) {
    winnerMsg.value = 'It was a tie'
    GameOver.value = true
  }
}
