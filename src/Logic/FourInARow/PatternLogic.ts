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