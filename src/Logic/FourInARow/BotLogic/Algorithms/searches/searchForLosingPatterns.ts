import { arraysEqual, checkIfArrayInThe2DArrayEqualArray, checkLosingCoordinates } from "../../ArrayLogic"
import { losing_Coordinates } from "../../../GameLogic/variables"
import { three_in_a_row_pattern, two_in_a_row_losing_pattern } from "../../PatternLogic"
import type { _patternData, relevantMovesType } from "../../../Types"
import { find_all_related_moves_to_given_pattern } from "./searchForAllRelatedMovesToPattern"
import { getFourthAndFifthCoordinates } from "../get/getFourthAndFifthCoordinates"
import { checkPotentiallyDoubleThreeInARow } from "../checks/checkPotentiallyDoubleThreeInARow"
import { addRelatedMovesToObject } from "../addRelatedMovesToObject"
import { getPieceCountAndIndices } from "../get/getPieceCountAndIndices"

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
          if (structure.direction != 'vertical' && (check && three) || (check && two)) {
            const relevantMoves: relevantMovesType =  { bot_instances: [], player_instances: [] }

            const moves_related_to_pattern = find_all_related_moves_to_given_pattern(board, [x,y+1])

            const botAndPlayerRelatedMoves = [
              {targetArr: relevantMoves.bot_instances, arr: moves_related_to_pattern.bots_opportunities}, 
              {targetArr: relevantMoves.player_instances, arr: moves_related_to_pattern.player_threats}]
            
            addRelatedMovesToObject(botAndPlayerRelatedMoves)

            const thirdAndFifth = getFourthAndFifthCoordinates(sequence.coordinates)
            const result = checkPotentiallyDoubleThreeInARow(board, thirdAndFifth, sequence.pattern, participant, sequence.coordinates)
            const potentiallyDoubleInARow = (result != false && arraysEqual(moves_related_to_pattern.coords, result.coords)) ? result.success : false

            losing_Coordinates.value.push({
              coordinates: [x, y],
              direction: structure.direction,
              pattern: sequence.pattern,
              all_coordinates: sequence.coordinates,
              player_identifier: participant,
              piece_count: piece_countAndIndices.piece_count,
              instances: 1,
              relevantMoves: relevantMoves,
              potentiallyDoubleThreeInARow: potentiallyDoubleInARow
            })
          }
        }
      }
    }
  }
  return true
}