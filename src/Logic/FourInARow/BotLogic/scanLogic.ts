import { piecesInARow } from '../GameLogic/variables'
import type { _coordinates, _pattern, _patternData } from '../Types'

const evaluateOperation = (colIndex: number, offset: number, colOperation: string) => {
  const operation: { [key: string]: (a: number, b: number) => number } = {
    '-': (a: number, b: number) => a - b,
    '+': (a: number, b: number) => a + b
  }

  return operation[colOperation](colIndex, offset)
}

const scanDirection = (
  board: number[][],
  colIndex: number,
  rowIndex: number,
  colOperation: string | undefined,
  rowOperation: string | undefined,
  _offset: number | undefined,
  pairOfCoordinates?: number[]
) => {
  const pattern_arr: _pattern = []
  const coordinates: _coordinates = []

  const __offset = _offset != undefined ? _offset : 0

  for (let offset = __offset; offset < piecesInARow + __offset; offset++) {
    const colValue =
      colOperation != undefined ? evaluateOperation(colIndex, offset, colOperation) : colIndex

    const rowValue =
      rowOperation != undefined ? evaluateOperation(rowIndex, offset, rowOperation) : rowIndex

    if (colValue > 6 || colValue < 0 || rowValue < 0 || rowValue > 5) {
      if (pairOfCoordinates) {
        return { pattern: pattern_arr, coordinates: coordinates }
      } else {
        return false
      }
    }

    let slot: string | number = board[colValue][rowValue]
    // Check if the slot below is empty (for vertical placement logic)
    if (rowValue > 0 && board[colValue][rowValue - 1] == 0) {
      slot = '*' // Marking impossible placement
    }
    coordinates.push([colValue, rowValue])
    pattern_arr.push(slot)
  }
  return { pattern: pattern_arr, coordinates: coordinates }
}

export const scanBoard = (participant: number, board: number[][], pairOfCoordinates?: number[]) => {
  const [horizontal, cross, vertical]: [
    _patternData,
    _patternData,
    _patternData,
    _patternData,
    _patternData,
    _patternData,
    _patternData
  ] = [[], [], [], [], [], [], []]

  const offset = -1

  // There is an index fault inside of directions array, idk where, but a condition in scanDirection handles it
  let directions: {
    colOperation?: string
    rowOperation?: string
    arr: _patternData
    offset?: number
  }[] = [
    // Entries with offset, is to capture rows which are cut off by the border
    { colOperation: '+', arr: horizontal },
    { colOperation: '-', arr: horizontal },
    { rowOperation: '+', arr: vertical },

    { colOperation: '+', rowOperation: '+', arr: cross },
    { colOperation: '-', rowOperation: '+', arr: cross },
    { colOperation: '+', rowOperation: '-', arr: cross },
    { colOperation: '-', rowOperation: '-', arr: cross }
  ]

  if (!pairOfCoordinates) {
    directions = [
      ...directions,
      { colOperation: '+', offset: offset, arr: horizontal },
      { colOperation: '-', offset: offset, arr: horizontal },
      {
        colOperation: '+',
        rowOperation: '+',
        offset: offset,
        arr: cross
      },
      { colOperation: '-', rowOperation: '+', offset: offset, arr: cross },
      {
        colOperation: '+',
        rowOperation: '-',
        offset: offset,
        arr: cross
      },
      { colOperation: '-', rowOperation: '-', offset: offset, arr: cross }
    ]
  } else {
    directions.push({ rowOperation: '-', arr: vertical })
  }

  if (pairOfCoordinates) {
    const [colIndex, rowIndex] = pairOfCoordinates
    for (const direction of directions) {
      const result = scanDirection(
        board,
        colIndex,
        rowIndex,
        direction.colOperation,
        direction.rowOperation,
        undefined,
        pairOfCoordinates
      )
      if (result) direction.arr.push(result)
    }
  } else {
    for (let colIndex = 0; colIndex < board.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < board[colIndex].length; rowIndex++) {
        if (board[colIndex][rowIndex] == participant) {
          for (const direction of directions) {
            const result = scanDirection(
              board,
              colIndex,
              rowIndex,
              direction.colOperation,
              direction.rowOperation,
              direction.offset
            )
            if (result) direction.arr.push(result)
          }
        }
      }
    }
  }

  const result = [
    { direction: 'vertical', sequence: vertical },
    { direction: 'horizontal', sequence: horizontal },
    { direction: 'cross', sequence: cross }
  ]

  //console.log(result)
  return result
}
