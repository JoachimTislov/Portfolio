import type { _pattern } from "@/Logic/FourInARow/Types";

export function getZeroIndex(pattern: _pattern) {

    for (let i = 0; i < pattern.length; i ++) {
        if(pattern[i] == 0) return i
    }

    return false
}