export function placePiece(board: number[][], x: number, y: number, int: number) {
  if (board[x][y] == 0) {
    board[x][y] = int
  }
}
