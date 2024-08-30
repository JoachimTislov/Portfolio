import { botValue, losing_Coordinates, playerValue } from '../../GameLogic/variables'
import { botMove } from '../botMove'

const checkCoordinatesStatus = async (
  board: number[][],
  piece_count: string,
  participant: number
) => {
  for (const key of Object.keys(losing_Coordinates.value)) {
    const [x, y] = JSON.parse(key)
    const pieceValueUnderLosingCoordinate = board[x][y - 1]
    if (
      board[x][y] == 0 &&
      pieceValueUnderLosingCoordinate != 0 &&
      losing_Coordinates.value[key][participant][piece_count]
    ) {
      delete losing_Coordinates.value[key]
      return await botMove(board, x, y)
    }
  }
  return false
}

export const handleLosingChoices = async (board: number[][]) => {
  // console.log('handling losing choices')

  for (const piece_count of ['Two', 'Three']) {
    for (const value of [botValue, playerValue]) {
      const result = await checkCoordinatesStatus(board, piece_count, value)
      if (result != false) return result
    }
  }

  /*if (losing_Coordinates.value.length > 0) {
    for (const entry of losing_Coordinates.value) {
      const [x, y] = entry.coordinates
      const pieceValueUnderLosingCoordinate = board[x][y - 1]
      if (pieceValueUnderLosingCoordinate != 0 && board[x][y] == 0) {
        return await place_Piece(entry, board)
      }
    }
  }*/
}
