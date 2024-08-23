import { describe, it, expect, test } from 'vitest'
import { initiateAlgorithms } from '../src/Logic/FourInARow/BotLogic/BotInit'
import { scanBoard } from '@/Logic/FourInARow/BotLogic/scanLogic'
import { vi } from 'vitest'

import { emptyBoard, testBoards } from './testBoards'
import { emptyScanOfBoard } from './EmptyScanOfBoard'

describe('Scanning a 7x6 board', () => {
  it('scans properly', () => {
    const patterns = scanBoard(1, emptyBoard)

    expect(patterns).toEqual(emptyScanOfBoard)
  })
})

vi.mock('@/Logic/FourInARow/delay', () => ({
  delay: vi.fn().mockResolvedValue(undefined)
}))

for (let index = 0; index < testBoards.length; index++) {
  test(`Test Case ${index + 1}; ${testBoards[index].description}`, async () => {
    expect(await initiateAlgorithms(testBoards[index].board)).toStrictEqual(
      testBoards[index].expect_coordinate
    )
  })
}
