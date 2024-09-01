import type { possible_Choices, possible_Coordinates } from '../Types'
import { arraysEqual } from './ArrayLogic'
import { botMove } from './botMove'
import { structureCases } from './structureCases'

export const applyPropertiesToEntry = async (
  board: number[][],
  doubleThreeInARow: boolean,
  two_sided_three_in_a_row: boolean,
  coordinates: number[],
  possible_Coordinates_Entry: possible_Coordinates,
  targetArr: possible_Choices,
  key: string
) => {
  const {
    firstIsTwo,
    firstPlayerThreatIsTwo,
    firstBotOpportunityIsThree,
    firstPlayerThreatIsThree,
    firstIsPotentialThree,
    //firstIsPotentialDoubleThreeInARowPlayerThreeThreat,
    secondPlayerThreatIsTwo,
    secondBotOpportunityIsThree,
    secondIsThree,
    playerHasAPrimeDoubleAbove,
    prime_verticalDoubleThree,
    non_prime_verticalDoubleThree,
    duplicateBuildingORBlocking,
    doubleTwo
  } = structureCases(possible_Coordinates_Entry)

  const [x, y] = coordinates

  // Golden move (Double vertically), guaranteed to win
  if (!firstPlayerThreatIsThree && firstBotOpportunityIsThree && secondBotOpportunityIsThree) {
    // console.log('Golden move played')
    return await botMove(board, x, y)
  }

  if (arraysEqual([6, 2], possible_Coordinates_Entry.coordinates))
    console.log(
      !firstBotOpportunityIsThree,
      !playerHasAPrimeDoubleAbove,
      !firstIsPotentialThree,
      !firstIsTwo,
      possible_Coordinates_Entry,
      secondIsThree,
      firstPlayerThreatIsTwo,
      secondPlayerThreatIsTwo
    )

  if (!firstPlayerThreatIsThree && !doubleTwo) {
    if (doubleThreeInARow || prime_verticalDoubleThree) {
      targetArr.prime_double_Three_in_a_row.push(possible_Coordinates_Entry)
    } else if (
      non_prime_verticalDoubleThree &&
      !duplicateBuildingORBlocking &&
      !firstBotOpportunityIsThree
    ) {
      targetArr.non_prime_double_Three_in_a_row.push(possible_Coordinates_Entry)
    } else if (two_sided_three_in_a_row && !firstBotOpportunityIsThree) {
      targetArr.two_sided_three_in_a_row.push(possible_Coordinates_Entry)
    } else if (
      !firstBotOpportunityIsThree &&
      !playerHasAPrimeDoubleAbove &&
      !firstIsPotentialThree &&
      !(firstIsTwo && possible_Coordinates_Entry.direction == 'vertical') &&
      (secondIsThree || !(firstPlayerThreatIsTwo && secondPlayerThreatIsTwo))
    ) {
      if (firstIsTwo && !secondIsThree) {
        possible_Coordinates_Entry.losing = true
      }

      targetArr[key].push(possible_Coordinates_Entry)
    }
  }

  return true
}
