import {
  botValue,
  botChoices,
  losing_Coordinates,
  log,
  incrementPiecesAndCheckForTie,
  playerStatus,
  playerChoices,
  piecesInARow,
  officialOffset,
  remainingChoices,
  goldenMove,
  defaultGoldenMove,
  deepClone,
  defaultChoices,
  handleDropInAnimation,
  playerTurn,
  checkWinner,
  alterPreviousButton
} from './gameLogic'

import {
  double_three_in_a_row_patterns,
  potentially_three_in_a_row_patterns,
  three_in_a_row_pattern,
  two_in_a_row_losing_pattern
} from './PatternLogic'

import {
  checkIfArrayInThe2DArrayEqualArray,
  arraysEqual,
  checkLosingCoordinates
} from './ArrayLogic'

import type {
  _pattern,
  _coordinates,
  _patternData,
  possible_Coordinates,
  columnInformation,
  relevantMovesType,
  relatedArraysType
} from './Types'
import { ref } from 'vue'
import { delay } from './delay'

const evaluateOperation = (colIndex: number, offset: number, colOperation: string) => {
  const operation: {[key:string]: (a: number, b: number) => number } = {
    "-": (a: number, b: number) => a - b,
    "+": (a: number, b: number) => a + b,
  }

  return operation[colOperation](colIndex, offset)
}

const scanDirection = (board: number[][], colIndex: number, rowIndex: number, colOperation: string | undefined, rowOperation: string | undefined, left: boolean) => {
  const pattern_arr: _pattern = []
  const coordinates: _coordinates = []
 
  for (let offset = 0; offset < piecesInARow; offset++) {
    const colValue = colOperation != undefined ? evaluateOperation(colIndex, offset, colOperation) : colIndex
    const rowValue = rowOperation != undefined ? evaluateOperation(rowIndex, offset, rowOperation) : rowIndex
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

  const [horizontal_left, horizontal_right, cross_up_right, cross_up_left, cross_down_right, cross_down_left, vertical]: [
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

        const directions = [
          {requirement: (colIndex < horizontalOffSet), colOperation: '+', arr: horizontal_right, left: false},
          {requirement: (colIndex >= officialOffset), colOperation: '-', arr: horizontal_left, left: true},
          {requirement: (rowIndex < verticalOffSet), rowOperation: '+', arr: vertical, left: false},
          {requirement: (rowIndex < verticalOffSet && colIndex < horizontalOffSet), colOperation: '+', rowOperation: '+', arr: cross_up_right, left: false},
          {requirement: (rowIndex < verticalOffSet && colIndex >= officialOffset), colOperation: '-', rowOperation: '+', arr: cross_up_left, left: true},
          {requirement: (rowIndex >= verticalOffSet && colIndex < horizontalOffSet), colOperation: '+', rowOperation: '-', arr: cross_down_right, left: false},
          {requirement: (rowIndex >= verticalOffSet && colIndex >= officialOffset), colOperation: '-', rowOperation: '-', arr: cross_down_left, left: true}
        ]

        for (const direction of directions) {
          if(direction.requirement) {
            const result = scanDirection(board, colIndex, rowIndex, direction.colOperation, direction.rowOperation, direction.left)
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

  console.log(result)
  return result
}

export const initiateAlgorithms = async (board: number[][]) => {
  const participants = [
    {id: botValue, scan: scanBoard(board, botValue)}, 
    {id: playerStatus.value, scan: scanBoard(board, playerStatus.value)}
  ]

  for (const participant of participants) {
     searchForLosingPatterns(board, participant.scan, participant.id)
  }

  for (const participant of participants) {
    for (const structure of participant.scan) {
      for (const sequence of structure.sequence) {
        filterOutLosingPatternByCheckingLosingCoordinates(
          sequence.coordinates,
          sequence.pattern,
          participant.id,
          structure.direction,
          board
        )
      }
    }
  }

  console.log('BotChoices:', botChoices.value, 'PlayerChoices: ', playerChoices.value, 'RemainingChoices: ', remainingChoices.value)
  console.log('LosingChoices: ', losing_Coordinates.value)

  return await searchForBestChoice(board)
}

const handleLosingChoices = async (board: number[][]) => {
  const place_Piece = async (entry: {
    coordinates: number[]
    player_identifier: number
    piece_count: string
  }) => {
    const h = entry.coordinates
    losing_Coordinates.value = losing_Coordinates.value.filter(
      (e: { coordinates: number[]; player_identifier: number; piece_count: string }) => e !== entry
    )
    return await botMove(board, h[0], h[1])
  }

  const checkCoordinatesStatus = (piece_count: string, participant: number) => {
    for (const entry of losing_Coordinates.value) {
      const [x, y] = entry.coordinates
      const pieceValueUnderLosingCoordinate = board[x][y - 1]
      if (
        entry.player_identifier === participant &&
        entry.piece_count === piece_count &&
        board[x][y] == 0 &&
        pieceValueUnderLosingCoordinate != 0
      ) {
        console.log(`Losing move, ${piece_count}, player value: `, participant, entry.piece_count)
        return place_Piece(entry)
      }
    }
    return false
  }

  for (const piece_count of ['Two', 'Three']) {
    for (const value of [botValue, playerStatus.value]) {
      const result = checkCoordinatesStatus(piece_count, value)
      if (result != false) return result
    }
  }

  if (losing_Coordinates.value.length > 0) {
    for (const entry of losing_Coordinates.value) {
      const [x, y] = entry.coordinates
      const pieceValueUnderLosingCoordinate = board[x][y - 1]
      console.log('accepting loss')
      if (pieceValueUnderLosingCoordinate != 0 && board[x][y] == 0) {
        return place_Piece(entry)
      }
    }
  }
}

const searchForBestChoice = async (board: number[][]) => {
  
  const threeChoices = [botChoices.value['Three_in_a_row'], playerChoices.value['Three_in_a_row']]
  for (const entry of threeChoices) {
    if(entry.length) {
      const [x,y] = entry[0].coordinates
      return await botMove(board, x, y)
    }
  }

  if (goldenMove.value.participant != 0) {
    const [x,y] = goldenMove.value.coordinates

    console.log('Playing the legendary golden move, which cant be stopped')
    return await botMove(board, x, y)
  }

  const doubleChoices = [botChoices.value['double_Three_in_a_row'], playerChoices.value['double_Three_in_a_row']]
  for (const entry of doubleChoices) {
    if(entry.length) {
      const [x,y] = entry[0].coordinates
      return await botMove(board, x, y)
    }
  }

  const potentiallyDoubleChoices = [botChoices.value['potentially_double_Three_in_a_row'], playerChoices.value['potentially_double_Three_in_a_row']]
  for (const entry of potentiallyDoubleChoices) {
    if(entry.length) {
      const [x,y] = entry[0].coordinates
      return await botMove(board, x, y)
    }
  }
  
  const choices = [botChoices.value, playerChoices.value]
  for (const choice of choices) {
    const directions = ['horizontal_right', 'horizontal_left', 'cross_up_left', 'cross_up_right', 'cross_down_left', 'cross_down_right', 'vertical']
    const patterns = choice['Two_in_a_row']
    for (const direction of directions) {
      for (const entry of patterns) {
        if (direction != 'vertical' && choice != playerChoices.value)
          if (entry.direction === direction && entry.losing.bool == false) {
            if (choice == playerChoices.value) {
              console.log('Blocking in direction: ', direction, entry)
            } else {
              console.log('Building in direction: ', direction, entry)
            }
            const [row, slot] = entry.coordinates
            return await botMove(board, row, slot)
          }
      }
    }
  }

  for (const choice of [botChoices.value, playerChoices.value]) {
    const directions = ['horizontal_right', 'horizontal_left', 'cross_up_left', 'cross_up_right', 'cross_down_left', 'cross_down_right', 'vertical']
    const patterns = choice['Two_in_a_row']
    for (const direction of directions) {
      for (const entry of patterns) {
        if (entry.direction == direction && entry.losing.bool == true && entry.losing.player_instances.length <= 2) {
          if (choice == playerChoices.value) {
            console.log('Blocking in direction: ', direction, entry, ' this is a losing move')
          } else {
            console.log('Building in direction: ', direction, entry, ' this is a losing move')
          }
          const [row, slot] = entry.coordinates
          return await botMove(board, row, slot)
        }
      }
    }
  }

  const patterns = remainingChoices.value
  // Algorithm that check which choice is chosen the most
  const storedCoordinates = []
  for (const entry of patterns) {
    
    // Handle vertical cases  first
    /*if (entry.direction == 'vertical' && pieces.value < 5) {
      console.log('played base case vertically')
      return await botMove(board, entry.coordinates[0], entry.coordinates[1])
    }*/

    // This checks if any of the patterns have chosen the same coordinates
    //base case
    if (entry.losing.bool == false) {
      if (storedCoordinates.length == 0) {
        storedCoordinates.push({ coordinates: entry.coordinates, counter: 0 })
      } else {
        for (const item of storedCoordinates) {
          if (arraysEqual(entry.coordinates, item.coordinates)) {
            item.counter++
          } else {
            storedCoordinates.push({ coordinates: entry.coordinates, counter: 0 })
          }
        }
      }
    }

    const maxNumber = ref(0)
    const winner = ref([-1, -1])
    for (const entry of storedCoordinates) {
      if (entry.counter > maxNumber.value) {
        maxNumber.value = entry.counter
        winner.value = entry.coordinates
      }
    }
    if (winner.value[0] != -1) {
      console.log('Move with highest amount of votes: ', winner.value, 'votes: ', maxNumber.value, entry)
      return await botMove(board, winner.value[0], winner.value[1])
    }
  }

  /// No more choices left
  console.log('handling losing choices')
  return handleLosingChoices(board)
}

const getPieceCountAndIndices = (pattern: _pattern, participant: number) => {
  let counter = 0
  const indices: number[] = []
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === participant) {
      counter++
    } else if (pattern[i] === '*') {
      indices.push(i)
    }
  }

  if (indices.length > 0) {
    if (counter === 3) {
      return { piece_count: 'Three', indices: indices }
    } else if (counter === 2) {
      return { piece_count: 'Two', indices: indices }
    }
  }

  return false
}


const addRelatedMovesToObject = (botAndPlayerRelatedMoves: relatedArraysType) => {
  for (const relatedMoves of botAndPlayerRelatedMoves) {
    for (let i = 0; i < relatedMoves.arr.length; i++) {
      if (relatedMoves.arr[i] != undefined) relatedMoves.targetArr.push({
        piece_count: relatedMoves.arr[i].piece_count, 
        relativeRowIndex: i, 
        potentiallyDoubleThreeInARow: relatedMoves.arr[i].potentiallyDoubleThreeInARow,
        coords: relatedMoves.arr[i].coords
      })
    }
  }
}

const searchForLosingPatterns = (
  board: number[][],
  schema: Array<{
    direction: string
    sequence: _patternData
  }>,
  participant: number
) => {
  for (const structure of schema) {
    for (const sequence of structure.sequence) {
      const three = checkIfArrayInThe2DArrayEqualArray(three_in_a_row_pattern('*', participant),sequence.pattern)
      const two = checkIfArrayInThe2DArrayEqualArray(two_in_a_row_losing_pattern(participant),sequence.pattern)
      const piece_countAndIndices = getPieceCountAndIndices(sequence.pattern, participant)
      if (piece_countAndIndices != false) {
        for (const index of piece_countAndIndices.indices) {
          const [x, y] = [sequence.coordinates[index][0], sequence.coordinates[index][1] - 1]
          const check = checkLosingCoordinates(
            [x, y],
            participant,
            structure.direction,
            piece_countAndIndices.piece_count
          )
          if (structure.direction != 'vertical' && (check && three) || (check && two)) {
            const relevantMoves: relevantMovesType =  { bot_instances: [], player_instances: [] }

            const moves_related_to_pattern = find_all_related_moves_to_given_pattern(board, [x,y+1])

            const botAndPlayerRelatedMoves = [
              {targetArr: relevantMoves.bot_instances, arr: moves_related_to_pattern.bots_opportunities}, 
              {targetArr: relevantMoves.player_instances, arr: moves_related_to_pattern.player_threats}]
            
            addRelatedMovesToObject(botAndPlayerRelatedMoves)

            const thirdAndFifth = findThirdAndFifthCoordinates(sequence.coordinates)
            const result = checkPotentiallyDoubleThreeInARow(board, thirdAndFifth, sequence.pattern, participant, sequence.coordinates)
            const potentiallyDoubleInARow = (result != false && arraysEqual(moves_related_to_pattern.coords, result.coords)) ? result.success : false

            losing_Coordinates.value.push({
              coordinates: [x, y],
              direction: structure.direction,
              pattern: sequence.pattern,
              all_coordinates: sequence.coordinates,
              player_identifier: participant,
              piece_count: piece_countAndIndices.piece_count,
              instances: 1,
              relevantMoves: relevantMoves,
              potentiallyDoubleThreeInARow: potentiallyDoubleInARow
            })
          }
        }
      }
    }
  }
  return true
}

const find_all_related_moves_to_given_pattern = (
  board: number[][],
  zeroCoords: number[]
) => {
  const arr: columnInformation = { coords: zeroCoords, player_threats: [], bots_opportunities: [] }
  for (const entry of losing_Coordinates.value) {
    if (entry.coordinates[0] == zeroCoords[0]) {
      const colIndex = entry.coordinates[1] - zeroCoords[1]
      const [x, y] = entry.coordinates

      const targetArr = entry.player_identifier == botValue ? arr.bots_opportunities : arr.player_threats
      targetArr[colIndex] = {
        coords: [x, y],
        piece_count: entry.piece_count,
        instances: entry.instances,
        direction: entry.direction,
        pattern: entry.pattern,
        all_coordinates: entry.all_coordinates,
        potentiallyDoubleThreeInARow: entry.potentiallyDoubleThreeInARow,
        relevantMoves: entry.relevantMoves
      }
    }
  }

  return arr
}

const getPieceCount = (pattern: _pattern, participant: number) => {
  let counter = 0
  const otherParticipant = participant == botValue ? playerStatus.value : botValue
  for (const value of pattern) {
    if (value == participant) {
      counter++
    } else if (value == otherParticipant) {
      return 'One'
    }
  }

  const piece_count = counter == 3 ? 'Three' : counter == 2 ? 'Two' : 'One'

  return piece_count
}

const findThirdAndFifthCoordinates = (coordinates: number[][]) => {
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

const checkCoordinatesLimit = (c: number[]) => {
  return c[0] >= 0 && c[0] <= 6 && c[1] <= 5 && c[1] >= 0
}

const checkDoubleThreeInARow = (
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
  pattern: (string | number)[],
  participant: number,
  all_coordinates: number[][]
) => {
  const checkIfSpotIsNotOccupiedOnBoard = (coords: number[]) => {
    const [x, y] = coords
    return (board[x][y] == 0 && y == 0)  ||  (board[x][y] == 0 && y > 0 && board[x][y-1] == 0)
  }

  const checkPattern = (arr: { pattern: (number | string)[]; coords: number[][] }) => {
    if (arraysEqual(arr.pattern, pattern)) {

      return { success: true, coords: [arr.coords[1]] }

    } else if (arraysEqual([0, participant, participant, 0], pattern)) {

      return { success: true, coords: [all_coordinates[0], all_coordinates[3]] }

    }
    
    return false
  }

  const arr = double_three_in_a_row_patterns(participant, coords, all_coordinates)
  if(!checkCoordinatesLimit(coords.first) || !checkCoordinatesLimit(coords.last) || !checkIfSpotIsNotOccupiedOnBoard(coords.first) ||  !checkIfSpotIsNotOccupiedOnBoard(coords.last)) return false

  for (const entry of arr) {
    const result = checkPattern(entry)
    if (result !== false) {
      return result
    }
  }

  return false
}

const checkPotentiallyDoubleThreeInARow = (
  board: number[][],
  coords: {
    first: number[]
    last: number[]
  },
  pattern: (string | number)[],
  participant: number,
  all_coordinates: number[][]
) => {
  const checkIfSpotIsNotOccupiedOnBoard = (board: number[][], coords: number[]) => {
    const [x, y] = coords
    return board[x][y] == 0 
  }

  const checkPattern = (arr: { pattern: _pattern; coords: number[][] }) => {
   
    if (arraysEqual(arr.pattern, pattern)) {

      if (checkCoordinatesLimit(arr.coords[0]) && checkIfSpotIsNotOccupiedOnBoard(board, arr.coords[0])) {
        return { success: true, coords: arr.coords[1] }
      }

    } else if (arraysEqual(['*', participant, participant, '*'], pattern) || arraysEqual([0, participant, participant, 0], pattern)) {
      
      if (checkCoordinatesLimit(coords.first) && checkIfSpotIsNotOccupiedOnBoard(board, coords.first)) {
        return { success: true, coords: all_coordinates[0] }
      }

      if(checkCoordinatesLimit(coords.last) && checkIfSpotIsNotOccupiedOnBoard(board, coords.last)) {
        return { success: true, coords: all_coordinates[3] }
      }
    }

    return false
  }

  const arr = potentially_three_in_a_row_patterns(participant, coords, all_coordinates)

  for (const entry of arr) {
    const result = checkPattern(entry)
    if (result !== false) {
      return result
    }
  }

  return false
}

const filterOutLosingPatternByCheckingLosingCoordinates = (
  coordinates: _coordinates,
  pattern: _pattern,
  participant: number,
  direction: string,
  board: number[][]
) => {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] == 0) {
      const thirdAndFifth = findThirdAndFifthCoordinates(coordinates)
      const doubleThreeInARow = checkDoubleThreeInARow(board, thirdAndFifth, pattern, participant, coordinates)
      const potentiallyDoubleInARow = checkPotentiallyDoubleThreeInARow(board, thirdAndFifth, pattern, participant, coordinates)
      
      const moves_related_to_pattern = find_all_related_moves_to_given_pattern(board, coordinates[i])

      const piece_count = getPieceCount(pattern, participant)
      const key = `${piece_count}_in_a_row`
      const targetArr = (participant == botValue) ? botChoices.value : playerChoices.value

      const arr_entry: possible_Coordinates = {
        pattern: pattern,
        coordinates: coordinates[i],
        all_coordinates: coordinates,
        direction: direction,
        losing: { bool: false, bot_instances: [], player_instances: [] },
        participant: participant,
        piece_count: piece_count
      }

      // Adding relevant coordinates information
      const botAndPlayerRelatedMoves = [
        {targetArr: arr_entry.losing.bot_instances, arr: moves_related_to_pattern.bots_opportunities}, 
        {targetArr: arr_entry.losing.player_instances, arr: moves_related_to_pattern.player_threats}]

      addRelatedMovesToObject(botAndPlayerRelatedMoves)
      
      const three = checkIfArrayInThe2DArrayEqualArray(three_in_a_row_pattern(0, participant), pattern)
      if (three) {
        const coords = coordinates[i]
        arr_entry.coordinates = coords
        targetArr[key].push(arr_entry)
        return true
      }

      const [firstBotOpportunity, secondBotOpportunity] = moves_related_to_pattern.bots_opportunities;
      const [firstPlayerThreat, secondPlayerThreat] = moves_related_to_pattern.player_threats;

      const firstBotOpportunityIsTwo = firstBotOpportunity && firstBotOpportunity.piece_count == 'Two' 
      const firstPlayerThreatTwo = firstPlayerThreat && firstPlayerThreat.piece_count == 'Two' 
      
      const firstBotOpportunityIsThree = firstBotOpportunity && firstBotOpportunity.piece_count == 'Three' 
      const firstPlayerThreatThree = firstPlayerThreat && firstPlayerThreat.piece_count == 'Three'

      const firstBotOpportunityIsPotentiallyThree = firstBotOpportunity && firstBotOpportunity.piece_count == 'Two' && firstBotOpportunity.potentiallyDoubleThreeInARow == true 
      const firstPlayerThreatPotentiallyThree = firstPlayerThreat && firstPlayerThreat.piece_count == 'Two' && firstPlayerThreat.potentiallyDoubleThreeInARow == true

      const firstIsNotPotentiallyThree = !firstBotOpportunityIsPotentiallyThree && !firstPlayerThreatPotentiallyThree
      const firstIsNotThree = !firstBotOpportunityIsThree && !firstPlayerThreatThree
      
      const secondBotOpportunityIsThree = secondBotOpportunity && secondBotOpportunity.piece_count == 'Three' 
      const secondPlayerThreatThree = secondPlayerThreat && secondPlayerThreat.piece_count == 'Three' 

      // Assigning the correct statistics for the certain pattern with given coordinates for piece placement
      if (firstBotOpportunityIsThree && secondBotOpportunityIsThree && !firstPlayerThreatThree) {
        goldenMove.value = arr_entry 
        return true
      }

      if (doubleThreeInARow != false && !firstPlayerThreatThree && !firstBotOpportunityIsThree) {
          for (const coordinates of doubleThreeInARow.coords) {
            if(arraysEqual(moves_related_to_pattern.coords, coordinates)) {
              arr_entry.coordinates = coordinates
              targetArr['double_Three_in_a_row'].push(arr_entry)
            }
          }
      } else if (potentiallyDoubleInARow != false && arraysEqual(moves_related_to_pattern.coords, potentiallyDoubleInARow.coords) && firstIsNotThree) {

        targetArr['potentially_double_Three_in_a_row'].push(arr_entry)

      } else if (firstIsNotPotentiallyThree && firstIsNotThree || (firstPlayerThreatTwo && (firstPlayerThreat.relevantMoves.player_instances[0] != undefined && firstPlayerThreat.relevantMoves.player_instances[0].piece_count == 'Three'))) {

        if (firstBotOpportunityIsTwo || firstPlayerThreatTwo) { 
          arr_entry.losing.bool = true
        } 

        if (secondBotOpportunityIsThree || secondPlayerThreatThree) {
          arr_entry.losing.bool = false
        } 

        if (key == 'One_in_a_row') {
          remainingChoices.value.push(arr_entry)
        } else {
          targetArr[key].push(arr_entry)
        }
 
      }
    }
  }
    return true
}

export const resetChoices = () => {
  const values = [playerChoices, botChoices]

  for (const choices of values) {
    choices.value = deepClone(defaultChoices)
  }
  remainingChoices.value = []
  // resetting losing choices
  losing_Coordinates.value = []

  goldenMove.value = defaultGoldenMove
}

export const botMove = async (board: number[][], row: number, slot: number) => {
  const specific_slot = document.querySelector('.slot' + row + '-' + slot)
  const restartButton: any = document.getElementById('restartButton')
  if (restartButton != undefined) restartButton.disabled = true

  await delay(1000)

  board[row][slot] = botValue
  log.value.push([row, slot])

  handleDropInAnimation(specific_slot)

  checkWinner(true)

  resetChoices()

  incrementPiecesAndCheckForTie()

  playerTurn.value = true

  alterPreviousButton(1)

  if (restartButton != undefined) restartButton.disabled = false
  
  return [row, slot]
}
