import { log } from './variables'

export function logMove(coordinates: number[], participant: number) {
  log.value.past.push({ coords: coordinates, participant: participant })
}
