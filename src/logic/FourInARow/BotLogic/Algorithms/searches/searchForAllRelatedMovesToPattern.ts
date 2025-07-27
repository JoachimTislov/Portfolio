import { botValue, losing_Coordinates, playerValue } from '../../../GameLogic/variables'
import type { columnInformation, filterObject } from '../../../Types'

export const find_all_related_moves_to_given_pattern = (zeroCoords: number[]) => {
  const arr: columnInformation = { coords: zeroCoords, player_threats: [], bots_opportunities: [] }
  for (const key of Object.keys(losing_Coordinates.value)) {
    const coordinates = JSON.parse(key)
    const entry = losing_Coordinates.value[key]

    if (coordinates[0] == zeroCoords[0]) {
      const colIndex = coordinates[1] - zeroCoords[1]
      const [x, y] = coordinates

      for (const object of [
        { arr: arr.bots_opportunities, participant: botValue },
        { arr: arr.player_threats, participant: playerValue }
      ]) {
        const arr_entry: filterObject = {
          coords: [x, y],
          piece_count: '',
          direction: '',
          pattern: [],
          all_coordinates: [],
          potentialDoubleThreeInARow: false,
          relatedMovesOfOtherZeroOrAsterisk: undefined
        }

        let item
        if (entry[object.participant]) {
          if (entry[object.participant].Three) {
            item = entry[object.participant].Three[0]
            arr_entry.piece_count = 'Three'
          } else {
            item = entry[object.participant].Two[0]
            arr_entry.piece_count = 'Two'
          }
        }
        if (item) {
          arr_entry.direction = item.direction
          arr_entry.pattern = item.pattern
          arr_entry.all_coordinates = item.all_coordinates
          arr_entry.potentialDoubleThreeInARow = item.potentiallyDoubleThreeInARow
          arr_entry.relatedMovesOfOtherZeroOrAsterisk = item.relatedMovesOfOtherZeroOrAsterisk

          object.arr[colIndex] = arr_entry
        }
      }
    }
  }

  return arr
}
