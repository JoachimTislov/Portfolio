export type _pattern = (string | number)[]
export type _coordinates = number[][]
export type _patternData = Array<{ pattern: _pattern; coordinates: _coordinates }>

export type spotInfo = {
  pattern: (number | string)[]
  coords: number[][]
}

export type Losing_Coordinates = {
  [key: string]: {
    [key: number]: {
      [key: string]: Losing_Coordinates_Entry
    }
    status?: { highest_piece_count: string; participant: number; count: number }
  }
}

export type Losing_Coordinates_Entry = {
  direction: string
  pattern: _pattern
  all_coordinates: _coordinates
  relatedMovesOfOtherZeroOrAsterisk: columnInformation | undefined
  potentiallyDoubleThreeInARow: boolean
}[]

export type possible_Choices = {
  [key: string]: possible_Coordinates[]
  prime_double_Three_in_a_row: possible_Coordinates[]
  non_prime_double_Three_in_a_row: possible_Coordinates[]
  two_sided_three_in_a_row: possible_Coordinates[]
  Two_in_a_row: possible_Coordinates[]
  One_in_a_row: possible_Coordinates[]
}

export type columnInformation = {
  coords: number[]
  player_threats: filterObject[]
  bots_opportunities: filterObject[]
}

export type filterObject = {
  coords: number[]
  piece_count: string
  direction: string
  pattern: _pattern
  all_coordinates: number[][]
  potentialDoubleThreeInARow: boolean
  relatedMovesOfOtherZeroOrAsterisk: columnInformation | undefined
}

export type relatedMovesObject = {
  zero: columnInformation
  first: columnInformation | undefined
  second: columnInformation | undefined
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

export type Log = {
  past: LogEntry[]
  future: LogEntry[]
}

export type LogEntry = {
  coords: number[]
  participant: number
}
