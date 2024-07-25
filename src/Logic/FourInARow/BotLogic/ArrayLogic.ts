import { losing_Coordinates } from '../GameLogic/variables'
import type { _losingCoordinates, _pattern } from '../Types'

export const checkIfArrayInThe2DArrayEqualArray = (
  arr: (string | number)[][],
  arr_2: (string | number)[]
) => {
  for (const entry of arr) {
    if (arraysEqual(entry, arr_2)) {
      return true
    }
  }
  return false
}
export const checkLosingCoordinates = (
  pattern: _pattern,
  coordinates: number[],
  participant: number,
  direction: string,
  piece_count: string
) => {
  if (direction == 'vertical') return false
  const arr = constructLosingCoordinatesList(losing_Coordinates.value)
  
  for (let i = 0; i < losing_Coordinates.value.length; i++) {
    if (
      arraysEqual(arr[i], coordinates) &&
      losing_Coordinates.value[i].player_identifier == participant
    ) {
      if (losing_Coordinates.value[i].piece_count == 'Two' && piece_count == 'Three') {

        losing_Coordinates.value[i].piece_count = piece_count
        losing_Coordinates.value[i].instances = 1
        losing_Coordinates.value[i].pattern = pattern

      }
      if (losing_Coordinates.value[i].piece_count == piece_count) {
        losing_Coordinates.value[i].instances++
      }
      return false
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

export const arraysEqual = (arr1: (string | number)[], arr2: (string | number)[]) => {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}
