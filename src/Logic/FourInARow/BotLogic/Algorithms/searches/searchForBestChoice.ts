import { botChoices, botValue, first_player, playerChoices } from '../../../GameLogic/variables'
import { botMove } from '../../botMove'
import { handleLosingChoices } from '../handleLosingChoices'
import { pieces } from '@/Logic/FourInARow/GameLogic/pieces'
import { getMoveWithMostConnections } from '../get/getMoveWithMostConnections'
import { arraysEqual, TwoDimensionalArraysEqual } from '../../ArrayLogic'

export const searchForBestChoice = async (board: number[][]) => {
  const choices = [
    [botChoices.value.prime_double_Three_in_a_row, playerChoices.value.prime_double_Three_in_a_row],
    [
      botChoices.value.non_prime_double_Three_in_a_row,
      playerChoices.value.non_prime_double_Three_in_a_row
    ]
  ]

  for (let i = 0; i < choices.length; i++) {
    for (const entry of choices[i]) {
      if (entry.length > 0) {
        const [x, y] = entry[0].coordinates

        if (i == 0) {
          // console.log('Prime Double')
        } else {
          // console.log('Non prime double')
        }

        if (entry[0].participant == botValue) {
          // console.log('Building double three in a row')
        } else {
          // console.log('Blocking double three in a row')
        }
        return await botMove(board, x, y)
      }
    }
  }

  // Blocking or playing on a non prime two sided three in a row
  const arr = [
    botChoices.value.two_sided_three_in_a_row,
    playerChoices.value.two_sided_three_in_a_row
  ]
  for (const entry of arr) {
    if (entry.length > 0) {
      const [row, slot] = entry[0].coordinates
      // console.log('Two sided three in a row')
      return await botMove(board, row, slot)
    }
  }
  /////////////////////////////////////////////

  // Checking for two - two in a rows

  for (const arr of [botChoices.value.Two_in_a_row, playerChoices.value.Two_in_a_row]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (
          i != j &&
          arraysEqual(arr[i].coordinates, arr[j].coordinates) &&
          !TwoDimensionalArraysEqual(arr[i].all_coordinates, arr[j].all_coordinates) &&
          arr[i].direction != arr[j].direction
        ) {
          const [row, slot] = arr[i].coordinates
          // console.log('Two - two in a row')
          return await botMove(board, row, slot)
        }
      }
    }
  }

  /////

  /// Getting the two in a row with most amount of connections
  const two_in_a_rows = [...botChoices.value.Two_in_a_row, ...playerChoices.value.Two_in_a_row]

  const result = getMoveWithMostConnections(board, two_in_a_rows)

  if (result) {
    const [row, slot] = result.coords

    // console.log('Two in a row')
    // console.log('Playing the choice with: ', result.connections, ' connections')

    return await botMove(board, row, slot)
  }

  /*
  This code is old, and based on a 2D two in a row array [[],[],[],[],[],[]]
  
  const loopThroughTwoInARow = () => {
    for (let i = 0; i < botChoices.value['Two_in_a_row'].length; i++) {
      const botTwoInARows = botChoices.value['Two_in_a_row'][i]
      const playerTwoInARows = playerChoices.value['Two_in_a_row'][i]

      const playerHasMoreTwoInARow = botTwoInARows.length <= playerTwoInARows.length
      const targetArr = playerHasMoreTwoInARow ? playerTwoInARows : botTwoInARows

      const amountOfEach: { [key: string]: { count: number; coordinates: number[] } } = {}

      for (const item of targetArr) {
        const coordKey: string = JSON.stringify(item.coordinates)

        // Assign an empty object if the key doesn't exist
        if (!amountOfEach[coordKey]) {
          amountOfEach[coordKey] = { count: 0, coordinates: item.coordinates }
        } else {
          amountOfEach[coordKey].count++
        }
      }

      let mostOccurredCoordinate = undefined
      let count = -1
      for (const [key, entry] of Object.entries(amountOfEach)) {
        if (entry.count > count) {
          count = entry.count
          mostOccurredCoordinate = JSON.parse(key)
        }
      }

      if (mostOccurredCoordinate != undefined) return mostOccurredCoordinate
    }
    return false
  }

  const coordinates = loopThroughTwoInARow()
  if (coordinates != false) {
    const [x, y] = coordinates
    return await botMove(board, x, y)
  }*/

  // Handling base with zero connections. There probably some spots which are better than the other, but since we want different games.
  // We will use computer randomness
  const remainingChoices = [...botChoices.value.One_in_a_row, ...playerChoices.value.One_in_a_row]
  if (pieces.value == 1 && first_player.value == 'player') {
    const arr_length = remainingChoices.length
    const random_index = Math.floor(Math.random() * (arr_length - 1)) // - 1 since a length of an array is from 1 - n and does not begin with zero

    const [row, slot] = remainingChoices[random_index].coordinates

    // console.log('Base case for remaining choices, playing a random move with index: ', random_index)
    return await botMove(board, row, slot)
  } else {
    // I will use the original scan algorithm to retrieve the amount of connection a piece has
    // Iterating through and eventually finding the choice with the most amount of connections
    const result = getMoveWithMostConnections(board, remainingChoices)

    if (result) {
      const [row, slot] = result.coords

      // console.log('One in a row')
      // console.log('Playing the choice with: ', result.connections, ' amount of connections')

      return await botMove(board, row, slot)
    }
  }
  /// No more choices left since the losing coordinates arrays filters out losing choice and in the end, the algorithm only have bad choices left.
  // It ends up here if he(the bot) is about to loose, I assume..., will test it
  return handleLosingChoices(board)
}
