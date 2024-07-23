import { resetChoices } from '../BotLogic/Bot'

import { delay } from '../delay'

import { board, boardHeight, boardWidth, botGame, botValue, first_player, gameMode, 
  GameOver, isPreviousDisabled, isRestartDisabled, log, losing_Coordinates, playerStatus, ShowBoard, ShowWinner, winnerMsg } from './variables'

export const handleDropInAnimation = async (colIndex: number, rowIndex: number) => {
  const specific_slot = document.querySelector('.slot' + colIndex + '-' + rowIndex)
  if (specific_slot != null) {
    specific_slot.classList.add('drop-in')

    await delay(1000)
   
    specific_slot.classList.remove('drop-in')
  }
}

const number = botGame.value ? 1 : 0
export const alterPreviousButton = (pieces: number) => {
  if(pieces > number && !GameOver.value) {
    console.log('P not D')
    isPreviousDisabled.value = false
  } else {
    console.log('P, D')
    isPreviousDisabled.value = true
  }

  console.log('P: ', number, pieces, botGame.value)
}

export const alterRestartButton = (pieces: number) => {
  if (pieces > number || ShowWinner.value) {
    console.log('R not D')
    isRestartDisabled.value = false
  } else {
    console.log('R D')
    isRestartDisabled.value = true
  }

  console.log('R: ', number, pieces , botGame.value)
}

export const previousMove = (pieces: number, decrementPieces: () => void) => {
  const remove_last_move = () => {
    const [x, y]: number[] = log.value.pop() ?? [-1, 0]
    if (x != -1) {
      board[x][y] = 0
      decrementPieces()
      pieces--
    }

    alterRestartButton(pieces)
    alterPreviousButton(pieces)
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

export const initBotStarts = (assignInt: (int: number) => void) => {
  if (first_player.value === 'bot') {
    assignInt(1)
    board[3][0] = botValue
  }
}

export const initTwoPlayer = () => {
  initBaseGame()
  botGame.value = false
  gameMode.value = 'Player vs Player'
}

export const initBotGame = (assignInt: (int: number) => void) => {
  initBaseGame()
  botGame.value = true
  gameMode.value = 'Player vs Bot'

  initBotStarts(assignInt)
}

export const initBaseGame = () => {
  playerStatus.value = 1
  ShowWinner.value = false
}

export const getSlotColor = (value: number) => {
  const colors = ['white', 'red', 'blue', 'black', 'green']
  return colors[value]
}

export const getNameOfSlot = (colIndex: number, rowIndex: number) => {
  return 'slot' + colIndex + '-' + rowIndex
}

export const updatePlayerStatus = () => {
  playerStatus.value = playerStatus.value === 1 ? 2 : 1
}

export const checkForTie = (pieces: number) => {
  console.log(pieces)
  if(pieces == boardWidth.value * boardHeight.value) {
    ShowBoard.value = false
    winnerMsg.value = 'It was a tie'
    ShowWinner.value = true
  }
}