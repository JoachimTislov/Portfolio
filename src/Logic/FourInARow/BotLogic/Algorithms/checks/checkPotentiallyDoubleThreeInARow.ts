import type { _pattern } from "../../../Types"
import { arraysEqual } from "../../ArrayLogic"
import { potentially_three_in_a_row_patterns } from "../../PatternLogic"
import { checkCoordinatesLimit } from "./checkCoordinatesLimit"

export const checkPotentiallyDoubleThreeInARow = (
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
  pattern: (string | number)[],
  participant: number,
  all_coordinates: number[][]
) => {
  const checkIfSpotIsNotOccupiedOnBoard = (board: number[][], coords: number[]) => {
    const [x, y] = coords
    return board[x][y] == 0 
  }

  const checkPattern = (arr: { pattern: _pattern; coords: number[][] }) => {
   
    if (arraysEqual(arr.pattern, pattern)) {

      if (checkCoordinatesLimit(arr.coords[0]) && checkIfSpotIsNotOccupiedOnBoard(board, arr.coords[0])) {
        return { success: true, coords: arr.coords[1] }
      }

    } else if (arraysEqual(['*', participant, participant, '*'], pattern) || arraysEqual([0, participant, participant, 0], pattern)) {
      
      if (checkCoordinatesLimit(coords.first) && checkIfSpotIsNotOccupiedOnBoard(board, coords.first)) {
        return { success: true, coords: all_coordinates[0] }
      }

      if(checkCoordinatesLimit(coords.last) && checkIfSpotIsNotOccupiedOnBoard(board, coords.last)) {
        return { success: true, coords: all_coordinates[3] }
      }
    }

    return false
  }

  const arr = potentially_three_in_a_row_patterns(participant, coords, all_coordinates)

  for (const entry of arr) {
    const result = checkPattern(entry)
    if (result !== false) {
      return result
    }
  }

  return false
}