import router from '@/router'
import {
  initData,
  isPasswordValid,
  isUsernameValid,
  login_alert,
  password,
  username
} from '../initVariables'
import { token } from '../token'
import { fetchResource } from './ajax'

export async function login() {
  if (isPasswordValid.value && isUsernameValid.value) {
    try {
      console.log('Loggin in')

      const json = JSON.stringify({
        username: username.value,
        password: password.value
      })

      const response = await fetchResource('POST', json, '/login', login_alert.value, 'api_key')

      if (response && response.ok) {
        const result: { token: string; user_id: string; username: string } = await response.json()

        console.log('successfully received token', result.token)

        token.value = result.token
        username.value = result.username
        localStorage.setItem('token', result.token)
        localStorage.setItem('user_id', result.user_id)
        localStorage.setItem('username', result.username)

        await initData(result.user_id)

        console.log('Moving to home')
        router.push({ name: 'macroHome' })
      }
    } catch (error) {
      alert('Error loging in: ' + error)
    }
  }
}
