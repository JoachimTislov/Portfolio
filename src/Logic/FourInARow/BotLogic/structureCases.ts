import type { relatedMovesObject } from "../Types";

export const structureCases = (relatedMoves: relatedMovesObject) => {

  const moves_related_to_pattern_coordinates_choice = relatedMoves.first

  const [firstBotOpportunity, secondBotOpportunity] =  moves_related_to_pattern_coordinates_choice.bots_opportunities 
  const [firstPlayerThreat, secondPlayerThreat] = moves_related_to_pattern_coordinates_choice.player_threats 

  const firstBotOpportunityIsTwo = firstBotOpportunity?.piece_count === 'Two'
  const firstPlayerThreatIsTwo = firstPlayerThreat?.piece_count === 'Two'

  const firstIsTwo = firstBotOpportunity || firstPlayerThreatIsTwo

  const firstBotOpportunityIsPotentialThree = firstBotOpportunity?.potentialDoubleThreeInARow 
  const firstPlayerThreatIsPotentialThree = firstPlayerThreat?.potentialDoubleThreeInARow

  const firstIsPotentialThree = firstBotOpportunityIsPotentialThree || firstPlayerThreatIsPotentialThree

  const firstBotOpportunityIsThree = firstBotOpportunity?.piece_count === 'Three'
  const firstPlayerThreatIsThree = firstPlayerThreat?.piece_count === 'Three'

  const firstIsThree = firstBotOpportunityIsThree || firstPlayerThreatIsThree;

  const secondBotOpportunityIsTwo = secondBotOpportunity?.piece_count === 'Two'
  const secondPlayerThreatIsTwo = secondPlayerThreat?.piece_count === 'Two'

  const secondBotOpportunityIsThree = secondBotOpportunity?.piece_count === 'Three'
  const secondPlayerThreatIsThree = secondPlayerThreat?.piece_count === 'Three'

  const secondIsThree = secondBotOpportunityIsThree || secondPlayerThreatIsThree


  const firstOtherPossiblePlacement = relatedMoves.second 

  const [firstOtherPossiblePlacementFirstBotOpportunity]  = [firstOtherPossiblePlacement?.bots_opportunities[0]]
  const [firstOtherPossiblePlacementFirstPlayerThreat] = [firstOtherPossiblePlacement?.player_threats[0]]
  
  const firstOtherPossiblePlacementFirstPlayerThreatIsThree = firstOtherPossiblePlacementFirstPlayerThreat?.piece_count == 'Three'
  const firstOtherPossiblePlacementFirstBotOpportunityIsThree = firstOtherPossiblePlacementFirstBotOpportunity?.piece_count == 'Three'

  const preventLoosingOrWinWithThisSmartMove = firstOtherPossiblePlacementFirstPlayerThreatIsThree || firstOtherPossiblePlacementFirstBotOpportunityIsThree

  const isPrime_two_move = !firstOtherPossiblePlacementFirstPlayerThreatIsThree && firstOtherPossiblePlacementFirstBotOpportunityIsThree
  
  // Return structured data
  return {
    firstBotOpportunity,
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
    preventLoosingOrWinWithThisSmartMove,
    isPrime_two_move
  }
}