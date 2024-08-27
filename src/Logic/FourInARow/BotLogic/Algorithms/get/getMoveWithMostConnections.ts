import type { possible_Coordinates } from '@/Logic/FourInARow/Types'
import { scanBoard } from '../../scanLogic'
import { getAmountOfConnections } from './getAmountOfConnections'
import { botValue, playerStatus } from '@/Logic/FourInARow/GameLogic/variables'

export function getMoveWithMostConnections(board: number[][], arr: possible_Coordinates[]) {
  let choice_with_most_connections: possible_Coordinates | {} = {}
  let choice_connections = 0

  for (const entry of arr) {
    const patterns = scanBoard(entry.participant, board, entry.coordinates)

    let connections = 0

    const opponentValue = entry.participant == botValue ? playerStatus.value : botValue

    for (const pattern_arr of patterns) {
      for (const item of pattern_arr.sequence) {
        connections += getAmountOfConnections(opponentValue, entry.participant, item.pattern)
      }
    }

    if (choice_connections < connections) {
      choice_connections = connections
      choice_with_most_connections = entry
    }
  }

  if (choice_connections != 0) {
    return {
      connections: choice_connections,
      coords: (choice_with_most_connections as possible_Coordinates).coordinates
    }
  } else {
    return false
  }
}
