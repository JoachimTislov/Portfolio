import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const usePiecesStore = defineStore('counter', () => {
  const storedPieces = localStorage.getItem('pieces')
  const pieces = ref<number>(storedPieces ? JSON.parse(storedPieces) : 0)
  watch(pieces, (newPieces) => {localStorage.setItem('pieces', JSON.stringify(newPieces))},{ deep: true })


  function assignInt(int: number) {
    pieces.value = int
  }

  function incrementPieces() {
    pieces.value++
  }
  function decrementPieces() {
    pieces.value--
  }

  return { pieces, incrementPieces, decrementPieces, assignInt }
})
