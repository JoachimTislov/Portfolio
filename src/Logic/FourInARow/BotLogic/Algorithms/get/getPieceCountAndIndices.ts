import type { _pattern } from "../../../Types"

export const getPieceCountAndIndices = (pattern: _pattern, participant: number) => {
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
