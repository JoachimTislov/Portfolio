import { initiateAlgorithms, resetChoices } from '../AI'

import { delay } from '../delay'
import { usePiecesStore } from '../stores/counter'

import { board, boardHeight, boardWidth, botGame, botValue, first_player, gameMode, 
  GameOver, log, losing_Coordinates, playerStatus, playerTurn, ShowBoard, ShowWinner, winnerMsg } from './variables'

export const handleDropInAnimation = async (specific_slot: Element | null) => {
  if (specific_slot != null) {
    specific_slot.classList.add('drop-in')

    await delay(1000)
   
    specific_slot.classList.remove('drop-in')
  }
}

export const dropPiece = async (index: number) => {
  if(!GameOver.value) {
    if(playerTurn.value && botGame.value || !botGame.value) {
      for (let i = 0; i < 7; i++) {
        if (board[index][i] === 0) {
          incrementPiecesAndCheckForTie()

          const specific_slot = document.querySelector('.slot' + index + '-' + i)
          handleDropInAnimation(specific_slot)

          playerTurn.value = false
          board[index][i] = playerStatus.value
          log.value.push([index, i])
          checkWinner(true)

          if (botGame.value && !ShowWinner.value) {
            alterPreviousButton(1)
            await initiateAlgorithms(board)
          }

          if (!botGame.value) {
            alterPreviousButton(0)
            updatePlayerStatus()
          }
          break
        }
      }
    }
  }
}

export const alterPreviousButton = (int: number) => {
  const previousButton: any = document.getElementById('previousButton')

  const { pieces } = usePiecesStore()

  if (previousButton != undefined) {
    if (pieces > int && !GameOver.value) {
      previousButton.disabled = false
    } else {
      previousButton.disabled = true
    }
  } else {
    console.log('Could not find the previous button')
  }
}

export const previousMove = () => {
  const { pieces, decrementPieces } = usePiecesStore()

  const remove_last_move = () => {
    const [x, y]: number[] = log.value.pop() ?? [-1, 0]
    if (x != -1) {
      board[x][y] = 0
      decrementPieces()
    }

    const previousButton: any = document.getElementById('previousButton')
    if(first_player.value == 'bot' && pieces == 1) previousButton.disabled = true
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

const initBotStarts = () => {
  const { setPiecesToNumber } = usePiecesStore()
  if (first_player.value === 'bot') {
    setPiecesToNumber(1)
    board[3][0] = botValue
  }
}

export const initTwoPlayer = () => {
  initBaseGame()
  botGame.value = false
  gameMode.value = 'Player vs Player'

  resetGame()
}

export const initBotGame = () => {
  initBaseGame()
  botGame.value = true
  gameMode.value = 'Player vs Bot'

  resetGame()
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

const toggleRestartButton = (bool: boolean) => {
  /*const restart: any = document.getElementById('restartButton')
  if(restart != undefined && ((pieces == 0 && (!botGame.value || botGame.value && first_player.value === 'Player 1') || pieces == 1 && botGame.value && first_player.value === 'bot') || ShowWinner.value)) {
      restart.disabled = true
  } else {
    console.log(botGame.value, pieces, first_player.value)
      restart.disabled = false
  }*/

  const restart: any = document.getElementById('restartButton')
  if (restart != undefined) restart.disabled = bool
}

export const resetGame = () => {
  const { pieces, setPiecesToNumber } = usePiecesStore()
  // resetting board
  board.forEach((row: number[]) => {
    row.fill(0) // Fill each row with 0
  })

  alterPreviousButton(pieces)

  resetChoices()

  ShowBoard.value = true
  playerTurn.value = true

  GameOver.value = false
  ShowWinner.value = false
  
  setPiecesToNumber(0)

  toggleRestartButton(true)

  log.value = []
  losing_Coordinates.value = []

  playerStatus.value = 1

  if(botGame.value) {
    initBotStarts()
  }
}

const updatePlayerStatus = () => {
  playerStatus.value = playerStatus.value === 1 ? 2 : 1
}

export const incrementPiecesAndCheckForTie = () => {
  const { pieces, incrementPieces } = usePiecesStore()

  incrementPieces()

  if(pieces == boardWidth.value * boardHeight.value) {
    ShowBoard.value = false
    winnerMsg.value = 'It was a tie'
    ShowWinner.value = true
  }
}

export const checkWinner = (boolCheck: boolean) => {
  //check vertical
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 4; i++) {
      const values = [board[j][i], board[j][i + 1], board[j][i + 2], board[j][i + 3]]

      const coords = [[j,i],[j,i + 1], [j,i + 2], [j,i + 3]]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  // check horizontal
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 6; i++) {
      const values = [board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i]]

      const coords = [[j,i],[j + 1,i], [j + 2,i], [j + 3,i]]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  //cross check, from right
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      const values = [board[j][i], board[j + 1][i + 1], board[j + 2][i + 2], board[j + 3][i + 3]]

      const coords = [[j,i],[j + 1,i + 1], [j + 2,i + 2], [j + 3,i + 3]]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  //cross check, from right
  for (let j = 6; j > 2; j--) {
    for (let i = 0; i < 3; i++) {
      const values = [board[j][i], board[j - 1][i + 1], board[j - 2][i + 2], board[j - 3][i + 3]]

      const coords = [[j,i],[j - 1,i + 1], [j - 2,i + 2], [j - 3,i + 3]]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }
}
const loopThroughValues = (coordinates: number[][], values: number[], boolCheck: boolean) => {
  const participants: number[] = [playerStatus.value, botValue]

  for (let i = 0; i < 2; i++) {
    if (
      values[0] == participants[i] &&
      values[1] == participants[i] &&
      values[2] == participants[i] &&
      values[3] == participants[i]
    ) {
      if (boolCheck) {

        for (const coords of coordinates) {
          const [x,y] = coords
          board[x][y] = 4
        }

        return determineWinner(participants[i])
      } else {
        return true
      }
    }
  }
  return false
}
const determineWinner = (value: number) => {
  ShowWinner.value = true
  GameOver.value = true
  if (value == botValue) {
    winnerMsg.value = 'The bot won'
  } else if(!botGame.value) {
    const color = getSlotColor(playerStatus.value)

    winnerMsg.value = `${color} won`
  } else {
    winnerMsg.value = `Player ${playerStatus.value} won`
  }
  return true
}

