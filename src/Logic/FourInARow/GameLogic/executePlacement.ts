import { checkWinner } from './checkWinner'
import { checkForTie, handleDropInAnimation, toggleButtons } from './functions'
import { logMove } from './logMove'
import { incrementPieces, pieces } from './pieces'
import { placePiece } from './placePieceOnBoard'

export const executePlacement = async (
  board: number[][],
  row: number,
  slot: number,
  participant: number
) => {
  placePiece(board, row, slot, participant)
  logMove([row, slot], participant)

  toggleButtons(true)

  incrementPieces()

  await handleDropInAnimation(row, slot)

  toggleButtons(false)

  await checkWinner(true)
  checkForTie(pieces.value)
}
