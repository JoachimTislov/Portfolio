import { ref, watch, reactive } from 'vue'

import type { Log, Losing_Coordinates, possible_Choices } from '../Types'

export const name = ref<string>('')

export const droppingPiece = ref<boolean>(false)

export const piecesInARow = 4
export const officialOffset = piecesInARow - 1

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const defaultChoices: possible_Choices = {
  prime_double_Three_in_a_row: [],
  non_prime_double_Three_in_a_row: [],
  two_sided_three_in_a_row: [],
  Two_in_a_row: [],
  One_in_a_row: []
  //Two_in_a_row: [[], [], [], [], [], []]
}

export const botChoices = ref<possible_Choices>(deepClone(defaultChoices))

export const playerChoices = ref<possible_Choices>(deepClone(defaultChoices))

export const botValue: number = 2
export const playerValue: number = 1

const storedWinnerMsg = localStorage.getItem('winnerMsg')
export const winnerMsg = ref<string>(storedWinnerMsg ? JSON.parse(storedWinnerMsg) : '')
watch(
  winnerMsg,
  (newWinnerMsg) => {
    localStorage.setItem('winnerMsg', JSON.stringify(newWinnerMsg))
  },
  { deep: true }
)

const storedGameOver = localStorage.getItem('GameOver')
export const GameOver = ref<boolean>(storedGameOver ? JSON.parse(storedGameOver) : false)
watch(
  GameOver,
  (newGameOver) => {
    localStorage.setItem('GameOver', JSON.stringify(newGameOver))
  },
  { deep: true }
)

export const boardWidth = ref<number>(7)
export const boardHeight = ref<number>(6)
const storedBoard = localStorage.getItem('board')
/*export const board = reactive([
  [1, 1, 2, 1, 2, 1],
  [0, 0, 0, 0, 0, 0],
  [2, 2, 1, 2, 1, 0],
  [1, 2, 1, 1, 1, 2],
  [2, 1, 1, 2, 1, 2],
  [2, 2, 1, 0, 0, 0],
  [2, 0, 0, 0, 0, 0]
])*/
export const board = reactive(
  storedBoard
    ? JSON.parse(storedBoard)
    : Array(boardWidth.value)
        .fill(0)
        .map(() => Array(boardHeight.value).fill(0))
)
watch(
  board,
  (newBoard) => {
    localStorage.setItem('board', JSON.stringify(newBoard))
  },
  { deep: true }
)

const storedLosing_Coordinates = localStorage.getItem('losing_Coordinates')
export const losing_Coordinates = ref<Losing_Coordinates>(
  storedLosing_Coordinates ? JSON.parse(storedLosing_Coordinates) : {}
)
watch(
  losing_Coordinates,
  (newLosing_Coordinates) => {
    localStorage.setItem('losing_Coordinates', JSON.stringify(newLosing_Coordinates))
  },
  { deep: true }
)

const storedStarting_player = localStorage.getItem('starting_player')
export const starting_player = ref<string>(
  storedStarting_player ? JSON.parse(storedStarting_player) : 'player'
)
watch(
  starting_player,
  (newStarting_player) => {
    localStorage.setItem('starting_player', JSON.stringify(newStarting_player))
  },
  { deep: true }
)

const storedLog = localStorage.getItem('log')
export const log = ref<Log>(
  storedLog
    ? JSON.parse(storedLog)
    : {
        past: [],
        future: []
      }
)
watch(
  log,
  (newLog) => {
    localStorage.setItem('log', JSON.stringify(newLog))
  },
  { deep: true }
)

const storedPlayerTurn = localStorage.getItem('playerTurn')
export const playerTurn = ref<boolean>(storedPlayerTurn ? JSON.parse(storedPlayerTurn) : true)
watch(
  playerTurn,
  (newPlayerTurn) => {
    localStorage.setItem('playerTurn', JSON.stringify(newPlayerTurn))
  },
  { deep: true }
)
