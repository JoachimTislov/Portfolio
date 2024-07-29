import { botValue, playerStatus } from "../GameLogic/variables";
import type { possible_Coordinates } from "../Types";
import { arraysEqual, checkIfArrayInThe2DArrayEqualArray } from "./ArrayLogic";
import { prime_two_in_a_row_pattern } from "./PatternLogic";

export const structureCases = (entry: possible_Coordinates) => {

  const zeroPlacement = entry.relatedMoves.zero

  const [firstBotOpportunity, secondBotOpportunity] =  [zeroPlacement.bots_opportunities[0], zeroPlacement.bots_opportunities[1]]
  const [firstPlayerThreat, secondPlayerThreat] = [zeroPlacement.player_threats[0], zeroPlacement.player_threats[1]]

  const firstBotOpportunityIsTwo = firstBotOpportunity?.piece_count === 'Two'
  const firstPlayerThreatIsTwo = firstPlayerThreat?.piece_count === 'Two'

  const firstIsTwo = firstBotOpportunity || firstPlayerThreatIsTwo

  const firstIsPotentialThree = firstBotOpportunity?.potentialDoubleThreeInARow  || firstPlayerThreat?.potentialDoubleThreeInARow

  const firstBotOpportunityIsThree = firstBotOpportunity?.piece_count === 'Three'
  const firstPlayerThreatIsThree = firstPlayerThreat?.piece_count === 'Three'

  const firstIsThree = firstBotOpportunityIsThree || firstPlayerThreatIsThree

  const secondBotOpportunityIsTwo = secondBotOpportunity?.piece_count === 'Two'
  const secondPlayerThreatIsTwo = secondPlayerThreat?.piece_count === 'Two'

  const secondBotOpportunityIsThree = secondBotOpportunity?.piece_count === 'Three'
  const secondPlayerThreatIsThree = secondPlayerThreat?.piece_count === 'Three'

  const secondIsThree = secondBotOpportunityIsThree || secondPlayerThreatIsThree

  // First related zero or asterisk
  const firstOtherPossiblePlacement = entry.relatedMoves.first 
  const [firstUnderOtherPossiblePlacementBotOpportunity, firstOtherPossiblePlacementBotOpportunity] = [firstOtherPossiblePlacement?.bots_opportunities[-1], firstOtherPossiblePlacement?.bots_opportunities[0]]
  const [firstUnderOtherPossiblePlacementPlayerThreat, firstOtherPossiblePlacementPlayerThreat] = [firstOtherPossiblePlacement?.player_threats[-1] , firstOtherPossiblePlacement?.player_threats[0]] 

  const firstUnderOtherPossiblePlacementPlayerThreatIsThree = firstUnderOtherPossiblePlacementPlayerThreat?.piece_count == 'Three'
  const firstUnderOtherPossiblePlacementBotOpportunityIsThree = firstUnderOtherPossiblePlacementBotOpportunity?.piece_count == 'Three'

  const firstOtherPossiblePlacementPlayerThreatIsTwo = firstOtherPossiblePlacementPlayerThreat?.piece_count == 'Two'
  const firstOtherPossiblePlacementBotOpportunityIsTwo = firstOtherPossiblePlacementBotOpportunity?.piece_count == 'Two'

  const firstOtherPossiblePlacementPlayerThreatIsThree = firstOtherPossiblePlacementPlayerThreat?.piece_count == 'Three'
  const firstOtherPossiblePlacementBotOpportunityIsThree = firstOtherPossiblePlacementBotOpportunity?.piece_count == 'Three'
  
  const twoPieceCount = entry.piece_count == 'Two'
  const twoAndBot = twoPieceCount && twoPieceCount
  const twoAndPlayer = twoPieceCount && twoAndBot

  const prioritizeTwoWithoutOpportunity = !(twoPieceCount && entry.participant == botValue && !firstBotOpportunityIsTwo && firstOtherPossiblePlacementBotOpportunityIsTwo)
  const prioritizeTwoWithThreat = !(twoPieceCount && entry.participant == playerStatus.value && !firstPlayerThreatIsTwo && firstOtherPossiblePlacementPlayerThreatIsTwo)

  const prime_two = checkIfArrayInThe2DArrayEqualArray(prime_two_in_a_row_pattern(entry.participant), entry.pattern)

  const verticalDoubleThree = prime_two &&  
            ((twoAndPlayer && (firstUnderOtherPossiblePlacementPlayerThreatIsThree || firstOtherPossiblePlacementPlayerThreatIsThree || firstPlayerThreatIsThree)) ||
            (twoAndBot && (firstUnderOtherPossiblePlacementBotOpportunityIsThree || firstOtherPossiblePlacementBotOpportunityIsThree || firstBotOpportunityIsThree)))
                     
  const relevantFirstMoveToOriginalThreatIsThree = firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[0]?.piece_count == 'Three'
  const relevantFirstMoveUnderToOriginalThreatIsThree = firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[-1]?.piece_count == 'Three'
  const firstPlayerThreatTwoAndRelevantMoveThreatThree = firstPlayerThreatIsTwo && (relevantFirstMoveToOriginalThreatIsThree || relevantFirstMoveUnderToOriginalThreatIsThree)

  // Return structured data
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
    verticalDoubleThree,
    prioritizeTwoWithThreat,
    prioritizeTwoWithoutOpportunity,
    firstPlayerThreatTwoAndRelevantMoveThreatThree
  }
}