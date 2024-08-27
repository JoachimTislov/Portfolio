import type { _pattern, possible_Choices, possible_Coordinates } from '../Types'
import { botMove } from './botMove'
import { structureCases } from './structureCases'

export const applyPropertiesToEntry = async (
  board: number[][],
  pattern: _pattern,
  doubleThreeInARow: boolean,
  two_sided_three_in_a_row: boolean,
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
    prime_verticalDoubleThree,
    non_prime_verticalDoubleThree
  } = structureCases(possible_Coordinates_Entry)

  const [x, y] = coordinates

  // Golden move, guaranteed to win
  if (!firstPlayerThreatIsThree && firstBotOpportunityIsThree && secondBotOpportunityIsThree) {
    console.log('Golden move played')
    return await botMove(board, x, y)
  }

  if (
    (doubleThreeInARow || prime_verticalDoubleThree) &&
    !firstPlayerThreatIsThree &&
    !firstPlayerThreatTwoAndRelevantMoveThreatThree
  ) {
    targetArr.prime_double_Three_in_a_row.push(possible_Coordinates_Entry)
  } else if (non_prime_verticalDoubleThree && !firstIsThree) {
    targetArr.non_prime_double_Three_in_a_row.push(possible_Coordinates_Entry)
  } else if (two_sided_three_in_a_row && !firstIsThree) {
    targetArr.two_sided_three_in_a_row.push(possible_Coordinates_Entry)
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

    targetArr[key].push(possible_Coordinates_Entry)
  }
  return true
}
