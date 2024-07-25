import { botValue, losing_Coordinates } from "../../../GameLogic/variables"
import type { columnInformation } from "../../../Types"

export const find_all_related_moves_to_given_pattern = (
  board: number[][],
  zeroCoords: number[]
) => {
  const arr: columnInformation = { coords: zeroCoords, player_threats: [], bots_opportunities: [] }
  for (const entry of losing_Coordinates.value) {
    if (entry.coordinates[0] == zeroCoords[0]) {
      const colIndex = entry.coordinates[1] - zeroCoords[1]
      const [x, y] = entry.coordinates

      const targetArr = entry.player_identifier == botValue ? arr.bots_opportunities : arr.player_threats
      targetArr[colIndex] = {
        coords: [x, y],
        piece_count: entry.piece_count,
        instances: entry.instances,
        direction: entry.direction,
        pattern: entry.pattern,
        all_coordinates: entry.all_coordinates,
        PDThreeInARow: entry.potentiallyDoubleThreeInARow,
        relevantMoves: entry.relevantMoves
      }
    }
  }

  return arr
}
