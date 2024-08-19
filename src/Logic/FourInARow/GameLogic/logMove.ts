import { log } from './variables'

export function logMove(coordinates: number[]) {
  log.value.push(coordinates)
}
