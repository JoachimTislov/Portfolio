import { losing_Coordinates } from '@/Logic/FourInARow/GameLogic/variables'

export function checkIfItsARecordInLosingCoordinates(
  coords: number[] | undefined,
  participant: number
) {
  if (!coords) {
    return false
  }

  const key = JSON.stringify(coords)

  if (losing_Coordinates.value[key][participant].Three) {
    return true
  }

  return false
}
