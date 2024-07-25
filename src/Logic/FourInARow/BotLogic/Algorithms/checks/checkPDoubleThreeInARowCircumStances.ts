import type { columnInformation, DThree } from "@/Logic/FourInARow/Types"
import { arraysEqual } from "../../ArrayLogic"

export const checkPDoubleThreeInARowCircumstances = (PDThreeInARow: DThree, moves_related_to_pattern: columnInformation, FisThree: boolean) => {
    
    if(PDThreeInARow != false && arraysEqual(moves_related_to_pattern.coords, PDThreeInARow.coords) && !FisThree) {
        return true
    } else {
        return false
    }
}