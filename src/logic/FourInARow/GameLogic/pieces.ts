import { ref, watch } from 'vue'

const storedPieces = localStorage.getItem('pieces')
export const pieces = ref<number>(storedPieces ? JSON.parse(storedPieces) : 0)
watch(
  pieces,
  (newPieces) => {
    localStorage.setItem('pieces', JSON.stringify(newPieces))
  },
  { deep: true }
)

export function assignPiecesWithInt(int: number) {
  pieces.value = int
}

export function incrementPieces() {
  pieces.value++
}

export function decrementPieces() {
  pieces.value--
}
