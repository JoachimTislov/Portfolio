import { remainingChoices } from "../GameLogic/variables"
import type { columnInformation, DThree, possible_Choices, possible_Coordinates } from "../Types"
import { checkDoubleThreeInARowCircumstances } from "./Algorithms/checks/checkDoubleThreeInARowCircumstances"
import { checkForGoldenMove } from "./Algorithms/checks/checkForGoldenMove"
import { checkPDoubleThreeInARowCircumstances } from "./Algorithms/checks/checkPDoubleThreeInARowCircumStances"
import { botMove } from "./botMove"
import { structureCases } from "./structureCases"

export const applyPropertiesToEntry = (
    board: number[][], moves_related_to_pattern: columnInformation, 
    DThreeInARow: DThree, PDThreeInARow: DThree,
    coordinates: number[], entry: possible_Coordinates,
    targetArr: possible_Choices, key: string
    
) => {
    /* 
        F - first, S - second
        O - Opportunity, T - Threat
        P - Player, B - Bot 
    */
    const { 
        firstBotOpportunity,
        secondBotOpportunity,
        firstPlayerThreat,
        secondPlayerThreat,
        firstBotOpportunityIsTwo,
        firstPlayerThreatIsTwo,
        firstBotOpportunityIsThree,
        firstPlayerThreatIsThree,
        firstIsPotentialThree, firstIsThree,
        secondBotOpportunityIsThree, secondPlayerThreatIsThree

    } = structureCases(moves_related_to_pattern)

    const result = checkForGoldenMove(firstBotOpportunityIsThree, secondBotOpportunityIsThree, firstPlayerThreatIsThree)
    const [x,y] = coordinates
    if(result) return botMove(board, x, y)

    
    if (checkDoubleThreeInARowCircumstances(DThreeInARow, firstIsThree, moves_related_to_pattern)) {
    
        targetArr['double_Three_in_a_row'].push(entry)

    } else if (checkPDoubleThreeInARowCircumstances(PDThreeInARow, moves_related_to_pattern, firstIsThree)) {

        targetArr['potentially_double_Three_in_a_row'].push(entry)

    } else if (!firstIsPotentialThree && !firstIsThree || (firstPlayerThreatIsTwo && (firstPlayerThreat.relevantMoves.player_instances[0] != undefined && firstPlayerThreat.relevantMoves.player_instances[0].piece_count == 'Three'))) {

        if (firstBotOpportunityIsTwo || firstPlayerThreatIsTwo) { 
            entry.losing.bool = true
        } 

        if (secondBotOpportunityIsThree || secondPlayerThreatIsThree) {
            entry.losing.bool = false
        } 

        if (key == 'One_in_a_row') {
            console.log(entry)
            remainingChoices.value.push(entry)
        } else {
            targetArr[key].push(entry)
        }
    }
}