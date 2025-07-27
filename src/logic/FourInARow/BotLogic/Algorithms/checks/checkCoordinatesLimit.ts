export const checkCoordinatesLimit = (c: number[]) => {
  return c[0] >= 0 && c[0] <= 6 && c[1] <= 5 && c[1] >= 0
}
