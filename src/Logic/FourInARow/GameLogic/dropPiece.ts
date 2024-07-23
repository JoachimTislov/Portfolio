import { initiateAlgorithms } from "../BotLogic/Bot"
import { checkWinner } from "./checkWinner"
import { handleDropInAnimation, checkForTie, updatePlayerStatus, alterPreviousButton, alterRestartButton } from "./functions"
import { board, botGame, GameOver, log, playerStatus, playerTurn, ShowWinner } from "./variables"

export const dropPiece = async (index: number, pieces: number, incrementPieces: () => void) => {
  if(!GameOver.value) {
    if(playerTurn.value && botGame.value || !botGame.value) {
      for (let i = 0; i < 7; i++) {
        if (board[index][i] === 0) {
          
            handleDropInAnimation(index, i)

            //Placing pieces
            board[index][i] = playerStatus.value
            playerTurn.value = false
            
            log.value.push([index, i])

            alterRestartButton(pieces)
            alterPreviousButton(pieces)
            checkWinner(true)
            
            if (botGame.value && !ShowWinner.value) {
                await initiateAlgorithms(board)
                incrementPieces(); checkWinner(true)
                alterRestartButton(pieces)
                alterPreviousButton(pieces)
            }

            checkForTie(pieces)

            if (!botGame.value) {
            updatePlayerStatus()
            }

            break
        }
      }
    }
  }
}