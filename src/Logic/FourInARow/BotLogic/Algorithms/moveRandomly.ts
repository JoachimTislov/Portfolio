import { boardWidth } from "../../GameLogic/variables"
import { botMove } from "../botMove"
import { getRandomNumber } from "./get/getRandomNumber"

export async function moveRandomly(board: number[][]) {

    const row = getRandomNumber(boardWidth.value - 1)
   
    if (row) {
        const column = board[row]

        for (let i = 0; i < column.length; i++) {
            if (column[i] == 0) {
            console.log('Playing randomly.... :)')
            return await botMove(board, row, i)
            }

            if (i == column.length) await moveRandomly(board)
        }
    } else {
        await moveRandomly(board)
    }
}