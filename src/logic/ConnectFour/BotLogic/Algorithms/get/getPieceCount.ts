import { botValue, playerValue } from '../../../GameLogic/variables'
import type { _pattern } from '../../../types'

export const getPieceCount = (pattern: _pattern, participant: number) => {
  let counter = 0
  const otherParticipant = participant == botValue ? playerValue : botValue
  for (const value of pattern) {
    if (value == participant) {
      counter++
    } else if (value == otherParticipant) {
      return 'One'
    }
  }

  const piece_count = counter == 3 ? 'Three' : counter == 2 ? 'Two' : 'One'

  return piece_count
}
