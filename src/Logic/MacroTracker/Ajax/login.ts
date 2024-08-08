import router from '@/router'
import { initData, login_validation, password, username } from '../initVariables'
import { token } from '../token'
import { fetchResource } from './ajax'
import { _alert, alertDanger, alertSuccess } from '../alertFunctions'

export async function login() {
  if (login_validation.Password.value && login_validation.Username.value) {
    try {
      console.log('Loggin in')

      const json = JSON.stringify({
        username: username.value,
        password: password.value
      })

      const response = await fetchResource('POST', json, '/login', 'api_key')

      if (response && response.ok) {
        const result: { message: string; token: string; user_id: string; username: string } =
          await response.json()

        token.value = result.token
        username.value = result.username
        localStorage.setItem('token', result.token)
        localStorage.setItem('user_id', result.user_id)
        localStorage.setItem('username', result.username)

        await initData(result.user_id)

        alertSuccess()
        _alert(result.message)

        router.push({ name: 'macroHome' })
      }
    } catch (error) {
      alert('Error loging in: ' + error)
    }
  } else {
    alertDanger()
    _alert('Fill out the login fields correctly!')
  }
}
