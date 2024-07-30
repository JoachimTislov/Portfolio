import { board, nonStopTesting, Stop } from "@/Logic/FourInARow/GameLogic/variables"
import { startBotVBot } from "../../startBotVBot"
import { resetGame } from "@/Logic/FourInARow/GameLogic/resetGame"


export const checkForLoop = async () => {



    Stop.value = nonStopTesting.value
    
    if (!Stop.value) {
        console.log('Looping ')
        resetGame()
        await startBotVBot(board)
    }
}