import type { _pattern } from '@/Logic/FourInARow/Types'

export function getAmountOfConnections(
  opponentValue: number,
  participant: number,
  pattern: _pattern
) {
  let connections = 0

  for (const value of pattern) {
    if (value == opponentValue) {
      return connections
    } else if (value == participant) {
      connections++
    }
  }

  return connections
}
