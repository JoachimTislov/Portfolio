import { arraysEqual, checkIfArrayInThe2DArrayEqualArray } from "../../ArrayLogic"
import { losing_Coordinates } from "../../../GameLogic/variables"
import { three_in_a_row_pattern, two_in_a_row_losing_pattern } from "../../PatternLogic"
import type { _patternData } from "../../../Types"
import { find_all_related_moves_to_given_pattern } from "./searchForAllRelatedMovesToPattern"
import { getFourthAndFifthCoordinates } from "../get/getFourthAndFifthCoordinates"
import { checkPotentiallyDoubleThreeInARow } from "../checks/checkPotentiallyDoubleThreeInARow"
import { getPieceCountAndIndices } from "../get/getPieceCountAndIndices"
import { getOtherZeroCoordinatesIndex } from "../get/getOtherZeroOrAsteriskCoordinatesIndex"
import { checkLosingCoordinates } from "../checks/checkLosingCoordinates"


export const searchForLosingPatterns = (
  board: number[][],
  schema: Array<{
    direction: string
    sequence: _patternData
  }>,
  participant: number
) => {
  for (const structure of schema) {
    for (const sequence of structure.sequence) {
      const three = checkIfArrayInThe2DArrayEqualArray(three_in_a_row_pattern('*', participant),sequence.pattern)
      const two = checkIfArrayInThe2DArrayEqualArray(two_in_a_row_losing_pattern(participant),sequence.pattern)
      const piece_countAndIndices = getPieceCountAndIndices(sequence.pattern, participant)
      if (piece_countAndIndices != false) {
        for (const index of piece_countAndIndices.indices) {
          const [x, y] = [sequence.coordinates[index][0], sequence.coordinates[index][1] - 1]
          
          const check = checkLosingCoordinates(
            sequence.pattern,
            [x, y],
            participant,
            structure.direction,
            piece_countAndIndices.piece_count
          )

          if ((check && three) || (check && two)) {

            const otherZeroOrAsteriskIndex = getOtherZeroCoordinatesIndex(sequence.pattern, [index])
            const relevantMovesOfOtherZeroOrAsterisk = otherZeroOrAsteriskIndex != null ? find_all_related_moves_to_given_pattern(sequence.coordinates[otherZeroOrAsteriskIndex]) : undefined

            const thirdAndFifth = getFourthAndFifthCoordinates(sequence.coordinates)
            const result = checkPotentiallyDoubleThreeInARow(board, thirdAndFifth, sequence.pattern, participant, sequence.coordinates, index)
            const potentiallyDoubleInARow = (result != false && arraysEqual([x, y - 1], result.coords)) ? true : false

            losing_Coordinates.value.push({
              coordinates: [x, y],
              direction: structure.direction,
              pattern: sequence.pattern,
              all_coordinates: sequence.coordinates,
              player_identifier: participant,
              piece_count: piece_countAndIndices.piece_count,
              instances: 1,
              relatedMovesOfOtherZeroOrAsterisk: relevantMovesOfOtherZeroOrAsterisk,
              potentiallyDoubleThreeInARow: potentiallyDoubleInARow
            })
          }
        }
      }
    }
  }
  return true
}