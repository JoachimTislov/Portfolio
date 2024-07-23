import {
  handleDropInAnimation
} from '../GameLogic/functions'

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
  log,
  playerTurn,
  isRestartDisabled,
  isPreviousDisabled,
} from '../GameLogic/variables'

import {
  three_in_a_row_pattern,
} from './PatternLogic'

import {
  checkIfArrayInThe2DArrayEqualArray,
  arraysEqual,
} from './ArrayLogic'

import type {
  _pattern,
  _coordinates,
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
import { delay } from '../delay'

export const initiateAlgorithms = async (board: number[][]) => {
  const participants = [
    {id: botValue, scan: scanBoard(board, botValue)}, 
    {id: playerStatus.value, scan: scanBoard(board, playerStatus.value)}
  ]

  for (const participant of participants) {
     searchForLosingPatterns(board, participant.scan, participant.id)
  }

  for (const participant of participants) {
    for (const structure of participant.scan) {
      for (const sequence of structure.sequence) {
        filterOutLosingPatternByCheckingLosingCoordinates(
          sequence.coordinates,
          sequence.pattern,
          participant.id,
          structure.direction,
          board
        )
      }
    }
  }

  console.log('BotChoices:', botChoices.value, 'PlayerChoices: ', playerChoices.value, 'RemainingChoices: ', remainingChoices.value)
  console.log('LosingChoices: ', losing_Coordinates.value)

  return await searchForBestChoice(board)
}


const filterOutLosingPatternByCheckingLosingCoordinates = (
  coordinates: _coordinates,
  pattern: _pattern,
  participant: number,
  direction: string,
  board: number[][]
) => {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] == 0) {
      const thirdAndFifth = getFourthAndFifthCoordinates(coordinates)
      const doubleThreeInARow = checkDoubleThreeInARow(board, thirdAndFifth, pattern, participant, coordinates)
      const potentiallyDoubleInARow = checkPotentiallyDoubleThreeInARow(board, thirdAndFifth, pattern, participant, coordinates)
      
      const moves_related_to_pattern = find_all_related_moves_to_given_pattern(board, coordinates[i])

      const piece_count = getPieceCount(pattern, participant)
      const key = `${piece_count}_in_a_row`
      const targetArr = (participant == botValue) ? botChoices.value : playerChoices.value

      const arr_entry: possible_Coordinates = {
        pattern: pattern,
        coordinates: coordinates[i],
        all_coordinates: coordinates,
        direction: direction,
        losing: { bool: false, bot_instances: [], player_instances: [] },
        participant: participant,
        piece_count: piece_count
      }

      // Adding relevant coordinates information
      const botAndPlayerRelatedMoves = [
        {targetArr: arr_entry.losing.bot_instances, arr: moves_related_to_pattern.bots_opportunities}, 
        {targetArr: arr_entry.losing.player_instances, arr: moves_related_to_pattern.player_threats}]

      addRelatedMovesToObject(botAndPlayerRelatedMoves)
      
      const three = checkIfArrayInThe2DArrayEqualArray(three_in_a_row_pattern(0, participant), pattern)
      if (three) {
        const coords = coordinates[i]
        arr_entry.coordinates = coords
        targetArr[key].push(arr_entry)
        return true
      }

      const [firstBotOpportunity, secondBotOpportunity] = moves_related_to_pattern.bots_opportunities;
      const [firstPlayerThreat, secondPlayerThreat] = moves_related_to_pattern.player_threats;

      const firstBotOpportunityIsTwo = firstBotOpportunity && firstBotOpportunity.piece_count == 'Two' 
      const firstPlayerThreatTwo = firstPlayerThreat && firstPlayerThreat.piece_count == 'Two' 
      
      const firstBotOpportunityIsThree = firstBotOpportunity && firstBotOpportunity.piece_count == 'Three' 
      const firstPlayerThreatThree = firstPlayerThreat && firstPlayerThreat.piece_count == 'Three'

      const firstBotOpportunityIsPotentiallyThree = firstBotOpportunity && firstBotOpportunity.piece_count == 'Two' && firstBotOpportunity.potentiallyDoubleThreeInARow == true 
      const firstPlayerThreatPotentiallyThree = firstPlayerThreat && firstPlayerThreat.piece_count == 'Two' && firstPlayerThreat.potentiallyDoubleThreeInARow == true

      const firstIsNotPotentiallyThree = !firstBotOpportunityIsPotentiallyThree && !firstPlayerThreatPotentiallyThree
      const firstIsNotThree = !firstBotOpportunityIsThree && !firstPlayerThreatThree
      
      const secondBotOpportunityIsThree = secondBotOpportunity && secondBotOpportunity.piece_count == 'Three' 
      const secondPlayerThreatThree = secondPlayerThreat && secondPlayerThreat.piece_count == 'Three' 

      // Assigning the correct statistics for the certain pattern with given coordinates for piece placement
      if (firstBotOpportunityIsThree && secondBotOpportunityIsThree && !firstPlayerThreatThree) {
        goldenMove.value = arr_entry 
        return true
      }

      if (doubleThreeInARow != false && !firstPlayerThreatThree && !firstBotOpportunityIsThree) {
          for (const coordinates of doubleThreeInARow.coords) {
            if(arraysEqual(moves_related_to_pattern.coords, coordinates)) {
              arr_entry.coordinates = coordinates
              targetArr['double_Three_in_a_row'].push(arr_entry)
            }
          }
      } else if (potentiallyDoubleInARow != false && arraysEqual(moves_related_to_pattern.coords, potentiallyDoubleInARow.coords) && firstIsNotThree) {

        targetArr['potentially_double_Three_in_a_row'].push(arr_entry)

      } else if (firstIsNotPotentiallyThree && firstIsNotThree || (firstPlayerThreatTwo && (firstPlayerThreat.relevantMoves.player_instances[0] != undefined && firstPlayerThreat.relevantMoves.player_instances[0].piece_count == 'Three'))) {

        if (firstBotOpportunityIsTwo || firstPlayerThreatTwo) { 
          arr_entry.losing.bool = true
        } 

        if (secondBotOpportunityIsThree || secondPlayerThreatThree) {
          arr_entry.losing.bool = false
        } 

        if (key == 'One_in_a_row') {
          remainingChoices.value.push(arr_entry)
        } else {
          targetArr[key].push(arr_entry)
        }
 
      }
    }
  }
    return true
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

export const botMove = async (board: number[][], row: number, slot: number) => {
  isRestartDisabled.value = true
  isPreviousDisabled.value = true

  await delay(1000)

  board[row][slot] = botValue
  log.value.push([row, slot])

  await handleDropInAnimation(row, slot)

  isRestartDisabled.value = false
  isPreviousDisabled.value = false
  
  playerTurn.value = true

  resetChoices()

  return [row, slot]
}
