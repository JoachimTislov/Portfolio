import { botValue, losing_Coordinates, playerStatus } from "../../GameLogic/variables"
import { botMove } from "../botMove"

const place_Piece = async (entry: {
  coordinates: number[]
  player_identifier: number
  piece_count: string
}, board: number[][]) => {
  const [x, y] = entry.coordinates
  losing_Coordinates.value = losing_Coordinates.value.filter(
    (e: { coordinates: number[]; player_identifier: number; piece_count: string }) => e !== entry
  )
  return await botMove(board, x, y)
}

const checkCoordinatesStatus = async (board: number[][], piece_count: string, participant: number) => {
  for (const entry of losing_Coordinates.value) {
    const [x, y] = entry.coordinates
    const pieceValueUnderLosingCoordinate = board[x][y - 1]
    if (
      entry.player_identifier === participant &&
      entry.piece_count === piece_count &&
      board[x][y] == 0 &&
      pieceValueUnderLosingCoordinate != 0
    ) {
      console.log(`Losing move, ${piece_count}, player value: `, participant, entry.piece_count)
      return await place_Piece(entry, board)
    }
  }
  return false
}

export const handleLosingChoices = async (board: number[][]) => {
 
  for (const piece_count of ['Two', 'Three']) {
    for (const value of [botValue.value, playerStatus.value]) {
      const result = await checkCoordinatesStatus(board,piece_count, value)
      if (result != false) return result
    }
  }

  if (losing_Coordinates.value.length > 0) {
    for (const entry of losing_Coordinates.value) {
      const [x, y] = entry.coordinates
      const pieceValueUnderLosingCoordinate = board[x][y - 1]
      console.log('accepting loss')
      if (pieceValueUnderLosingCoordinate != 0 && board[x][y] == 0) {
        return await place_Piece(entry, board)
      }
    }
  }
}