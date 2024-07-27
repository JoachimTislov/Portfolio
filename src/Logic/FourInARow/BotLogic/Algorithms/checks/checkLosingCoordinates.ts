import { losing_Coordinates } from "@/Logic/FourInARow/GameLogic/variables"
import { arraysEqual } from "../../ArrayLogic"
import type { _losingCoordinates, _pattern } from "@/Logic/FourInARow/Types"

export const checkLosingCoordinates = (
  pattern: _pattern,
  coordinates: number[],
  participant: number,
  direction: string,
  piece_count: string
) => {
  if (direction == 'vertical') return false
  const coordsList = constructLosingCoordinatesList(losing_Coordinates.value)
  
  for (let i = 0; i < losing_Coordinates.value.length; i++) {
    const losingCoords = losing_Coordinates.value[i]

    if(arraysEqual(coordsList[i], coordinates)) {
      // Canceling out two in a row losing moves if three a already a three in a row threat there
      if(losingCoords.piece_count == 'Three' && piece_count != 'Three') return false

      if (losingCoords.piece_count == 'Two' && piece_count == 'Three') {
          losingCoords.piece_count = piece_count
          losingCoords.instances = 1
          losingCoords.pattern = pattern
      }

      if (losingCoords.piece_count == piece_count) {
        losingCoords.instances++
      }

      if(losingCoords.player_identifier == participant) {
        
        return false
      } 
    }
  }
  return true
}

const constructLosingCoordinatesList = (
  losing_Coordinates: _losingCoordinates
) => {
  const coordinates_list = []
  for (const entry of losing_Coordinates) {
    coordinates_list.push(entry.coordinates)
  }
  return coordinates_list
}