import { losing_Coordinates } from '@/Logic/FourInARow/GameLogic/variables'
import { arraysEqual } from '../../ArrayLogic'
import type { possible_Coordinates } from '@/Logic/FourInARow/Types'

export function checkIfItsARecordInLosingCoordinates(
  coords: number[] | undefined,
  possible_Coordinates_Entry: possible_Coordinates
) {
  if (!coords) {
    return false
  }

  for (const entry of losing_Coordinates.value) {
    const result = arraysEqual(coords, entry.coordinates)
    if (
      result &&
      possible_Coordinates_Entry.participant == entry.player_identifier &&
      possible_Coordinates_Entry.piece_count != entry.piece_count
    ) {
      return true
    }
  }

  return false
}
