import { sendMail } from '@/logic/Email/sendMail'
import { board, botValue, GameOver, log, name, playerValue, winnerMsg } from './variables'

export const checkWinner = async (boolCheck: boolean) => {
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

      const coords = [
        [j, i],
        [j + 1, i],
        [j + 2, i],
        [j + 3, i]
      ]

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

      const coords = [
        [j, i],
        [j + 1, i + 1],
        [j + 2, i + 2],
        [j + 3, i + 3]
      ]

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

      const coords = [
        [j, i],
        [j - 1, i + 1],
        [j - 2, i + 2],
        [j - 3, i + 3]
      ]

      const result = await loopThroughValues(coords, values, boolCheck)
      if (result != false) {
        return result
      }
    }
  }
}

const loopThroughValues = async (coordinates: number[][], values: number[], boolCheck: boolean) => {
  const participants: number[] = [playerValue, botValue]

  for (let i = 0; i < 2; i++) {
    if (
      values[0] == participants[i] &&
      values[1] == participants[i] &&
      values[2] == participants[i] &&
      values[3] == participants[i]
    ) {
      if (boolCheck) {
        const result = await determineWinner(participants[i], coordinates)
        return result
      } else {
        return true
      }
    }
  }
  return false
}

const determineWinner = async (value: number, coordinates: number[][]) => {
  let text = "Something stupid happened"

  if (value == botValue) {
    winnerMsg.value = 'Bot won'
    text = `I won against: ${name.value != '' ? name.value : 'Unknown'}`
  } else {
    winnerMsg.value = 'You won, congrats'
    text = `I lost against: ${name.value != '' ? name.value : 'Unknown'} and I’m so sorry, truly I am. I will strive to do better next time, 
    but my performance hinges upon the state of my algorithms. 
    They are in dire need of an update. 
    Might I humbly request that you analyze the game? Your insight would be most invaluable in helping me improve.`
  }

  sendMail(
    text,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    JSON.stringify(board),
    JSON.stringify(log.value)
  )

  // Changing coordinates colors to green
  for (const coords of coordinates) {
    const [x, y] = coords
    board[x][y] = 3
  }

  GameOver.value = true

  return true
}
