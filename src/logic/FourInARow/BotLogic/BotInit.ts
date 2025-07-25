import {
  playerValue,
  playerChoices,
  deepClone,
  defaultChoices,
  botValue,
  botChoices,
  losing_Coordinates
} from '../GameLogic/variables'

import type { possible_Coordinates } from '../Types'

import { scanBoard } from './scanLogic'
import { searchForBestChoice } from './Algorithms/searches/searchForBestChoice'
import { find_all_related_moves_to_given_pattern } from './Algorithms/searches/searchForAllRelatedMovesToPattern'
import { checkDoubleThreeInARow } from './Algorithms/checks/checkDoubleThreeInARow'
import { checkPotentiallyDoubleThreeInARow } from './Algorithms/checks/checkPotentiallyDoubleThreeInARow'
import { searchForLosingPatterns } from './Algorithms/searches/searchForLosingPatterns'
import { getFourthAndFifthCoordinates } from './Algorithms/get/getFourthAndFifthCoordinates'
import { getPieceCount } from './Algorithms/get/getPieceCount'
import { applyPropertiesToEntry } from './applyPropertiesToAndFilterEntries'
import { botMove } from './botMove'
import { arraysEqual } from './ArrayLogic'
import { three_in_a_row_pattern_with_index } from './PatternLogic'
import { getOtherZeroCoordinatesIndex } from './Algorithms/get/getOtherZeroOrAsteriskCoordinatesIndex'
import { checkIfItsARecordInLosingCoordinates } from './Algorithms/checks/checkIfItsARecordInLosingCoordinates'
import { checkCoordinatesLimit } from './Algorithms/checks/checkCoordinatesLimit'

export const initiateAlgorithms = async (board: number[][]) => {
  const participants = [
    { id: botValue, scan: scanBoard(botValue, board) },
    { id: playerValue, scan: scanBoard(playerValue, board) }
  ]

  // Checks three in a row first to either win or prevent losing the game

  // Three in a row is checked along with marking losing choices to increase performance

  for (const participant of participants) {
    for (const structure of participant.scan) {
      for (const sequence of structure.sequence) {
        // checking for three in a row
        for (const entry of three_in_a_row_pattern_with_index(0, participant.id)) {
          if (arraysEqual(entry.pattern, sequence.pattern)) {
            const [x, y] = sequence.coordinates[entry.zeroIndex]

            if (participant.id == botValue) {
              //console.log('Winning the game!')
            } else {
              //console.log('Blocking three in a row')
            }
            return await botMove(board, x, y)
          }
        }
      }
    }
    searchForLosingPatterns(board, participant.scan, participant.id)
  }

  // Eliminate duplicates in losing coordinates && add relevant moves to losing coordinates with two in a row
  for (const key of Object.keys(losing_Coordinates.value)) {
    const coordinates = JSON.parse(key)
    for (const participant of [botValue, playerValue]) {
      if (
        losing_Coordinates.value[key][participant] &&
        losing_Coordinates.value[key][participant].Two
      ) {
        for (let i = 0; i < losing_Coordinates.value[key][participant].Two.length; i++) {
          const sequence = losing_Coordinates.value[key][participant].Two[i]

          let findRelevantMoves = true
          if (sequence.relatedMovesOfOtherZeroOrAsterisk) {
            const coordinatesUnderOtherZeroIndex =
              sequence.relatedMovesOfOtherZeroOrAsterisk[
                participant == botValue ? 'bots_opportunities' : 'player_threats'
              ][-1].coords

            const duplicate = checkIfItsARecordInLosingCoordinates(
              coordinatesUnderOtherZeroIndex,
              participant
            )
            if (duplicate) {
              findRelevantMoves = false
              losing_Coordinates.value[key][participant].Two.splice(i, 1)
              i--
            }
          }

          if (findRelevantMoves) {
            const [x, y] = coordinates
            for (const [index, c] of sequence.all_coordinates.entries()) {
              if (arraysEqual(c, [x, y + 1])) {
                const otherZeroOrAsteriskIndex = getOtherZeroCoordinatesIndex(sequence.pattern, [
                  index
                ])

                const relevantMovesOfOtherZeroOrAsterisk =
                  otherZeroOrAsteriskIndex != null
                    ? find_all_related_moves_to_given_pattern(
                        sequence.all_coordinates[otherZeroOrAsteriskIndex]
                      )
                    : undefined

                sequence.relatedMovesOfOtherZeroOrAsterisk = relevantMovesOfOtherZeroOrAsterisk
              }
            }
          }
        }
      }
    }
  }

  for (const participant of participants) {
    for (const structure of participant.scan) {
      for (const sequence of structure.sequence) {
        const [coordinates, pattern, direction] = [
          sequence.coordinates,
          sequence.pattern,
          structure.direction
        ]

        for (let index = 0; index < pattern.length; index++) {
          if (pattern[index] == 0) {
            const piece_count = getPieceCount(pattern, participant.id)
            const key = `${piece_count}_in_a_row`
            const targetArr = participant.id == botValue ? botChoices.value : playerChoices.value

            const moves_related_to_pattern = find_all_related_moves_to_given_pattern(
              coordinates[index]
            )

            const firstOtherZeroOrAsteriskCoordinatesIndex = getOtherZeroCoordinatesIndex(
              sequence.pattern,
              [index]
            )
            const moves_related_to_firstOtherZeroCoordinatesIndex =
              firstOtherZeroOrAsteriskCoordinatesIndex != null
                ? find_all_related_moves_to_given_pattern(
                    coordinates[firstOtherZeroOrAsteriskCoordinatesIndex]
                  )
                : undefined

            const secondOtherZeroOrAsteriskCoordinatesIndex =
              firstOtherZeroOrAsteriskCoordinatesIndex != null
                ? getOtherZeroCoordinatesIndex(sequence.pattern, [
                    index,
                    firstOtherZeroOrAsteriskCoordinatesIndex
                  ])
                : null
            const moves_related_to_secondOtherZeroCoordinatesIndex =
              secondOtherZeroOrAsteriskCoordinatesIndex != null
                ? find_all_related_moves_to_given_pattern(
                    coordinates[secondOtherZeroOrAsteriskCoordinatesIndex]
                  )
                : undefined

            const possible_Coordinates_Entry: possible_Coordinates = {
              pattern: pattern,
              coordinates: coordinates[index],
              all_coordinates: coordinates,
              direction: direction,
              losing: false,
              relatedMoves: {
                zero: moves_related_to_pattern,
                first: moves_related_to_firstOtherZeroCoordinatesIndex,
                second: moves_related_to_secondOtherZeroCoordinatesIndex
              },
              winning: false,
              participant: participant.id,
              piece_count: piece_count
            }

            const thirdAndFifth = getFourthAndFifthCoordinates(sequence.coordinates)
            const validThirdAndFifth =
              checkCoordinatesLimit(thirdAndFifth.first) &&
              checkCoordinatesLimit(thirdAndFifth.last)

            const _result = validThirdAndFifth
              ? checkDoubleThreeInARow(
                  board,
                  thirdAndFifth,
                  sequence.pattern,
                  participant.id,
                  sequence.coordinates,
                  index
                )
              : false
            const doubleThreeInARow =
              _result != false &&
              moves_related_to_pattern &&
              arraysEqual(moves_related_to_pattern.coords, _result.coords)
                ? _result.success
                : false

            const result = validThirdAndFifth
              ? checkPotentiallyDoubleThreeInARow(
                  board,
                  thirdAndFifth,
                  sequence.pattern,
                  participant.id,
                  sequence.coordinates,
                  index
                )
              : false
            const potentiallyDoubleInARow =
              result != false &&
              moves_related_to_pattern &&
              arraysEqual(moves_related_to_pattern.coords, result.coords)
                ? result.success
                : false

            const __result = await applyPropertiesToEntry(
              board,
              doubleThreeInARow,
              potentiallyDoubleInARow,
              coordinates[index],
              possible_Coordinates_Entry,
              targetArr,
              key
            )
            if (__result != true) return __result
          }
        }
      }
    }
  }

  //console.log(botChoices.value, playerChoices.value, losing_Coordinates.value)

  return await searchForBestChoice(board)
}

export const resetChoices = () => {
  const values = [playerChoices, botChoices]

  for (const choices of values) {
    choices.value = deepClone(defaultChoices)
  }
  // resetting losing choices
  losing_Coordinates.value = {}
}
