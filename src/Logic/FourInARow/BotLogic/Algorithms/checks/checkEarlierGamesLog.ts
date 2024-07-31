import type { _logOverEarlierGames, gameLog } from "@/Logic/FourInARow/Types";
import { checkIfTwo2DArraysEqual } from "../../ArrayLogic";

export const checkEarlierGamesLog = (coords: number[], log: gameLog, logOverEarlierGames: _logOverEarlierGames, board: number[][]) => {

    const key = JSON.stringify(coords)

    const lostGamesWithRelatedMove = logOverEarlierGames[key]

    if (lostGamesWithRelatedMove) {
        for (const entry of lostGamesWithRelatedMove) {
            const result = checkIfTwo2DArraysEqual(entry.board, board)
            if (result) return result
        }
    } else {
        return false
    }
}