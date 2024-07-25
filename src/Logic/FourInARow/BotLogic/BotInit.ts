import {
  playerStatus,
  playerChoices,
  remainingChoices,
  goldenMove,
  defaultGoldenMove,
  deepClone,
  defaultChoices,
  botValue,
  botChoices,
  losing_Coordinates,
} from '../GameLogic/variables'

import type {
  possible_Coordinates,
} from '../Types'

import { scanBoard } from './scanLogic'
import { searchForBestChoice } from './Algorithms/searches/searchForBestChoice'
import { find_all_related_moves_to_given_pattern } from './Algorithms/searches/searchForAllRelatedMovesToPattern'
import { checkDoubleThreeInARow } from './Algorithms/checks/checkDoubleThreeInARow'
import { checkPotentiallyDoubleThreeInARow } from './Algorithms/checks/checkPotentiallyDoubleThreeInARow'
import { searchForLosingPatterns } from './Algorithms/searches/searchForLosingPatterns'
import { getFourthAndFifthCoordinates } from './Algorithms/get/getFourthAndFifthCoordinates'
import { getPieceCount } from './Algorithms/get/getPieceCount'
import { addRelatedMovesToObject } from './Algorithms/addRelatedMovesToObject'
import { checkThreeInARow } from './Algorithms/checks/checkThreeInARow'
import { applyPropertiesToEntry } from './applyPropertiesToEntry'
import { botMove } from './botMove'

export const initiateAlgorithms = async (board: number[][]) => {

  const participants = [
    {id: botValue, scan: scanBoard(board, botValue)}, 
    {id: playerStatus.value, scan: scanBoard(board, playerStatus.value)}
  ]

  for (const participant of participants) {
    for (const structure of participant.scan) {
      for (const sequence of structure.sequence) {

        const result = checkThreeInARow(board, sequence.coordinates, participant.id, sequence.pattern)
        if (result != false) {
          const [x, y] = result
          return botMove(board, x, y)
        }

      }
    }

    searchForLosingPatterns(board, participant.scan, participant.id)
  }


  for (const participant of participants) {
    for (const structure of participant.scan) {
      for (const sequence of structure.sequence) {
        
        const [coordinates, pattern, direction] = [sequence.coordinates, sequence.pattern, structure.direction]
        
        for (let index = 0; index < pattern.length; index++) {
          if (pattern[index] == 0) {

            const piece_count = getPieceCount(pattern, participant.id)
            const key = `${piece_count}_in_a_row`
            const targetArr = (participant.id == botValue) ? botChoices.value : playerChoices.value
              
            const entry: possible_Coordinates = {
              pattern: pattern,
              coordinates: coordinates[index],
              all_coordinates: coordinates,
              direction: direction,
              losing: { bool: false, bot_instances: [], player_instances: [] },
              participant: participant.id,
              piece_count: piece_count
            }

            const moves_related_to_pattern = find_all_related_moves_to_given_pattern(board, coordinates[index])

            // Adding relevant coordinates information
            const botAndPlayerRelatedMoves = [
              {targetArr: entry.losing.bot_instances, arr: moves_related_to_pattern.bots_opportunities}, 
              {targetArr: entry.losing.player_instances, arr: moves_related_to_pattern.player_threats}
            ]

            addRelatedMovesToObject(botAndPlayerRelatedMoves)

            const thirdAndFifth = getFourthAndFifthCoordinates(sequence.coordinates)
            const DThreeInARow = checkDoubleThreeInARow(board, thirdAndFifth, sequence.pattern, participant.id, sequence.coordinates)
            const PDThreeInARow = checkPotentiallyDoubleThreeInARow(board, thirdAndFifth, sequence.pattern, participant.id, sequence.coordinates)

            applyPropertiesToEntry(
              board, 
              moves_related_to_pattern, 
              DThreeInARow, PDThreeInARow, 
              coordinates[index], entry,
              targetArr, key
            ) 

          }
        }
      }
    }
  }

  console.log('BotChoices:', botChoices.value, 'PlayerChoices: ', playerChoices.value, 'RemainingChoices: ', remainingChoices.value)
  console.log('LosingChoices: ', losing_Coordinates.value)

  return await searchForBestChoice(board)
}

export const resetChoices = () => {
  const values = [playerChoices, botChoices]

  for (const choices of values) {
    choices.value = deepClone(defaultChoices)
  }
  remainingChoices.value = []
  // resetting losing choices
  losing_Coordinates.value = []

  goldenMove.value = defaultGoldenMove
}