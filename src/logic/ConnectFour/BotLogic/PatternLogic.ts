export const three_in_a_row_pattern = (first_value: number | string, participant: number) => {
  return [
    [first_value, participant, participant, participant],
    [participant, first_value, participant, participant],
    [participant, participant, first_value, participant],
    [participant, participant, participant, first_value]
  ]
}

export const three_in_a_row_pattern_with_index = (
  first_value: number | string,
  participant: number
) => {
  return [
    { pattern: [first_value, participant, participant, participant], zeroIndex: 0 },
    { pattern: [participant, first_value, participant, participant], zeroIndex: 1 },
    { pattern: [participant, participant, first_value, participant], zeroIndex: 2 },
    { pattern: [participant, participant, participant, first_value], zeroIndex: 3 }
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

export const prime_two_in_a_row_pattern = (participant: number) => {
  return [
    [participant, participant, 0, 0],
    [0, 0, participant, participant],
    [participant, 0, participant, 0],
    [0, participant, 0, participant],
    [participant, 0, 0, participant],
    [0, participant, participant, 0]
  ]
}

export const double_three_in_a_row_patterns = (
  participant: number,
  coords: { first: number[]; last: number[] },
  all_coordinates: number[][]
) => [
  { pattern: [participant, participant, 0, 0], coords: [coords.first, all_coordinates[2]] },
  { pattern: [0, 0, participant, participant], coords: [coords.last, all_coordinates[1]] },
  { pattern: [participant, 0, participant, 0], coords: [coords.first, all_coordinates[1]] },
  { pattern: [0, participant, 0, participant], coords: [coords.last, all_coordinates[2]] }
]

export const potentially_three_in_a_row_patterns = (
  participant: number,
  coords: { first: number[]; last: number[] },
  all_coordinates: number[][]
) => [
  { pattern: ['*', participant, 0, participant], coords: [coords.last, all_coordinates[2]] },
  { pattern: [participant, 0, participant, '*'], coords: [coords.first, all_coordinates[1]] },
  { pattern: [participant, participant, 0, '*'], coords: [coords.first, all_coordinates[2]] },
  { pattern: ['*', 0, participant, participant], coords: [coords.last, all_coordinates[1]] },

  { pattern: [0, participant, '*', participant], coords: [coords.last, all_coordinates[2]] },
  { pattern: [participant, '*', participant, 0], coords: [coords.first, all_coordinates[1]] },
  { pattern: [participant, participant, '*', 0], coords: [coords.first, all_coordinates[2]] },
  { pattern: [0, '*', participant, participant], coords: [coords.last, all_coordinates[1]] },

  { pattern: [0, participant, participant, '*'], coords: [coords.last, all_coordinates[0]] },
  { pattern: ['*', participant, participant, 0], coords: [coords.first, all_coordinates[3]] },

  { pattern: ['*', participant, '*', participant], coords: [coords.last, all_coordinates[2]] },
  { pattern: [participant, '*', participant, '*'], coords: [coords.first, all_coordinates[1]] },
  { pattern: [participant, participant, '*', '*'], coords: [coords.first, all_coordinates[2]] },
  { pattern: ['*', '*', participant, participant], coords: [coords.last, all_coordinates[1]] }
]
