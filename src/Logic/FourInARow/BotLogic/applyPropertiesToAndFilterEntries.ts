import { remainingChoices } from "../GameLogic/variables"
import type { _pattern, possible_Choices, possible_Coordinates } from "../Types"
import { checkIfArrayInThe2DArrayEqualArray } from "./ArrayLogic"
import { botMove } from "./botMove"
import { prime_two_in_a_row_pattern } from "./PatternLogic"
import { structureCases } from "./structureCases"

export const applyPropertiesToEntry = (
    board: number[][], pattern: _pattern, 
    doubleThreeInARow: boolean, potentialDoubleThreeInARow: boolean,
    coordinates: number[], entry: possible_Coordinates,
    targetArr: possible_Choices, key: string
    
) => {
    const { 
        firstPlayerThreat,
        firstPlayerThreatIsTwo,
        firstBotOpportunityIsThree,
        firstPlayerThreatIsThree,
        firstIsPotentialThree, firstIsTwo, firstIsThree,
        secondPlayerThreatIsTwo,
        secondBotOpportunityIsThree,
        secondIsThree,
        preventLoosingOrWinWithThisSmartMove,
        isPrime_two_move

    } = structureCases(entry.relatedMoves)

    const prime_two = checkIfArrayInThe2DArrayEqualArray(prime_two_in_a_row_pattern(entry.participant), pattern)

    const [x,y] = coordinates

    // Golden move, guaranteed to win
    if (!firstPlayerThreatIsThree && firstBotOpportunityIsThree && secondBotOpportunityIsThree) {
        //console.log('Playing the golden move')
        return botMove(board, x, y)
    } 
        
    const relevantFirstMoveToOriginalThreatIsThree = (firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats.length == 1 && firstPlayerThreat?.relatedMovesOfOtherZeroOrAsterisk?.player_threats[0].piece_count == 'Three')
    const firstPlayerThreatTwoAndRelevantMoveThreatThree = (firstPlayerThreatIsTwo && relevantFirstMoveToOriginalThreatIsThree)
    
    //if (arraysEqual(pattern, [0,'*',1,1])) console.log(!firstIsThree, !firstPlayerThreatTwoAndRelevantMoveThreatThree, !firstIsPotentialThree, secondIsThree, !firstPlayerThreatIsTwo, !secondPlayerThreatIsTwo)
    if (doubleThreeInARow && !firstPlayerThreatIsThree) {
        
        targetArr['double_Three_in_a_row'].push(entry)

    } else if (potentialDoubleThreeInARow && !firstIsThree) {

        targetArr['potentially_double_Three_in_a_row'].push(entry)

    } else if (!firstIsThree && !firstPlayerThreatTwoAndRelevantMoveThreatThree && (secondIsThree || (!firstIsPotentialThree && !(firstPlayerThreatIsTwo && secondPlayerThreatIsTwo)))) {
        
        //console.log(!firstIsThree, !firstPlayerThreatTwoAndRelevantMoveThreatThree, !firstIsPotentialThree, secondIsThree, !firstPlayerThreatIsTwo, !secondPlayerThreatIsTwo, pattern, !firstIsThree && !firstPlayerThreatTwoAndRelevantMoveThreatThree && !firstIsPotentialThree && (secondIsThree || (!firstIsPotentialThree || !firstPlayerThreatIsTwo && !secondPlayerThreatIsTwo)))

        if (preventLoosingOrWinWithThisSmartMove || prime_two && isPrime_two_move) {
            entry.winning = true
        }
        
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
}
