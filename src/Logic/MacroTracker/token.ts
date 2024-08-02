import { ref, watch } from "vue"

const storedToken = localStorage.getItem('token')
export const token = ref<string | undefined>(storedToken ? storedToken : undefined)
watch(token,(newToken) => {

    if (newToken) {
        console.log('setting new token', newToken)
        localStorage.setItem('token', newToken)
    } else {
        localStorage.removeItem('token')
    }

}, {
    deep: true
})