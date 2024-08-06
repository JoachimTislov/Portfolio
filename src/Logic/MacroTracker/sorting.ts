import type { Ingredients } from './types'

export function sortArray<Type extends { [key: string]: number | string | Ingredients }>(
  arr: Type[] | undefined,
  filterObject: string
): Type[] | undefined {
  if (arr) {
    if (filterObject != 'name') {
      //Descending order
      arr = arr.sort((a, b) => (b[filterObject] as number) - (a[filterObject] as number))
    } else {
      arr = arr.sort((a, b) => (a[filterObject] as string).localeCompare(b[filterObject] as string))
    }
  }
  return arr
}

export function filterArrayByName<Type extends { [key: string]: number | string | Ingredients }>(
  arr: Type[] | undefined,
  searchInput: string
): Type[] | undefined {
  if (arr) {
    const filtered_arr = arr.filter(function (entry): boolean {
      return (entry.name as string).toLowerCase().includes(searchInput.toLowerCase())
    })

    return filtered_arr
  }

  return arr
}
