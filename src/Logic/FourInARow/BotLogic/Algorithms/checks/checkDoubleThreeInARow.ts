import { arraysEqual } from "../../ArrayLogic"
import { double_three_in_a_row_patterns } from "../../PatternLogic"
import { checkCoordinatesLimit } from "./checkCoordinatesLimit"

export const checkDoubleThreeInARow = (
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
  pattern: (string | number)[],
  participant: number,
  all_coordinates: number[][]
) => {
  const checkIfSpotIsNotOccupiedOnBoard = (coords: number[]) => {
    const [x, y] = coords
    return (board[x][y] == 0 && y == 0)  ||  (board[x][y] == 0 && y > 0 && board[x][y-1] == 0)
  }

  const checkPattern = (arr: { pattern: (number | string)[]; coords: number[][] }) => {
    if (arraysEqual(arr.pattern, pattern)) {

      return { success: true, coords: [arr.coords[1]] }

    } else if (arraysEqual([0, participant, participant, 0], pattern)) {

      return { success: true, coords: [all_coordinates[0], all_coordinates[3]] }

    }
    
    return false
  }

  const arr = double_three_in_a_row_patterns(participant, coords, all_coordinates)
  if(!checkCoordinatesLimit(coords.first) || !checkCoordinatesLimit(coords.last) || !checkIfSpotIsNotOccupiedOnBoard(coords.first) ||  !checkIfSpotIsNotOccupiedOnBoard(coords.last)) return false

  for (const entry of arr) {
    const result = checkPattern(entry)
    if (result !== false) {
      return result
    }
  }

  return false
}