export type _pattern = (string | number)[]
export type _coordinates = number[][]
export type _patternData = Array<{ pattern: _pattern; coordinates: _coordinates }>

export type spotInfo = { 
  pattern: (number | string)[]; 
  coords: number[][]
}

export type _losingCoordinates = {
  coordinates: number[]
  direction: string
  pattern: _pattern
  all_coordinates: _coordinates
  player_identifier: number
  piece_count: string
  instances: number
  relatedMovesOfOtherZeroOrAsterisk: columnInformation | undefined
  potentiallyDoubleThreeInARow: boolean
}[]

export type possible_Choices = {
  double_Three_in_a_row: possible_Coordinates[],
  potentially_double_Three_in_a_row: possible_Coordinates[],
  Two_in_a_row: possible_Coordinates[][]
}

export type columnInformation = {
  coords: number[]
  player_threats: filterObject[]
  bots_opportunities: filterObject[]
} 

export type filterObject = {
  coords: number[]
  piece_count: string
  instances: number
  direction: string
  pattern: _pattern
  all_coordinates: number[][]
  potentialDoubleThreeInARow: boolean
  relatedMovesOfOtherZeroOrAsterisk: columnInformation | undefined
}

export type relatedMovesObject = { 
  first: columnInformation
  second: columnInformation | undefined
  third: columnInformation | undefined
}

export type possible_Coordinates = {
  pattern: _pattern
  coordinates: number[]
  all_coordinates: number[][]
  direction: string
  losing: boolean
  relatedMoves: relatedMovesObject
  winning: boolean
  participant: number
  piece_count: string
} 


