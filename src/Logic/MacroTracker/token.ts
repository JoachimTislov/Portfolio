import { ref } from 'vue'

const storedToken = localStorage.getItem('token')
export const token = ref<string | undefined>(storedToken ? storedToken : undefined)
