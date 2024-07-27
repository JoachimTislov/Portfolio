
export const checkIfArrayInThe2DArrayEqualArray = (
  arr: (string | number)[][],
  arr_2: (string | number)[]
) => {
  for (const entry of arr) {
    if (arraysEqual(entry, arr_2)) {
      return true
    }
  }
  return false
}

export const arraysEqual = (arr1: (string | number)[], arr2: (string | number)[]) => {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}
