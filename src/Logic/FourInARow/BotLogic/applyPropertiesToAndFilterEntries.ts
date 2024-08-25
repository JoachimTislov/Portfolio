import { remainingChoices } from '../GameLogic/variables'
import type { _pattern, possible_Choices, possible_Coordinates } from '../Types'
import { botMove } from './botMove'
import { structureCases } from './structureCases'

export const applyPropertiesToEntry = async (
  board: number[][],
  pattern: _pattern,
  doubleThreeInARow: boolean,
  potentialDoubleThreeInARow: boolean,
  coordinates: number[],
  possible_Coordinates_Entry: possible_Coordinates,
  targetArr: possible_Choices,
  key: string
) => {
  //console.log(possible_Coordinates_Entry)

  const {
    firstPlayerThreatIsTwo,
    firstBotOpportunityIsThree,
    firstPlayerThreatIsThree,
    firstIsPotentialThree,
    firstIsTwo,
    firstIsThree,
    secondPlayerThreatIsTwo,
    secondBotOpportunityIsThree,
    secondIsThree,
    prioritizeTwoWithThreat,
    prioritizeTwoWithoutOpportunity,
    firstPlayerThreatTwoAndRelevantMoveThreatThree,
    verticalDoubleThree
  } = structureCases(possible_Coordinates_Entry)

  if (
    possible_Coordinates_Entry.participant == 1 &&
    possible_Coordinates_Entry.direction == 'cross_up_right'
  ) {
    //console.log('Vertical double three in a row threat: ', verticalDoubleThree)
  }

  const [x, y] = coordinates

  // Golden move, guaranteed to win
  if (!firstPlayerThreatIsThree && firstBotOpportunityIsThree && secondBotOpportunityIsThree) {
    return await botMove(board, x, y)
  }

  if (
    (doubleThreeInARow || verticalDoubleThree) &&
    !firstPlayerThreatIsThree &&
    !firstPlayerThreatTwoAndRelevantMoveThreatThree
  ) {
    //console.log(doubleThreeInARow, verticalDoubleThree)
    targetArr['double_Three_in_a_row'].push(possible_Coordinates_Entry)
  } else if (potentialDoubleThreeInARow && !firstIsThree) {
    targetArr['potentially_double_Three_in_a_row'].push(possible_Coordinates_Entry)
  } else if (
    !firstIsThree &&
    !firstPlayerThreatTwoAndRelevantMoveThreatThree &&
    !firstIsPotentialThree &&
    prioritizeTwoWithThreat &&
    prioritizeTwoWithoutOpportunity &&
    (secondIsThree || !(firstPlayerThreatIsTwo && secondPlayerThreatIsTwo))
  ) {
    if (firstIsTwo) {
      possible_Coordinates_Entry.losing = true
    }

    if (secondIsThree) {
      possible_Coordinates_Entry.losing = false
    }

    if (key == 'One_in_a_row') {
      remainingChoices.value.push(possible_Coordinates_Entry)
    } else if (key == 'Two_in_a_row') {
      targetArr[key][possible_Coordinates_Entry.coordinates[1]].push(possible_Coordinates_Entry)
    }
  }
  return true
}
