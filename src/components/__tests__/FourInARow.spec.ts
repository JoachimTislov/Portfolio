import { describe, it, expect, test } from 'vitest'

//import { mount } from '@vue/test-utils'
import { scanBoard, initiateAlgorithms } from '../../Logic/FourInARow/AI'

describe('Scanning a 7x6 board', () => {
  it('scans properly', () => {
    const board = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]

    const patterns = scanBoard(board, 1)

    expect(patterns).toEqual([
      {
        "direction": "vertical",
        "sequence": [],
      },
      {
        "direction": "horizontal_right",
        "sequence": [],
      },
      {
      "direction": "horizontal_left",
        "sequence": [],
      },
      {
        "direction": "cross_up_right",
        "sequence": [],
      },
      {
      "direction": "cross_up_left",
        "sequence": [],
      },
      {
        "direction": "cross_down_right",
        "sequence": [],
      },
      {
        "direction": "cross_down_left",
        "sequence": [],
      },
    ])
  })
})

const testBoards = [
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
    expect_coordinate: [3, 3]
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
    expect_coordinate: [3, 3]
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
    expect_coordinate: undefined // No valid moves left
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
    expect_coordinate: [3, 3]
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
    expect_coordinate: [3, 5]
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
    expect_coordinate: [1, 1]
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
    expect_coordinate: [1, 1]
  },
  // Testing, willing to sacrifice a three in a row to avoid losing the game
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
    expect_coordinate: [2, 0]
  },
  // Testing accepting the loss
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
    expect_coordinate: [2, 0]
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
    expect_coordinate: [5, 0]
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
    expect_coordinate: [2, 1]
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
    expect_coordinate: [0, 2]
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
    expect_coordinate: [4, 4]
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
    expect_coordinate: [5, 1]
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
    expect_coordinate: [0, 2]
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
    expect_coordinate: [6, 0]
  }
]

for (let index = 0; index < testBoards.length; index++) {
  test(`Test Case ${index + 1}`, () => {
    expect(initiateAlgorithms(testBoards[index].board)).toStrictEqual(
      testBoards[index].expect_coordinate
    )
  })
}
