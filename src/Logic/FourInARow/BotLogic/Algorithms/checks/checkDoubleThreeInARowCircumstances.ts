import type { columnInformation, DThree } from "@/Logic/FourInARow/Types"
import { arraysEqual } from "../../ArrayLogic"


export const checkDoubleThreeInARowCircumstances = (DThreeInARow: DThree, FisThree: boolean, moves_related_to_pattern: columnInformation) => {

    if (DThreeInARow != false && !FisThree && arraysEqual(moves_related_to_pattern.coords, DThreeInARow.coords)) {
        return true
    } else {
        return false
    }
    
}  