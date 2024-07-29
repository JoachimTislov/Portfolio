import { ref } from "vue"
import { arraysEqual } from "../../ArrayLogic"
import { botChoices, playerChoices, playerStatus, remainingChoices } from "../../../GameLogic/variables"
import { botMove } from "../../botMove"
import { handleLosingChoices } from "../handleLosingChoices"

export const searchForBestChoice = async (board: number[][]) => {


  const doubleChoices = [botChoices.value['double_Three_in_a_row'], playerChoices.value['double_Three_in_a_row']]
  for (const entry of doubleChoices) {
    if(entry.length > 0) {
      const [x,y] = entry[0].coordinates
      if(entry[0].participant == playerStatus.value) {
        console.log('Blocked double in a row')
      } else {
        console.log('double in a row')
      }
      return await botMove(board, x, y)
    }
  }

  const potentiallyDoubleChoices = [botChoices.value['potentially_double_Three_in_a_row'], playerChoices.value['potentially_double_Three_in_a_row']]
  for (const entry of potentiallyDoubleChoices) {
    if(entry.length > 0) {
      const [x,y] = entry[0].coordinates
      return await botMove(board, x, y)
    }
  }

  const loopThroughTwoInARow = () => {
    for (let i = 0; i < botChoices.value['Two_in_a_row'].length; i++) {

      const botTwoInARows = botChoices.value['Two_in_a_row'][i]
      const playerTwoInARows = playerChoices.value['Two_in_a_row'][i]

      const playerHasMoreTwoInARow = botTwoInARows.length <= playerTwoInARows.length
      const targetArr = playerHasMoreTwoInARow ? playerTwoInARows : botTwoInARows 

      const amountOfEach: { [key: string]: {count: number, coordinates: number[]} } = {}
    
      for (const item of targetArr) {

          const coordKey: string = JSON.stringify(item.coordinates);

          // Assign an empty object if the key doesn't exist
          if (!amountOfEach[coordKey]) {
            amountOfEach[coordKey] = {count: 0, coordinates: item.coordinates};
          } else {
            amountOfEach[coordKey].count++
          }
      }
          
          let mostOccurredCoordinate = undefined;
          let count = -1;
          for (const [key, entry] of Object.entries(amountOfEach)) {
              if(entry.count > count) {
                count = entry.count
                mostOccurredCoordinate = JSON.parse(key)
              }
          }

          if(mostOccurredCoordinate != undefined) return mostOccurredCoordinate
    }
    return false
  }

  const coordinates = loopThroughTwoInARow()
  if(coordinates != false) {
    const [x,y] = coordinates
    return await botMove(board, x, y)
  }

  const patterns = remainingChoices.value


   // Algorithm that check which choice is chosen the most
  const storedCoordinates = []
  for (const entry of patterns) {
    
    if (entry.losing == false) {
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
      return await botMove(board, winner.value[0], winner.value[1])
    }
  }

  /// No more choices left
  return handleLosingChoices(board)
}