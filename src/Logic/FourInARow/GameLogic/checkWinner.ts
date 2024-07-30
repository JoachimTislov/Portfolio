import { checkForLoop } from "../BotLogic/Algorithms/checks/checkForLoop"
import { board, botGame, botValue, botVBot, GameOver, playerStatus, ShowWinner, winnerMsg } from "./variables"

export const checkWinner = async (boolCheck: boolean) => {
  //check vertical
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 4; i++) {
      const values = [board[j][i], board[j][i + 1], board[j][i + 2], board[j][i + 3]]

      const coords = [[j,i],[j,i + 1], [j,i + 2], [j,i + 3]]

      const result = await loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  // check horizontal
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 6; i++) {
      const values = [board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i]]

      const coords = [[j,i],[j + 1,i], [j + 2,i], [j + 3,i]]

      const result = await loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  //cross check, from right
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      const values = [board[j][i], board[j + 1][i + 1], board[j + 2][i + 2], board[j + 3][i + 3]]

      const coords = [[j,i],[j + 1,i + 1], [j + 2,i + 2], [j + 3,i + 3]]

      const result = await loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  //cross check, from right
  for (let j = 6; j > 2; j--) {
    for (let i = 0; i < 3; i++) {
      const values = [board[j][i], board[j - 1][i + 1], board[j - 2][i + 2], board[j - 3][i + 3]]

      const coords = [[j,i],[j - 1,i + 1], [j - 2,i + 2], [j - 3,i + 3]]

      const result = await loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }
}

const loopThroughValues = async (coordinates: number[][], values: number[], boolCheck: boolean) => {
  const participants: number[] = [playerStatus.value, botValue.value]

  for (let i = 0; i < 2; i++) {
    if (
      values[0] == participants[i] &&
      values[1] == participants[i] &&
      values[2] == participants[i] &&
      values[3] == participants[i]
    ) {
      if (boolCheck) {

        for (const coords of coordinates) {
          const [x,y] = coords
          board[x][y] = 4
        }

        return await determineWinner(participants[i])
      } else {
        return true
      }
    }
  }
  return false
}

export const getColor = (int: number) => {
  const colors = ['', 'Red', 'Blue', 'Black', 'Green', 'Blue']
  return colors[int]
}

const determineWinner = async (value: number) => {
  ShowWinner.value = true
  GameOver.value = true

  if(botGame.value) {
    if (value == botValue.value) {
      if(botVBot.value) {
        console.log('running loop from checkWinner')
        await checkForLoop()
        winnerMsg.value = `${getColor(botValue.value)} Bot won`
      } else {
        winnerMsg.value = 'Bot won'
      }
    } else {
      winnerMsg.value = 'You won, congrats'
    }
  } else if(!botGame.value) {
    const color = getColor(playerStatus.value)
    winnerMsg.value = `${color} won`
  }
  return true
}

