import { playerStatus } from '@/Logic/FourInARow/GameLogic/variables'
import type { _pattern } from '@/Logic/FourInARow/Types'

export function getAmountOfConnections(pattern: _pattern) {
  let connections = 0

  for (let i = 0; i < pattern.length; i++) {
    if (typeof pattern[i] === 'number' && pattern[i] != 0) {
      connections++

      if (pattern[i] == playerStatus.value || (i < 3 && pattern[i + 1] == playerStatus.value)) {
        return connections
      }
    }
  }

  return connections
}
