import { losing_Coordinates } from '@/Logic/FourInARow/GameLogic/variables'
import type { possible_Coordinates } from '@/Logic/FourInARow/Types'

export function checkIfItsARecordInLosingCoordinates(
  coords: number[] | undefined,
  possible_Coordinates_Entry: possible_Coordinates
) {
  if (!coords) {
    return false
  }

  const key = JSON.stringify(coords)

  const L = losing_Coordinates.value[key][possible_Coordinates_Entry.participant]
  if (L.Two && L.Three) {
    return true
  }

  return false
}
