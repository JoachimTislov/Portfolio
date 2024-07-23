import { botValue, losing_Coordinates, playerStatus } from "../../GameLogic/variables"
import { botMove } from "../Bot"

export const handleLosingChoices = async (board: number[][]) => {
  const place_Piece = async (entry: {
    coordinates: number[]
    player_identifier: number
    piece_count: string
  }) => {
    const h = entry.coordinates
    losing_Coordinates.value = losing_Coordinates.value.filter(
      (e: { coordinates: number[]; player_identifier: number; piece_count: string }) => e !== entry
    )
    return await botMove(board, h[0], h[1])
  }

  const checkCoordinatesStatus = (piece_count: string, participant: number) => {
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
        return place_Piece(entry)
      }
    }
    return false
  }

  for (const piece_count of ['Two', 'Three']) {
    for (const value of [botValue, playerStatus.value]) {
      const result = checkCoordinatesStatus(piece_count, value)
      if (result != false) return result
    }
  }

  if (losing_Coordinates.value.length > 0) {
    for (const entry of losing_Coordinates.value) {
      const [x, y] = entry.coordinates
      const pieceValueUnderLosingCoordinate = board[x][y - 1]
      console.log('accepting loss')
      if (pieceValueUnderLosingCoordinate != 0 && board[x][y] == 0) {
        return place_Piece(entry)
      }
    }
  }
}