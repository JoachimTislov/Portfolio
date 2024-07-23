export const getFourthAndFifthCoordinates = (coordinates: number[][]) => {
  const first = [
    2 * coordinates[0][0] - coordinates[1][0],
    2 * coordinates[0][1] - coordinates[1][1]
  ]
  const last = [
    2 * coordinates[3][0] - coordinates[2][0],
    2 * coordinates[3][1] - coordinates[2][1]
  ]

  return { first: first, last: last }
}