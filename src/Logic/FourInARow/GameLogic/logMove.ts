import { log } from "./variables";

export function logMove(coordinates: number[], participant: number) {
    log.value.push({coords: coordinates, participant: participant})
}