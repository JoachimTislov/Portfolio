export type _pattern = (string | number)[]
export type _coordinates = number[][]
export type _patternData = Array<{ pattern: _pattern; coordinates: _coordinates }>

export type consecutive_algorithm_T = {
  func: () => false | possible_Coordinates
  coordinates: _coordinates
}

export type patterns_with_coordinates_info_entry_T = {
  pattern: _pattern
  coordinates: number[]
  all_coordinates: _coordinates
  losing: { bool: boolean; instances: number }
  participant: number
}

export type _losingCoordinates = {
  coordinates: number[]
  direction: string
  pattern: _pattern
  all_coordinates: _coordinates
  player_identifier: number
  piece_count: string
  instances: number
  relevantMoves: relevantMovesType
  potentiallyDoubleThreeInARow: boolean
}[]

export type relevantMovesType = { bot_instances: instanceType[], player_instances: instanceType[] }

export type relatedArraysType = {targetArr: instanceType[], arr: filterObject[]}[]

export type possible_Choices = {
  [key: string]: possible_Coordinates[]
}

export type filterArray = columnInformation[]

export type columnInformation = {
  coords: number[]
  player_threats: filterObject[]
  bots_opportunities: filterObject[]
}

export type DThree =  false | {
    success: boolean;
    coords: number[];
}

export type filterObject = {
  coords: number[]
  piece_count: string
  instances: number
  direction: string
  pattern: _pattern
  all_coordinates: number[][]
  // P - Potentially, D - Double
  PDThreeInARow: boolean
  relevantMoves: relevantMovesType
}

export type possible_Coordinates = {
  pattern: _pattern
  coordinates: number[]
  all_coordinates: number[][]
  direction: string
  losing: { bool: boolean; bot_instances: instanceType[]; player_instances: instanceType[] }
  participant: number
  piece_count: string
} 

type instanceType = {
  piece_count: string
  relativeRowIndex: number
  potentiallyDoubleThreeInARow: boolean
  coords: number[]
}

export type algorithm = {
  [key: string]: {
    func: () => false | possible_Coordinates
    coordinates: _coordinates
  }
}

