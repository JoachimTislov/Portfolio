import { remainingChoices, log, logOverEarlierGames} from "../GameLogic/variables"
import type { _pattern, possible_Choices, possible_Coordinates } from "../Types"
import { checkEarlierGamesLog } from "./Algorithms/checks/checkEarlierGamesLog"
import { botMove } from "./botMove"
import { structureCases } from "./structureCases"

export const applyPropertiesToEntry = async (
    board: number[][], pattern: _pattern, 
    doubleThreeInARow: boolean, potentialDoubleThreeInARow: boolean,
    coordinates: number[], entry: possible_Coordinates,
    targetArr: possible_Choices, key: string
    
) => {
    const { 
        firstPlayerThreatIsTwo,
        firstBotOpportunityIsThree,
        firstPlayerThreatIsThree,
        firstIsPotentialThree, firstIsTwo, firstIsThree,
        secondPlayerThreatIsTwo,
        secondBotOpportunityIsThree,
        secondIsThree,
        prioritizeTwoWithThreat,
        prioritizeTwoWithoutOpportunity,
        firstPlayerThreatTwoAndRelevantMoveThreatThree,
        verticalDoubleThree
    } = structureCases(entry)
    
    const [x,y] = coordinates

    const lostEarlierByThisMove = checkEarlierGamesLog([x, y], log.value, logOverEarlierGames.value, board)

    // Golden move, guaranteed to win
    if (!firstPlayerThreatIsThree && firstBotOpportunityIsThree && secondBotOpportunityIsThree) {
        console.log('Playing the golden move')
        return await botMove(board, x, y)
    } 
    
    //if (arraysEqual(pattern, [0, 0,3,3])) console.log(entry, doubleThreeInARow, verticalBotDoubleThree, firstPlayerThreatIsThree)
    
    if ((doubleThreeInARow || verticalDoubleThree) && !firstPlayerThreatIsThree) {

        console.log(entry, doubleThreeInARow, firstPlayerThreatIsThree)
        
        targetArr['double_Three_in_a_row'].push(entry)

    } else if (potentialDoubleThreeInARow && !firstIsThree) {

        targetArr['potentially_double_Three_in_a_row'].push(entry)

    } else if (!lostEarlierByThisMove && !firstIsThree && !firstPlayerThreatTwoAndRelevantMoveThreatThree && !firstIsPotentialThree && prioritizeTwoWithThreat && prioritizeTwoWithoutOpportunity && (secondIsThree || !(firstPlayerThreatIsTwo && secondPlayerThreatIsTwo))) {

        if (firstIsTwo) { 
            entry.losing = true
        } 

        if (secondIsThree) {
            entry.losing = false
        } 

        if (key == 'One_in_a_row') {

            remainingChoices.value.push(entry)

        } else if (key == 'Two_in_a_row') {
            
            targetArr[key][entry.coordinates[1]].push(entry)
            
        }
    }
    return true
}
