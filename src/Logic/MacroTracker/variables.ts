import { ref, watch } from 'vue'

const storedUser_id = localStorage.getItem('user_id')
export const user_id = ref<string | undefined>(storedUser_id ? storedUser_id : undefined)
watch(user_id, (newValue) => {
  if (newValue) {
    localStorage.setItem('user_id', newValue.toString())
  } else {
    localStorage.removeItem('user_id')
  }
})

const storedToken = localStorage.getItem('token')
export const token = ref<string | undefined>(storedToken ? storedToken : undefined)
watch(token, (newValue) => {
  if (newValue) {
    localStorage.setItem('token', newValue)
  } else {
    localStorage.removeItem('token')
  }
})

const storedUsername = localStorage.getItem('username')
export const username = ref<string>(storedUsername ? storedUsername : '')
watch(username, (newValue) => {
  if (newValue) {
    localStorage.setItem('username', newValue)
  }
})
