import { ref, watch, reactive } from "vue"

import type { _losingCoordinates, possible_Choices, possible_Coordinates } from '../Types'

export const droppingPiece = ref<boolean>(false)

export const piecesInARow = 4
export const officialOffset = piecesInARow - 1 

export const remainingChoices = ref<possible_Coordinates[]>([])

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
}

export const defaultChoices = {
  double_Three_in_a_row: [],
  potentially_double_Three_in_a_row: [],
  Two_in_a_row: [ [],[],[],[],[],[] ]
}

export const botChoices = ref<possible_Choices>(deepClone(defaultChoices))

export const playerChoices = ref<possible_Choices>(deepClone(defaultChoices))

export const botValue: number = 3

const storedWinnerMsg = localStorage.getItem('winnerMsg')
export const winnerMsg = ref<string>(storedWinnerMsg ? JSON.parse(storedWinnerMsg) : '')
watch(winnerMsg,(newWinnerMsg) => {localStorage.setItem('winnerMsg', JSON.stringify(newWinnerMsg))},{ deep: true })

const storedGameOver = localStorage.getItem('GameOver')
export const GameOver = ref<boolean>(storedGameOver ? JSON.parse(storedGameOver) : false)
watch(GameOver,(newGameOver) => {localStorage.setItem('GameOver', JSON.stringify(newGameOver))},{ deep: true })

export const boardWidth = ref(7); export const boardHeight = ref(6)
const storedBoard = localStorage.getItem('board')
/*export const board = reactive(storedBoard ? JSON.parse(storedBoard) : Array(boardWidth.value).fill(0).map(() => Array(boardHeight.value).fill(0)))

export const board = reactive(
  [
    [3, 1, 1, 3, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 3, 1, 1, 1],
    [3, 3, 3, 1, 3, 3],
    [3, 3, 1, 3, 1, 3],
    [0, 0, 0, 0, 0, 0]
  ]
)*/

watch(board,(newBoard) => {localStorage.setItem('board', JSON.stringify(newBoard))},{ deep: true })

const storedLosing_Coordinates = localStorage.getItem('losing_Coordinates')
export const losing_Coordinates = ref<_losingCoordinates>(storedLosing_Coordinates ? JSON.parse(storedLosing_Coordinates) : [])
watch(losing_Coordinates,(newLosing_Coordinates) => {localStorage.setItem('losing_Coordinates', JSON.stringify(newLosing_Coordinates))},{ deep: true })

const storedShowBoard = localStorage.getItem('ShowBoard')
export const ShowBoard = ref<boolean>(storedShowBoard ? JSON.parse(storedShowBoard) : true)
watch(ShowBoard, (newShowBoard) => {localStorage.setItem('ShowBoard', JSON.stringify(newShowBoard))}, {deep: true})

const storedShowWinner = localStorage.getItem('ShowWinner')
export const ShowWinner = ref<boolean>(storedShowWinner ? JSON.parse(storedShowWinner) : false)
watch(ShowWinner, (newShowWinner) => {localStorage.setItem('ShowWinner', JSON.stringify(newShowWinner))}, {deep: true })

const storedBotGame = localStorage.getItem('botGame')
export const botGame = ref<boolean>(storedBotGame ? JSON.parse(storedBotGame) : true)
watch(botGame, (newBotGame) => {localStorage.setItem('botGame', JSON.stringify(newBotGame))}, {deep: true })

export const gameMode = ref<string>(botGame.value ? 'Player vs Bot' : 'Player vs Player')

const storedFirst_player = localStorage.getItem('first_player')
export const first_player = ref<string>(storedFirst_player ? JSON.parse(storedFirst_player): 'Player 1')
watch(first_player,(newFirst_player) => {localStorage.setItem('first_player', JSON.stringify(newFirst_player))},{ deep: true })

const storedLog = localStorage.getItem('log')
export const log = ref<number[][]>(storedLog ? JSON.parse(storedLog) : [])
watch(log,(newLog) => {localStorage.setItem('log', JSON.stringify(newLog))},{ deep: true })

const storedPlayerStatus = localStorage.getItem('playerStatus')
export const playerStatus = ref<number>(storedPlayerStatus ? JSON.parse(storedPlayerStatus) : 1)
watch(playerStatus,(newPlayerStatus) => {localStorage.setItem('playerStatus', JSON.stringify(newPlayerStatus))},{ deep: true })

const storedPlayerTurn = localStorage.getItem('playerTurn')
export const playerTurn = ref<boolean>(storedPlayerTurn ?  JSON.parse(storedPlayerTurn) : true)
watch(playerTurn,(newPlayerTurn) => {localStorage.setItem('playerTurn', JSON.stringify(newPlayerTurn))},{ deep: true })
