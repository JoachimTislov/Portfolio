import type { columnInformation } from "../Types";

/* 
    F - first, S - second
    O - Opportunity, T - Threat
    P - Player, B - Bot 
*/

export const structureCases = (moves_related_to_pattern: columnInformation) => {

  const [firstBotOpportunity, secondBotOpportunity] = moves_related_to_pattern.bots_opportunities;
  const [firstPlayerThreat, secondPlayerThreat] = moves_related_to_pattern.player_threats;

  // Check if the first bot opportunity and player threat have two pieces
  const firstBotOpportunityIsTwo = firstBotOpportunity?.piece_count === 'Two'
  const firstPlayerThreatIsTwo = firstPlayerThreat?.piece_count === 'Two'

  // Check if the first bot opportunity and player threat have potential three-in-a-row
  const firstBotOpportunityIsPotentialThree = firstBotOpportunity?.PDThreeInARow === true
  const firstPlayerThreatIsPotentialThree = firstPlayerThreat?.PDThreeInARow === true

  // Combined condition for potential three-in-a-row
  const firstIsPotentialThree = firstBotOpportunityIsPotentialThree || firstPlayerThreatIsPotentialThree

  // Check if the first bot opportunity and player threat have three pieces
  const firstBotOpportunityIsThree = firstBotOpportunity?.piece_count === 'Three'
  const firstPlayerThreatIsThree = firstPlayerThreat?.piece_count === 'Three'

  // Combined condition for having three pieces
  const firstIsThree = firstBotOpportunityIsThree || firstPlayerThreatIsThree;

  // Check if the second bot opportunity and player threat have three pieces
  const secondBotOpportunityIsThree = secondBotOpportunity?.piece_count === 'Three'
  const secondPlayerThreatIsThree = secondPlayerThreat?.piece_count === 'Three'

  // Return structured data
  return {
    firstBotOpportunity,
    secondBotOpportunity,
    firstPlayerThreat,
    secondPlayerThreat,
    firstBotOpportunityIsTwo,
    firstPlayerThreatIsTwo,
    firstBotOpportunityIsThree,
    firstPlayerThreatIsThree,
    firstIsPotentialThree,
    firstIsThree,
    secondBotOpportunityIsThree,
    secondPlayerThreatIsThree,
  }
}