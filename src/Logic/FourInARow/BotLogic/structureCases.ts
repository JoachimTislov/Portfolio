import { botValue, playerStatus } from '../GameLogic/variables'
import type { possible_Coordinates } from '../Types'
import { checkIfArrayInThe2DArrayEqualArray } from './ArrayLogic'
import { prime_two_in_a_row_pattern } from './PatternLogic'

export const structureCases = (possible_Coordinates_Entry: possible_Coordinates) => {
  ////////////////////////////////// Defining useful variables ////////////////////////////////////////////////////////

  const zeroPlacement = possible_Coordinates_Entry.relatedMoves.zero

  const [firstBotOpportunity, secondBotOpportunity] = [
    zeroPlacement.bots_opportunities[0],
    zeroPlacement.bots_opportunities[1]
  ]
  const [firstPlayerThreat, secondPlayerThreat] = [
    zeroPlacement.player_threats[0],
    zeroPlacement.player_threats[1]
  ]

  const firstBotOpportunityIsTwo = firstBotOpportunity?.piece_count === 'Two'
  const firstPlayerThreatIsTwo = firstPlayerThreat?.piece_count === 'Two'

  const firstIsTwo = firstBotOpportunity || firstPlayerThreatIsTwo

  const firstIsPotentialThree =
    firstBotOpportunity?.potentialDoubleThreeInARow || firstPlayerThreat?.potentialDoubleThreeInARow

  const firstBotOpportunityIsThree = firstBotOpportunity?.piece_count === 'Three'
  const firstPlayerThreatIsThree = firstPlayerThreat?.piece_count === 'Three'

  const firstIsThree = firstBotOpportunityIsThree || firstPlayerThreatIsThree

  const secondBotOpportunityIsTwo = secondBotOpportunity?.piece_count === 'Two'
  const secondPlayerThreatIsTwo = secondPlayerThreat?.piece_count === 'Two'

  const secondBotOpportunityIsThree = secondBotOpportunity?.piece_count === 'Three'
  const secondPlayerThreatIsThree = secondPlayerThreat?.piece_count === 'Three'

  const secondIsThree = secondBotOpportunityIsThree || secondPlayerThreatIsThree

  // First related zero or asterisk
  const OtherPossiblePlacement = possible_Coordinates_Entry.relatedMoves.first
  const [
    secondUnderOtherPossiblePlacementBotOpportunity,
    underOtherPossiblePlacementBotOpportunity,
    OtherPossiblePlacementBotOpportunity
  ] = [
    OtherPossiblePlacement?.bots_opportunities[-2],
    OtherPossiblePlacement?.bots_opportunities[-1],
    OtherPossiblePlacement?.bots_opportunities[0]
  ]
  const [
    secondUnderOtherPossiblePlacementPlayerThreat,
    firstUnderOtherPossiblePlacementPlayerThreat,
    otherPossiblePlacementPlayerThreat
  ] = [
    OtherPossiblePlacement?.player_threats[-2],
    OtherPossiblePlacement?.player_threats[-1],
    OtherPossiblePlacement?.player_threats[0]
  ]

  const secondUnderOtherPossiblePlacementPlayerThreatIsThree =
    secondUnderOtherPossiblePlacementPlayerThreat?.piece_count == 'Three'
  const secondUnderOtherPossiblePlacementBotOpportunityIsThree =
    secondUnderOtherPossiblePlacementBotOpportunity?.piece_count == 'Three'

  const firstUnderOtherPossiblePlacementPlayerThreatIsThree =
    firstUnderOtherPossiblePlacementPlayerThreat?.piece_count == 'Three'
  const firstUnderOtherPossiblePlacementBotOpportunityIsThree =
    underOtherPossiblePlacementBotOpportunity?.piece_count == 'Three'

  const firstOtherPossiblePlacementPlayerThreatIsTwo =
    otherPossiblePlacementPlayerThreat?.piece_count == 'Two'
  const firstOtherPossiblePlacementBotOpportunityIsTwo =
    OtherPossiblePlacementBotOpportunity?.piece_count == 'Two'

  const firstOtherPossiblePlacementPlayerThreatIsThree =
    otherPossiblePlacementPlayerThreat?.piece_count == 'Three'
  const firstOtherPossiblePlacementBotOpportunityIsThree =
    OtherPossiblePlacementBotOpportunity?.piece_count == 'Three'

  const relevantFirstMoveToOriginalThreatIsThree =
    firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[0]?.piece_count == 'Three'
  const relevantFirstMoveUnderToOriginalThreatIsThree =
    firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[-1]?.piece_count == 'Three'

  const twoPieceCount = possible_Coordinates_Entry.piece_count == 'Two'
  const twoAndBot = twoPieceCount && possible_Coordinates_Entry.participant == botValue
  const twoAndPlayer = twoPieceCount && possible_Coordinates_Entry.participant == playerStatus.value

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////// Setting up different cases ////////////////////////////////////////////////////

  /* 

    --- Hierarchy ---

    1. block three in a row... and done first in initiate algorithms function in BotInit.ts

    2. block prime two in a row.. (preventing vertical double three in a row or preventing loss if its: [0 1 1 1 0 ])

    3. prevent non prime vertical double three in a row by either building a three in row and match the first three in a row, or block one of the three in a rows 

    3. block two - two in a row, spot where the two - two in a rows can be connected

    4. let the bot build their own, I am unsure to when the bot should focus on its structure

    5. block non-prime two in a row 

    6. block two-sided three in a row - ['*' 1 1 1 '*' ]

    7. Prevent three in a row


    --- Four in a row slang ---
    
    - Prime two - 
    
      1x4 pattern, two player values and two zeros, ex: [0, player, player, 0]
      meaning the player can possibly create an unstoppable combination of two; three in a rows 

    Facts:

      - Two-sided prime three in a row = double three in a row (non prime is a two-sided three in a row)

      - '*' is an invalid placement
      
      -The algorithm are based around 1x4 pattern, but extends to 1x5 to find immediate threats like a prime two with two zero in on each side: [0, 1, 1, 0, 0]

  */

  ///////// I don't remember why these are here..... lol ////////////

  // I know that it made the bot pass some tests

  // Might remove them... idk

  const prioritizeTwoWithoutOpportunity = !(
    twoPieceCount &&
    possible_Coordinates_Entry.participant == botValue &&
    !firstBotOpportunityIsTwo &&
    firstOtherPossiblePlacementBotOpportunityIsTwo
  )

  const prioritizeTwoWithThreat = !(
    twoPieceCount &&
    possible_Coordinates_Entry.participant == playerStatus.value &&
    !firstPlayerThreatIsTwo &&
    firstOtherPossiblePlacementPlayerThreatIsTwo
  )

  /////////////////////////////////////////////////////////

  /////// Block prime two ( prevent consecutive vertical three in a row, which is not possible to stop unless the first three in a row is matched with the bots three in a row)

  const prime_two = checkIfArrayInThe2DArrayEqualArray(
    prime_two_in_a_row_pattern(possible_Coordinates_Entry.participant),
    possible_Coordinates_Entry.pattern
  )

  const prime_verticalDoubleThree =
    prime_two &&
    ((twoAndPlayer && firstPlayerThreatIsThree) || (twoAndBot && firstBotOpportunityIsThree))

  ///////////////////////////////////////////////////////////////////////////////////////////

  /// Preventing vertical double three in a row

  const non_prime_verticalDoubleThree =
    (twoAndPlayer && firstPlayerThreatIsThree) || (twoAndBot && firstBotOpportunityIsThree)

  /////////////////////////////////////

  const firstPlayerThreatTwoAndRelevantMoveThreatThree =
    firstPlayerThreatIsTwo &&
    (relevantFirstMoveToOriginalThreatIsThree || relevantFirstMoveUnderToOriginalThreatIsThree)

  return {
    secondBotOpportunity,
    firstIsTwo,
    firstPlayerThreat,
    secondPlayerThreat,
    firstBotOpportunityIsTwo,
    firstPlayerThreatIsTwo,
    firstBotOpportunityIsThree,
    firstPlayerThreatIsThree,
    firstIsPotentialThree,
    firstIsThree,
    secondBotOpportunityIsTwo,
    secondPlayerThreatIsTwo,
    secondBotOpportunityIsThree,
    secondPlayerThreatIsThree,
    secondIsThree,
    prime_verticalDoubleThree,
    non_prime_verticalDoubleThree,
    prioritizeTwoWithThreat,
    prioritizeTwoWithoutOpportunity,
    firstPlayerThreatTwoAndRelevantMoveThreatThree
  }
}
