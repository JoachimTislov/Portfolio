import type { _pattern } from '@/logic/FourInARow/Types'

export function getOtherZeroCoordinatesIndex(pattern: _pattern, indexOfOriginalZero: number[]) {
  for (const [index, value] of pattern.entries()) {
    if ((value == 0 || value == '*') && !indexOfOriginalZero.includes(index)) {
      return index
    }
  }

  return null
}
