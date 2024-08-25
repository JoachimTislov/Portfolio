import { botValue, playerStatus } from '../GameLogic/variables'
import type { possible_Coordinates } from '../Types'

export const structureCases = (possible_Coordinates_Entry: possible_Coordinates) => {
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

  const twoPieceCount = possible_Coordinates_Entry.piece_count == 'Two'
  const twoAndBot = twoPieceCount && possible_Coordinates_Entry.participant == botValue
  const twoAndPlayer = twoPieceCount && possible_Coordinates_Entry.participant == playerStatus.value

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

  const relevantFirstMoveToOriginalThreatIsThree =
    firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[0]?.piece_count == 'Three'
  const relevantFirstMoveUnderToOriginalThreatIsThree =
    firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[-1]?.piece_count == 'Three'
  const firstPlayerThreatTwoAndRelevantMoveThreatThree =
    firstPlayerThreatIsTwo &&
    (relevantFirstMoveToOriginalThreatIsThree || relevantFirstMoveUnderToOriginalThreatIsThree)

  const playerVerticalDouble =
    firstOtherPossiblePlacementBotOpportunityIsThree ||
    secondUnderOtherPossiblePlacementPlayerThreatIsThree ||
    firstUnderOtherPossiblePlacementPlayerThreatIsThree ||
    firstOtherPossiblePlacementPlayerThreatIsThree ||
    firstPlayerThreatIsThree

  const botVerticalDouble =
    firstOtherPossiblePlacementPlayerThreatIsThree ||
    secondUnderOtherPossiblePlacementBotOpportunityIsThree ||
    firstUnderOtherPossiblePlacementBotOpportunityIsThree ||
    firstOtherPossiblePlacementBotOpportunityIsThree ||
    firstBotOpportunityIsThree

  const verticalDoubleThree =
    (twoAndPlayer && playerVerticalDouble) || (twoAndBot && botVerticalDouble)

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
