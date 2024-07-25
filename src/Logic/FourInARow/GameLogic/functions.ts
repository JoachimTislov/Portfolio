import { resetChoices } from '../BotLogic/BotInit'

import { delay } from '../delay'
import { checkWinner } from './checkWinner'
import { logMove } from './logMove'
import { assignPiecesWithInt, decrementPieces, incrementPieces, pieces } from './pieces'
import { placePiece } from './placePieceOnBoard'

import { board, boardHeight, boardWidth, botGame, botValue, droppingPiece, first_player, gameMode, 
  GameOver, log, losing_Coordinates, playerStatus, ShowBoard, ShowWinner, winnerMsg } from './variables'

export const executePlacement = async (row: number, slot: number, playerValue: number) => {
  placePiece(board, row, slot, playerValue)
  logMove([row, slot])

  incrementPieces()

  await handleDropInAnimation(row, slot)

  toggleButtons(false)
  
  checkWinner(true)
  checkForTie(pieces.value)
} 

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

export const initBotStarts = () => {
  if (first_player.value === 'bot') {
    assignPiecesWithInt(1)
    placePiece(board, 3, 0, botValue)
  }
}

export const initTwoPlayer = () => {
  initBaseGame()
  botGame.value = false
  gameMode.value = 'Player vs Player'
}

export const initBotGame = () => {
  initBaseGame()
  botGame.value = true
  gameMode.value = 'Player vs Bot'

  initBotStarts()
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
  if(pieces == boardWidth.value * boardHeight.value) {
    ShowBoard.value = false
    winnerMsg.value = 'It was a tie'
    ShowWinner.value = true
  }
}