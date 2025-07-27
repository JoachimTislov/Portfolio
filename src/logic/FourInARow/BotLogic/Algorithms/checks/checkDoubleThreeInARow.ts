import type { _pattern, spotInfo } from '@/logic/FourInARow/Types'
import { arraysEqual } from '../../ArrayLogic'
import { double_three_in_a_row_patterns } from '../../PatternLogic'
import { checkCoordinatesLimit } from './checkCoordinatesLimit'

const checkIfSpotIsNotOccupiedOnBoard = (board: number[][], coords: number[]) => {
  const [x, y] = coords
  return board[x][y] == 0 && (y == 0 || (y > 0 && board[x][y - 1] != 0))
}

const checkPattern = (
  arr: spotInfo,
  pattern: _pattern,
  zeroIndex: number,
  participant: number,
  all_coordinates: number[][],
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  }
) => {
  if (
    checkCoordinatesLimit(arr.coords[0]) &&
    checkIfSpotIsNotOccupiedOnBoard(board, arr.coords[0]) &&
    arraysEqual(arr.pattern, pattern)
  ) {
    return { success: true, coords: arr.coords[1] }
  } else if (
    arraysEqual([0, participant, participant, 0], pattern) &&
    ((zeroIndex == 3 &&
      checkCoordinatesLimit(coords.last) &&
      checkIfSpotIsNotOccupiedOnBoard(board, coords.last)) ||
      (zeroIndex == 0 &&
        checkCoordinatesLimit(coords.first) &&
        checkIfSpotIsNotOccupiedOnBoard(board, coords.first)))
  ) {
    return { success: true, coords: all_coordinates[zeroIndex] }
  }

  return false
}

export const checkDoubleThreeInARow = (
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
  pattern: (string | number)[],
  participant: number,
  all_coordinates: number[][],
  zeroIndex: number
) => {
  const arr = double_three_in_a_row_patterns(participant, coords, all_coordinates)

  for (const entry of arr) {
    const result = checkPattern(
      entry,
      pattern,
      zeroIndex,
      participant,
      all_coordinates,
      board,
      coords
    )

    if (result !== false) {
      return result
    }
  }

  return false
}
