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
    const status = losing_Coordinates.value[key].status
    if (
      status?.highest_piece_count == piece_count &&
      status?.participant == participant &&
      board[x][y] == 0 &&
      pieceValueUnderLosingCoordinate != 0 &&
      losing_Coordinates.value[key].status?.count == 1
    ) {
      //console.log('Played losing', participant, losing_Coordinates.value[key])
      delete losing_Coordinates.value[key]
      return await botMove(board, x, y)
    }
  }
  return false
}

export const handleLosingChoices = async (board: number[][]) => {
  // console.log('handling losing choices')
  for (const participant of [botValue, playerValue]) {
    const result = await checkCoordinatesStatus(board, 'Two', participant)
    if (result != false) return result
  }

  for (const participant of [botValue, playerValue]) {
    const result = await checkCoordinatesStatus(board, 'Three', participant)
    if (result != false) return result
  }
}
