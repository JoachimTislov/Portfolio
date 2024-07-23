import type { relatedArraysType } from "../../Types"

export const addRelatedMovesToObject = (botAndPlayerRelatedMoves: relatedArraysType) => {
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