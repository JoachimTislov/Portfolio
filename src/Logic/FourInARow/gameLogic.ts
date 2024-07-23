import { ref, reactive, watch } from 'vue'

import { initiateAlgorithms, resetChoices } from './AI'

import type { _losingCoordinates, possible_Choices, possible_Coordinates } from './Types'
import { delay } from './delay'

export const piecesInARow = 4
export const officialOffset = piecesInARow - 1 

const storedShowMenu = localStorage.getItem('ShowMenu')
export const ShowMenu = ref<boolean>(storedShowMenu ? JSON.parse(storedShowMenu) : true)
watch(ShowMenu, (newShowMenu) => {localStorage.setItem('ShowMenu', JSON.stringify(newShowMenu))}, {deep: true})

const storedShowWinner = localStorage.getItem('ShowWinner')
export const ShowWinner = ref<boolean>(storedShowWinner ? JSON.parse(storedShowWinner) : false)
watch(ShowWinner, (newShowWinner) => {localStorage.setItem('ShowWinner', JSON.stringify(newShowWinner))}, {deep: true })

const storedBotGame = localStorage.getItem('botGame')
export const botGame = ref<boolean>(storedBotGame ? JSON.parse(storedBotGame) : true)
watch(botGame, (newBotGame) => {localStorage.setItem('botGame', JSON.stringify(newBotGame))}, {deep: true })

export const remainingChoices = ref<possible_Coordinates[]>([])

export const defaultGoldenMove = {
  pattern: [],
  coordinates: [],
  all_coordinates: [],
  direction: '',
  losing: { bool: false, bot_instances: [], player_instances: [] },
  participant: 0,
  piece_count: ''
}

export const goldenMove = ref<possible_Coordinates>(defaultGoldenMove) 

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
}

export const defaultChoices = {
  Three_in_a_row: [],
  double_Three_in_a_row: [],
  potentially_double_Three_in_a_row: [],
  Two_in_a_row: []
}

export const botChoices = ref<possible_Choices>(deepClone(defaultChoices))

export const playerChoices = ref<possible_Choices>(deepClone(defaultChoices))

const storedFirst_player = localStorage.getItem('first_player')
export const first_player = ref<string>(storedFirst_player ? JSON.parse(storedFirst_player): 'Player 1')
watch(first_player,(newFirst_player) => {localStorage.setItem('first_player', JSON.stringify(newFirst_player))},{ deep: true })

const storedLog = localStorage.getItem('log')
export const log = ref<number[][]>(storedLog ? JSON.parse(storedLog) : [])

watch(log,(newLog) => {localStorage.setItem('log', JSON.stringify(newLog))},{ deep: true })

export const botValue: number = 3

const storedPlayerStatus = localStorage.getItem('playerStatus')
export const playerStatus = ref<number>(storedPlayerStatus ? JSON.parse(storedPlayerStatus) : 1)
watch(playerStatus,(newPlayerStatus) => {localStorage.setItem('playerStatus', JSON.stringify(newPlayerStatus))},{ deep: true })

const storedPlayerTurn = localStorage.getItem('playerTurn')
export const playerTurn = ref<boolean>(storedPlayerTurn ?  JSON.parse(storedPlayerTurn) : true)
watch(
  playerTurn,
  (newPlayerTurn) => {
    localStorage.setItem('playerTurn', JSON.stringify(newPlayerTurn))
  },
  { deep: true }
)

const storedPieces = localStorage.getItem('pieces')
export const pieces = ref<number>(storedPieces ? JSON.parse(storedPieces) : 0)

watch(
  pieces,
  (pieces) => {
    localStorage.setItem('pieces', JSON.stringify(pieces))
  },
  { deep: true }
)

const storedWinnerMsg = localStorage.getItem('winnerMsg')
export const winnerMsg = ref<string>(storedWinnerMsg ? JSON.parse(storedWinnerMsg) : '')

watch(
  winnerMsg,
  (newWinnerMsg) => {
    localStorage.setItem('winnerMsg', JSON.stringify(newWinnerMsg))
  },
  { deep: true }
)

export const gameMode = ref<string>(botGame.value ? 'Player vs Bot' : 'Player vs Player')

const storedGameOver = localStorage.getItem('GameOver')
const GameOver = ref<boolean>(storedGameOver ? JSON.parse(storedGameOver) : false)

watch(
  GameOver,
  (newGameOver) => {
    localStorage.setItem('GameOver', JSON.stringify(newGameOver))
  },
  { deep: true }
)

const boardWidth = ref(7)
const boardHeight = ref(6)

const storedBoard = localStorage.getItem('board')
export const board = reactive(storedBoard ? JSON.parse(storedBoard) : Array(boardWidth.value).fill(0).map(() => Array(boardHeight.value).fill(0)))

watch(
  board,
  (newBoard) => {
    localStorage.setItem('board', JSON.stringify(newBoard))
  },
  { deep: true }
)

const storedLosing_Coordinates = localStorage.getItem('losing_Coordinates')
export const losing_Coordinates = ref<_losingCoordinates>(storedLosing_Coordinates ? JSON.parse(storedLosing_Coordinates) : [])

watch(
  losing_Coordinates,
  (newLosing_Coordinates) => {
    localStorage.setItem('losing_Coordinates', JSON.stringify(newLosing_Coordinates))
  },
  { deep: true }
)

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

  if (previousButton != undefined) {
    if (pieces.value > int && !GameOver.value) {
      previousButton.disabled = false
    } else {
      console.log('Disabled')
      previousButton.disabled = true
    }
  } else {
    console.log('Could not find the previous button')
  }
}

export const previousMove = () => {
  const remove_last_move = () => {
    const [x, y]: number[] = log.value.pop() ?? [-1, 0]
    if (x != -1) {
      board[x][y] = 0
      pieces.value--
    }

    const previousButton: any = document.getElementById('previousButton')
    if(first_player.value == 'bot' && pieces.value == 1) previousButton.disabled = true
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
  if (first_player.value === 'bot') {
    pieces.value = 1
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

export const resetGame = () => {
  // resetting board
  board.forEach((row: number[]) => {
    row.fill(0) // Fill each row with 0
  })

  alterPreviousButton(pieces.value)

  resetChoices()

  playerTurn.value = true
  GameOver.value = false
  ShowWinner.value = false
  pieces.value = 0
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
  pieces.value++
  if (pieces.value === 42) {
    resetGame()
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
