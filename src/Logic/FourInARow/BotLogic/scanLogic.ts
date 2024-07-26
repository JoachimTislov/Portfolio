import { officialOffset, piecesInARow } from "../GameLogic/variables"
import type { _coordinates, _pattern, _patternData } from "../Types"

const evaluateOperation = (colIndex: number, offset: number, colOperation: string) => {
  const operation: {[key:string]: (a: number, b: number) => number } = {
    "-": (a: number, b: number) => a - b,
    "+": (a: number, b: number) => a + b,
  }

  return operation[colOperation](colIndex, offset)
}

const scanDirection = (board: number[][], colIndex: number, rowIndex: number, colOperation: string | undefined, rowOperation: string | undefined, left: boolean, _offset: number | undefined) => {
  const pattern_arr: _pattern = []
  const coordinates: _coordinates = []
  
  const __offset = _offset != undefined ? _offset : 0

  for (let offset = __offset; offset < piecesInARow + __offset; offset++) {
    const colValue = colOperation != undefined ? evaluateOperation(colIndex, offset, colOperation) : colIndex
    const rowValue = rowOperation != undefined ? evaluateOperation(rowIndex, offset, rowOperation) : rowIndex
    if(colValue > 6 || colValue < 0 || rowValue < 0 || rowValue > 5) return false
    let slot: string | number = board[colValue][rowValue]; 
    // Check if the slot below is empty (for vertical placement logic)
    if (rowValue > 0 && board[colValue][rowValue - 1] == 0) {
      slot = '*' // Marking impossible placement
    }
    coordinates.push([colValue, rowValue])
    pattern_arr.push(slot)
  }
  if(pattern_arr.length < 4) return false

  if(left) {
    return { pattern: pattern_arr.reverse(), coordinates: coordinates.reverse() }
  } else{
    return { pattern: pattern_arr, coordinates: coordinates }
  }
}

export const scanBoard = (board: number[][], participant: number) => {

  const [horizontal_left, horizontal_right, 
        cross_up_right, cross_up_left, 
        cross_down_right, cross_down_left, 
        vertical]: [
    _patternData,
    _patternData,
    _patternData,
    _patternData,
    _patternData,
    _patternData,
    _patternData
  ] = [[], [], [], [], [], [], []]

  for (let colIndex = 0; colIndex < board.length; colIndex++) {
    for (let rowIndex = 0; rowIndex < board[colIndex].length; rowIndex++) {
      if(board[colIndex][rowIndex] == participant) {
        const horizontalOffSet = board.length - officialOffset
        const verticalOffSet = board[colIndex].length - officialOffset

        const offset = -1

        const rowIndexAndOffSet = rowIndex + offset 
        const colIndexAndOffSet = colIndex + offset 

        // There is an index fault inside of directions array, idk where, but a condition in scanDirection handles it
        const directions = [
          // Entries with offset, is to capture rows which are cut off by the border
          {requirement: (colIndex < horizontalOffSet), colOperation: '+', arr: horizontal_right, left: false},
          {requirement: (colIndex >= officialOffset), colOperation: '-', arr: horizontal_left, left: true},
          {requirement: (rowIndex < verticalOffSet), rowOperation: '+', arr: vertical, left: false},

          {requirement: (rowIndex < verticalOffSet && colIndex < horizontalOffSet), colOperation: '+', rowOperation: '+', arr: cross_up_right, left: false},
          {requirement: (rowIndex < verticalOffSet && colIndex >= officialOffset), colOperation: '-', rowOperation: '+', arr: cross_up_left, left: true},
          {requirement: (rowIndex >= verticalOffSet && colIndex < horizontalOffSet), colOperation: '+', rowOperation: '-', arr: cross_down_right, left: false},
          {requirement: (rowIndex >= verticalOffSet && colIndex >= officialOffset), colOperation: '-', rowOperation: '-', arr: cross_down_left, left: true},


          {requirement: (rowIndexAndOffSet >= 0 && rowIndexAndOffSet < horizontalOffSet), colOperation: '+', offset: offset, arr: horizontal_right, left: false},
          {requirement: (rowIndexAndOffSet >= 0 && rowIndexAndOffSet >= officialOffset), colOperation: '-', offset: offset, arr: horizontal_left, left: true},
          {requirement: (rowIndexAndOffSet >= 0 && rowIndexAndOffSet < verticalOffSet && colIndexAndOffSet >= 0 && colIndexAndOffSet < horizontalOffSet), colOperation: '+', rowOperation: '+', offset: offset, arr: cross_up_right, left: false},
          {requirement: (rowIndexAndOffSet >= 0 && rowIndexAndOffSet < verticalOffSet && colIndexAndOffSet >= 0 && colIndexAndOffSet >= officialOffset), colOperation: '-', rowOperation: '+', offset: offset, arr: cross_up_left, left: true},
          {requirement: (rowIndexAndOffSet >= 0 && rowIndexAndOffSet >= verticalOffSet && colIndexAndOffSet >= 0 && colIndexAndOffSet < horizontalOffSet), colOperation: '+', rowOperation: '-', offset: offset, arr: cross_down_right, left: false},
          {requirement: (rowIndexAndOffSet >= 0 && rowIndexAndOffSet >= verticalOffSet && colIndexAndOffSet >= 0 && colIndexAndOffSet >= officialOffset), colOperation: '-', rowOperation: '-', offset: offset, arr: cross_down_left, left: true}
        ]

        for (const direction of directions) {
          if(direction.requirement) {
            const result = scanDirection(board, colIndex, rowIndex, direction.colOperation, direction.rowOperation, direction.left, direction.offset)
            if(result != false) direction.arr.push(result)
          }
        }       
      }
    }
  }

  const result = [
    { direction: 'vertical', sequence: vertical },
    { direction: 'horizontal_right', sequence: horizontal_right },

    { direction: 'horizontal_left', sequence: horizontal_left },
    { direction: 'cross_up_right', sequence: cross_up_right },
    { direction: 'cross_up_left', sequence: cross_up_left },
    { direction: 'cross_down_right', sequence: cross_down_right },
    { direction: 'cross_down_left', sequence: cross_down_left },
  ]

  //console.log(result)
  return result
}