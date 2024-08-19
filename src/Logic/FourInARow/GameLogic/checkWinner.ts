import {
  board,
  botGame,
  botValue,
  GameOver,
  playerStatus,
  ShowWinner,
  winnerMsg
} from './variables'

export const checkWinner = (boolCheck: boolean) => {
  //check vertical
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 4; i++) {
      const values = [board[j][i], board[j][i + 1], board[j][i + 2], board[j][i + 3]]

      const coords = [
        [j, i],
        [j, i + 1],
        [j, i + 2],
        [j, i + 3]
      ]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  // check horizontal
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 6; i++) {
      const values = [board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i]]

      const coords = [
        [j, i],
        [j + 1, i],
        [j + 2, i],
        [j + 3, i]
      ]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  //cross check, from right
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      const values = [board[j][i], board[j + 1][i + 1], board[j + 2][i + 2], board[j + 3][i + 3]]

      const coords = [
        [j, i],
        [j + 1, i + 1],
        [j + 2, i + 2],
        [j + 3, i + 3]
      ]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }

  //cross check, from right
  for (let j = 6; j > 2; j--) {
    for (let i = 0; i < 3; i++) {
      const values = [board[j][i], board[j - 1][i + 1], board[j - 2][i + 2], board[j - 3][i + 3]]

      const coords = [
        [j, i],
        [j - 1, i + 1],
        [j - 2, i + 2],
        [j - 3, i + 3]
      ]

      const result = loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }
}

const loopThroughValues = (coordinates: number[][], values: number[], boolCheck: boolean) => {
  const participants: number[] = [playerStatus.value, botValue]

  for (let i = 0; i < 2; i++) {
    if (
      values[0] == participants[i] &&
      values[1] == participants[i] &&
      values[2] == participants[i] &&
      values[3] == participants[i]
    ) {
      if (boolCheck) {
        for (const coords of coordinates) {
          const [x, y] = coords
          board[x][y] = 4
        }

        return determineWinner(participants[i])
      } else {
        return true
      }
    }
  }
  return false
}

export const getColor = (int: number) => {
  const colors = ['', 'Red', 'Blue']
  return colors[int]
}

const determineWinner = (value: number) => {
  ShowWinner.value = true
  GameOver.value = true

  if (botGame.value) {
    if (value == botValue) {
      winnerMsg.value = 'Bot won'
    } else {
      winnerMsg.value = 'You won, congrats'
    }
  } else if (!botGame.value) {
    const color = getColor(playerStatus.value)
    winnerMsg.value = `${color} won`
  }
  return true
}
