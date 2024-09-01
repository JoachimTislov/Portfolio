import {
  arraysEqual,
  checkIfArrayInThe2DArrayEqualArray,
  TwoDimensionalArraysEqual
} from '../../ArrayLogic'
import { losing_Coordinates } from '../../../GameLogic/variables'
import { three_in_a_row_pattern, two_in_a_row_losing_pattern } from '../../PatternLogic'
import type { _patternData } from '../../../Types'
import { getFourthAndFifthCoordinates } from '../get/getFourthAndFifthCoordinates'
import { checkPotentiallyDoubleThreeInARow } from '../checks/checkPotentiallyDoubleThreeInARow'
import { getPieceCountAndIndices } from '../get/getPieceCountAndIndices'

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
      const three = checkIfArrayInThe2DArrayEqualArray(
        three_in_a_row_pattern('*', participant),
        sequence.pattern
      )
      const two = checkIfArrayInThe2DArrayEqualArray(
        two_in_a_row_losing_pattern(participant),
        sequence.pattern
      )
      const piece_countAndIndices = getPieceCountAndIndices(sequence.pattern, participant)
      if (piece_countAndIndices != false) {
        for (const index of piece_countAndIndices.indices) {
          const [x, y] = [sequence.coordinates[index][0], sequence.coordinates[index][1] - 1]

          if (three || two) {
            const thirdAndFifth = getFourthAndFifthCoordinates(sequence.coordinates)
            const result = checkPotentiallyDoubleThreeInARow(
              board,
              thirdAndFifth,
              sequence.pattern,
              participant,
              sequence.coordinates,
              index
            )
            const potentiallyDoubleInARow =
              result != false && arraysEqual([x, y + 1], result.coords) ? true : false

            const key = JSON.stringify([x, y])

            if (!losing_Coordinates.value[key]) losing_Coordinates.value[key] = {}
            if (!losing_Coordinates.value[key][participant])
              losing_Coordinates.value[key][participant] = {}
            if (!losing_Coordinates.value[key][participant][piece_countAndIndices.piece_count])
              losing_Coordinates.value[key][participant][piece_countAndIndices.piece_count] = []

            let canAddEntry = true
            for (const entry of losing_Coordinates.value[key][participant][
              piece_countAndIndices.piece_count
            ]) {
              if (entry.direction == structure.direction || entry.direction == 'vertical') {
                if (
                  entry.direction == 'cross' &&
                  arraysEqual(entry.pattern, sequence.pattern) &&
                  TwoDimensionalArraysEqual(entry.all_coordinates, sequence.coordinates)
                ) {
                  canAddEntry = false
                } else {
                  canAddEntry = false
                }
              }
            }

            if (canAddEntry) {
              losing_Coordinates.value[key][participant][piece_countAndIndices.piece_count].push({
                direction: structure.direction,
                pattern: sequence.pattern,
                all_coordinates: sequence.coordinates,
                relatedMovesOfOtherZeroOrAsterisk: undefined,
                potentiallyDoubleThreeInARow: potentiallyDoubleInARow
              })

              if (!losing_Coordinates.value[key].status) {
                losing_Coordinates.value[key].status = {
                  highest_piece_count: piece_countAndIndices.piece_count,
                  participant: participant,
                  count: 1
                }
              } else {
                if (
                  losing_Coordinates.value[key].status.participant == participant &&
                  losing_Coordinates.value[key].status.highest_piece_count ==
                    piece_countAndIndices.piece_count
                ) {
                  losing_Coordinates.value[key].status.count++
                } else {
                  losing_Coordinates.value[key].status.participant = participant
                  losing_Coordinates.value[key].status.count = 1
                }

                if (
                  losing_Coordinates.value[key].status.highest_piece_count == 'Two' &&
                  piece_countAndIndices.piece_count == 'Three'
                ) {
                  losing_Coordinates.value[key].status.highest_piece_count =
                    piece_countAndIndices.piece_count
                }
              }
            }
          }
        }
      }
    }
  }
  return true
}
