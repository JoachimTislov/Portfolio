import type { _pattern } from "@/Logic/FourInARow/Types"
import { checkIfArrayInThe2DArrayEqualArray } from "../../ArrayLogic"
import { three_in_a_row_pattern } from "../../PatternLogic"
import { getZeroIndex } from "../get/getZeroIndex"

export const checkThreeInARow = (board: number[][], coordinates: number[][], participant: number, pattern: _pattern) => {

    const isThreeInARow = checkIfArrayInThe2DArrayEqualArray(three_in_a_row_pattern(0, participant), pattern)
    if (isThreeInARow) {
        const index = getZeroIndex(pattern)
        if (index != false) {
            return coordinates[index]
        } 
    } 
    return false
}
