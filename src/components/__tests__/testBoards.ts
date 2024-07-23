export const emptyBoard = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

export const testBoards = [
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [3, 3],
    description: 'Blocking three in a row'
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 3, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [3, 3],
    description: 'Winning move, three in a row'
  },
  {
    board: [
      [1, 3, 1, 3, 1, 3],
      [3, 1, 3, 1, 3, 1],
      [1, 3, 1, 3, 1, 3],
      [3, 1, 3, 1, 3, 1],
      [1, 3, 1, 3, 1, 3],
      [3, 1, 3, 1, 3, 1],
      [1, 3, 1, 3, 1, 3]
    ],
    expect_coordinate: undefined,
    description: 'No valid moves'
  },
  {
    board: [
      [1, 0, 0, 0, 0, 0],
      [3, 1, 0, 0, 0, 0],
      [3, 3, 1, 0, 0, 0],
      [3, 3, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [3, 3],
    description: 'Blocking, and winning move'
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [3, 1, 1, 0, 0, 0],
      [1, 1, 1, 3, 0, 0],
      [1, 1, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [3, 5],
    description: 'Height of scan, last index of column, three in a row winning move'
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [1, 1],
    description: 'Wanted building and also blocking'
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 3, 3, 1, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [1, 1],
    description: 'Blocking potential double three in a row'
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [3, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 3, 0, 0, 0],
      [1, 3, 1, 3, 0, 0],
      [3, 1, 3, 1, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [2, 0],
    description: 'Is willing to sacrifice a three in a row to avoid losing the game'
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 3, 0, 0],
      [1, 3, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [2, 0],
    description: "Accepts the loss"
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [3, 1, 3, 3, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 3, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [5, 0],
    description: "Blocking double three in a row, and avoiding losing the game"
  },
  {
    board: [
      [1, 3, 0, 0, 0, 0],
      [3, 1, 1, 3, 1, 1],
      [3, 0, 0, 0, 0, 0],
      [1, 1, 3, 3, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 1, 3, 1, 1, 0],
      [3, 3, 1, 3, 3, 0]
    ],
    expect_coordinate: [2, 1],
    description: "Blocking three in a row, in the middle"
  },
  {
    board: [
      [3, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 3, 3, 3, 1],
      [3, 1, 3, 3, 3, 1],
      [1, 3, 1, 1, 3, 3],
      [1, 1, 0, 0, 0, 0],
      [1, 3, 0, 0, 0, 0]
    ],
    expect_coordinate: [0, 2],
    description: "Avoiding losing, and building three in a row, while also not prioritizing blocking vertical two in a row"
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [3, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 3, 1, 3, 0, 0],
      [1, 1, 3, 1, 0, 0],
      [1, 1, 3, 1, 1, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [4, 4],
    description: "Avoiding losing a potential three in a row opportunity and building a three in a row"
  },
  {
    board: [
      [3, 3, 3, 1, 3, 1],
      [1, 3, 1, 3, 1, 3],
      [0, 0, 0, 0, 0, 0],
      [1, 3, 1, 3, 1, 1],
      [3, 1, 3, 1, 3, 1],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [5, 1],
    description: "Building double three in a row, and letting the player achieve the same later"
  },
  {
    board: [
      [3, 1, 0, 0, 0, 0],
      [1, 1, 1, 3, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 3, 1, 1, 1, 3],
      [3, 1, 3, 3, 3, 1],
      [3, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [0, 2],
    description: "Letting player get a three in a row and building three in a row"
  },
  {
    board: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [3, 1, 3, 1, 3, 0],
      [0, 0, 0, 0, 0, 0],
      [3, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    expect_coordinate: [6, 0],
    description: "Avoiding a losing move and blocking two three in a rows the right way. Since the player has two - two in a rows."
  }
]
