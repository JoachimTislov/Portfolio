import type { _pattern, spotInfo } from "../../../Types"
import { arraysEqual } from "../../ArrayLogic"
import { potentially_three_in_a_row_patterns } from "../../PatternLogic"
import { checkCoordinatesLimit } from "./checkCoordinatesLimit"

const checkIfSpotIsNotOccupiedOnBoard = (board: number[][], coords: number[]) => {
  const [x, y] = coords
  return board[x][y] == 0 
}

const checkPattern = (
  arr: spotInfo, 
  pattern: _pattern, 
  all_coordinates: number[][], 
  participant: number, 
  zeroOrAsteriskIndex: number,
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
) => {
  
  if (checkCoordinatesLimit(arr.coords[0]) && checkIfSpotIsNotOccupiedOnBoard(board, arr.coords[0]) && arraysEqual(arr.pattern, pattern)) {
  
      return { success: true, coords: arr.coords[1] }

    } else if (arraysEqual(['*', participant, participant, '*'], pattern) &&
      ((zeroOrAsteriskIndex == 3 && checkCoordinatesLimit(coords.last) && checkIfSpotIsNotOccupiedOnBoard(board, coords.last)) || 
      (zeroOrAsteriskIndex == 0 && checkCoordinatesLimit(coords.first) && checkIfSpotIsNotOccupiedOnBoard(board, coords.first)))) {

      return { success: true, coords: all_coordinates[zeroOrAsteriskIndex] }
    }

  return false
  
}


export const checkPotentiallyDoubleThreeInARow = (
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
  pattern: (string | number)[],
  participant: number,
  all_coordinates: number[][],
  zeroOrAsteriskIndex: number
) => {

  const arr = potentially_three_in_a_row_patterns(participant, coords, all_coordinates)
 
  for (const entry of arr) {
    const result = checkPattern(entry, pattern, all_coordinates, participant, zeroOrAsteriskIndex, board, coords)
    if (result !== false) {
      return result
    }
  }

  return false
}