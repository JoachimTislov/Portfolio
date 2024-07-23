import { describe, it, expect, test } from 'vitest'

import { scanBoard, initiateAlgorithms } from '../../Logic/FourInARow/AI'

import { vi } from 'vitest'
import { emptyBoard, testBoards } from './testBoards'
import { emptyScanOfBoard } from './EmptyScanOfBoard'

describe('Scanning a 7x6 board', () => {
  it('scans properly', () => {
    const patterns = scanBoard(emptyBoard, 1)

    expect(patterns).toEqual(emptyScanOfBoard)
  })
})

vi.mock('../../Logic/FourInARow/delay', () => ({
  delay: vi.fn().mockResolvedValue(undefined),
}));

for (let index = 0; index < testBoards.length; index++) {
  test(`Test Case ${index + 1}; ${testBoards[index].description}`, async () => {
      expect(await initiateAlgorithms(testBoards[index].board)).toStrictEqual(testBoards[index].expect_coordinate)
  })
}
