export const three_in_a_row_pattern = (first_value: number | string, participant: number) => {
  return [
    [first_value, participant, participant, participant],
    [participant, first_value, participant, participant],
    [participant, participant, first_value, participant],
    [participant, participant, participant, first_value]
  ]
}

export const two_in_a_row_losing_pattern = (participant: number) => {
  return [...two_in_a_row_pattern(0, participant), ...two_in_a_row_pattern('*', participant)]
}

const two_in_a_row_pattern = (first: number | string, participant: number) => {
  return [
    ['*', first, participant, participant],
    ['*', participant, first, participant],
    ['*', participant, participant, first],
    [first, '*', participant, participant],
    [participant, '*', first, participant],
    [participant, '*', participant, first],
    [first, participant, '*', participant],
    [participant, first, '*', participant],
    [participant, participant, '*', first],
    [first, participant, participant, '*'],
    [participant, first, participant, '*'],
    [participant, participant, first, '*']
  ]
}

export const double_three_in_a_row_patterns = (participant: number, coords: {first: number[], last: number[]}, all_coordinates: number[][]) =>  [
  { pattern: [participant, participant, 0, 0], coords: [coords.first, all_coordinates[2]] },
  { pattern: [0, 0, participant, participant], coords: [coords.last, all_coordinates[1]] },
  { pattern: [participant, 0, participant, 0], coords: [coords.first, all_coordinates[1]] },
  { pattern: [0, participant, 0, participant], coords: [coords.last, all_coordinates[2]] },
]

export const potentially_three_in_a_row_patterns = (participant: number, coords: {first: number[], last: number[]}, all_coordinates: number[][]) =>  [

  ...double_three_in_a_row_patterns(participant, coords, all_coordinates),

  { pattern: ['*', participant, 0, participant], coords: [coords.last, all_coordinates[2]] },
  { pattern: [participant, 0, participant, '*'], coords: [coords.first, all_coordinates[1]] },
  { pattern: [participant, participant, 0, '*'], coords: [coords.first, all_coordinates[2]] },
  { pattern: ['*', 0, participant, participant], coords: [coords.last, all_coordinates[1]] },


  { pattern: ['*', participant, '*', participant], coords: [coords.last, all_coordinates[2]] },
  { pattern: [participant, '*', participant, '*'], coords: [coords.first, all_coordinates[1]] },
  { pattern: [participant, participant, '*', '*'], coords: [coords.first, all_coordinates[2]] },
  { pattern: ['*', '*', participant, participant], coords: [coords.last, all_coordinates[1]] },

]


// Old code underneath

/*export const all_two_in_a_row_patterns = (participant: number) => [
  { pattern: [participant, participant, 0, 0], index: 2 },
  { pattern: [0, 0, participant, participant], index: 1 },
  { pattern: [participant, 0, participant, 0], index: 1 },
  { pattern: [0, participant, 0, participant], index: 2 },
  { pattern: [participant, 0, 0, participant], index: 2 },
  { pattern: [0, participant, participant, 0], index: 0 },
  { pattern: [0, participant, participant, '*'], index: 0 },
  { pattern: ['*', 0, participant, participant], index: 1 },
  { pattern: ['*', participant, 0, participant], index: 2 },
  { pattern: ['*', participant, participant, 0], index: 3 },
  { pattern: [0, '*', participant, participant], index: 0 },
  { pattern: [participant, '*', 0, participant], index: 2 },
  { pattern: [participant, '*', participant, 0], index: 3 },
  { pattern: [0, participant, '*', participant], index: 0 },
  { pattern: [participant, 0, '*', participant], index: 1 },
  { pattern: [participant, participant, '*', 0], index: 3 },
  { pattern: [participant, 0, participant, '*'], index: 1 },
  { pattern: [participant, participant, 0, '*'], index: 2 }
]

export const two_values_two_zero_pattern = (participant: number) => [
  [participant, participant, 0, 0],
  [0, 0, participant, participant],
  [participant, 0, participant, 0],
  [0, participant, 0, participant],
  [0, participant, participant, 0],
  [participant, 0, 0, participant]
]

export const two_values_oneZero_oneAsterisk_pattern = (participant: number) => [
  [0, participant, participant, '*'],
  ['*', 0, participant, participant],
  ['*', participant, 0, participant],
  ['*', participant, participant, 0],
  [0, '*', participant, participant],
  [participant, '*', 0, participant],
  [participant, '*', participant, 0],
  [0, participant, '*', participant],
  [participant, 0, '*', participant],
  [participant, participant, '*', 0],
  [participant, 0, participant, '*'],
  [participant, participant, 0, '*']
]

class PatternWithPlacementIndex {
  pattern: _pattern
  index: number
  constructor(pattern: (string | number)[], placement_index: number) {
    this.pattern = pattern
    this.index = placement_index
  }
}

export class one_piece_pattern {
  pattern: PatternWithPlacementIndex[]
  constructor(value: number) {
    this.pattern = [
      new PatternWithPlacementIndex([value, 0, 0, 0], 2),
      new PatternWithPlacementIndex([0, value, 0, 0], 3),
      new PatternWithPlacementIndex([0, 0, value, 0], 0),
      new PatternWithPlacementIndex([0, 0, 0, value], 1)
    ]
  }
}

export class two_diff_pieces_and_Zero_pattern {
  pattern: PatternWithPlacementIndex[]
  constructor(first: number, second: number) {
    this.pattern = [
      new PatternWithPlacementIndex([first, second, second, 0], 3),
      new PatternWithPlacementIndex([first, second, 0, second], 2),
      new PatternWithPlacementIndex([first, 0, second, second], 1),
      new PatternWithPlacementIndex([0, first, second, second], 0),
      new PatternWithPlacementIndex([second, first, 0, second], 2),
      new PatternWithPlacementIndex([second, first, second, 0], 3),
      new PatternWithPlacementIndex([second, second, first, 0], 3),
      new PatternWithPlacementIndex([second, 0, first, second], 1),
      new PatternWithPlacementIndex([0, second, first, second], 0),
      new PatternWithPlacementIndex([0, second, second, first], 0),
      new PatternWithPlacementIndex([second, 0, second, first], 1),
      new PatternWithPlacementIndex([second, second, 0, first], 2)
    ]
  }
}

export class one_of_each_patterns {
  pattern: PatternWithPlacementIndex[]
  constructor(botValue: number, participant: number | string) {
    this.pattern = [
      new PatternWithPlacementIndex([0, '*', botValue, participant], 0),
      new PatternWithPlacementIndex([0, '*', participant, botValue], 0),
      new PatternWithPlacementIndex([0, botValue, '*', participant], 0),
      new PatternWithPlacementIndex([0, botValue, participant, '*'], 0),
      new PatternWithPlacementIndex([0, participant, '*', botValue], 0),
      new PatternWithPlacementIndex([0, participant, botValue, '*'], 0),
      new PatternWithPlacementIndex(['*', 0, botValue, participant], 1),
      new PatternWithPlacementIndex(['*', 0, participant, botValue], 1),
      new PatternWithPlacementIndex([botValue, 0, '*', participant], 1),
      new PatternWithPlacementIndex([botValue, 0, participant, '*'], 1),
      new PatternWithPlacementIndex([participant, 0, '*', botValue], 1),
      new PatternWithPlacementIndex([participant, 0, botValue, '*'], 1),
      new PatternWithPlacementIndex(['*', botValue, 0, participant], 2),
      new PatternWithPlacementIndex(['*', participant, 0, botValue], 2),
      new PatternWithPlacementIndex([participant, botValue, 0, '*'], 2),
      new PatternWithPlacementIndex([botValue, '*', 0, participant], 2),
      new PatternWithPlacementIndex([botValue, participant, 0, '*'], 2),
      new PatternWithPlacementIndex([participant, '*', 0, botValue], 2),
      new PatternWithPlacementIndex([botValue, '*', participant, 0], 3),
      new PatternWithPlacementIndex([botValue, participant, '*', 0], 3),
      new PatternWithPlacementIndex([participant, '*', botValue, 0], 3),
      new PatternWithPlacementIndex(['*', participant, botValue, 0], 3),
      new PatternWithPlacementIndex([participant, botValue, '*', 0], 3),
      new PatternWithPlacementIndex(['*', botValue, participant, 0], 3)
    ]
  }
}

export class botOne_ParticipantOne_TwoZero_patterns {
  pattern: PatternWithPlacementIndex[]
  constructor(botValue: number, participant: number) {
    this.pattern = [
      new PatternWithPlacementIndex([0, 0, botValue, participant], 0),
      new PatternWithPlacementIndex([0, botValue, 0, participant], 2),
      new PatternWithPlacementIndex([botValue, 0, 0, participant], 2),
      new PatternWithPlacementIndex([0, botValue, participant, 0], 3),
      new PatternWithPlacementIndex([botValue, 0, participant, 0], 3),
      new PatternWithPlacementIndex([0, 0, participant, botValue], 1),
      new PatternWithPlacementIndex([0, participant, botValue, 0], 0),
      new PatternWithPlacementIndex([0, participant, 0, botValue], 0),
      new PatternWithPlacementIndex([botValue, participant, 0, 0], 2),
      new PatternWithPlacementIndex([participant, 0, 0, botValue], 1),
      new PatternWithPlacementIndex([participant, botValue, 0, 0], 3),
      new PatternWithPlacementIndex([participant, 0, botValue, 0], 3)
    ]
  }
}

export const checkPatternForThreeInARow = (
  direction: string,
  pattern_arr: _pattern,
  coordinates: _coordinates,
  participant: number,
  losing: { bool: boolean; instances: number }
) => {
  const winningPatterns = three_in_a_row_pattern(0, participant)

  for (let i: number = 0; i < winningPatterns.length; i++) {
    if (arraysEqual(pattern_arr, winningPatterns[i])) {
      return {
        pattern: pattern_arr,
        coordinates: [coordinates[i][0], coordinates[i][1]],
        all_coordinates: coordinates,
        direction: direction,
        losing: losing,
        participant: participant
      }
    }
  }
  return false
}

export const checkPatternForTwoInARow = (
  direction: string,
  pattern_arr: _pattern,
  coordinates: _coordinates,
  participant: number,
  losing: { bool: boolean; instances: number }
) => {
  for (const schema of all_two_in_a_row_patterns(participant)) {
    const i = schema.index
    if (arraysEqual(pattern_arr, schema.pattern)) {
      return {
        pattern: pattern_arr,
        coordinates: [coordinates[i][0], coordinates[i][1]],
        all_coordinates: coordinates,
        direction: direction,
        losing: losing,
        participant: participant
      }
    }
  }
  return false
}
export const checkPatternForLastBestMove = (
  direction: string,
  pattern_arr: _pattern,
  coordinates: _coordinates,
  participant: number,
  losing: { bool: boolean; instances: number }
) => {
  const createPatterns = (participant: number) => {
    let patterns: Array<PatternWithPlacementIndex> = []

    const secondValue = participant == botValue ? playerStatus.value : botValue

    patterns = patterns.concat(new one_piece_pattern(participant).pattern)

    for (const schema of new one_of_each_patterns(secondValue, participant).pattern) {
      patterns.push(schema)
    }

    for (const schema of new one_of_each_patterns(participant, '*').pattern) {
      patterns.push(schema)
    }

    patterns = patterns.concat(
      new two_diff_pieces_and_Zero_pattern(secondValue, participant).pattern
    )
    for (const schema of new botOne_ParticipantOne_TwoZero_patterns(secondValue, participant)
      .pattern) {
      patterns.push(schema)
    }

    return patterns
  }

  for (const { pattern, index } of createPatterns(participant)) {
    if (arraysEqual(pattern_arr, pattern)) {
      return {
        pattern: pattern_arr,
        coordinates: [coordinates[index][0], coordinates[index][1]],
        all_coordinates: coordinates,
        direction: direction,
        losing: losing,
        participant: participant
      }
    }
  }
  return false
}*/
