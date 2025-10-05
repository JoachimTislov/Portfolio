import type { possible_Coordinates } from '@/logic/ConnectFour/types'
import { scanBoard } from '../../scanLogic'
import { getAmountOfConnections } from './getAmountOfConnections'
import { botValue } from '@/logic/ConnectFour/GameLogic/variables'

export function getMoveWithMostConnections(
  board: number[][],
  arr: possible_Coordinates[]
) {
  let choice_with_most_connections: possible_Coordinates | object = {}
  let choice_connections = 0

  for (const entry of arr) {
    const patterns = scanBoard(entry.participant, board, entry.coordinates)

    let connections = 0

    for (const pattern_arr of patterns) {
      for (const item of pattern_arr.sequence) {
        connections += getAmountOfConnections(item.pattern)
      }
    }

    if (
      choice_connections < connections ||
      (choice_connections == connections && entry.participant == botValue)
    ) {
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
