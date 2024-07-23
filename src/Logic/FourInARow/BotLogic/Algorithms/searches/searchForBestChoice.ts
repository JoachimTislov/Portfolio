import { ref } from "vue"
import { arraysEqual } from "../../ArrayLogic"
import { botChoices, goldenMove, playerChoices, remainingChoices } from "../../../GameLogic/variables"
import { botMove } from "../../Bot"
import { handleLosingChoices } from "../handleLosingChoices"

export const searchForBestChoice = async (board: number[][]) => {
  
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