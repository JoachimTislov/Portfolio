import router from '@/router'
import { _alert, alertDanger, alertSuccess, hideAlert } from '../alertFunctions'
import { fetchingResource, login_validation, password } from '../initVariables'
import { token, user_id, username } from '../variables'
import { fetchResource } from './ajax'

export async function login(userClicked?: boolean) {
  console.log('Logging in')
  if (login_validation.Password && login_validation.Username && !fetchingResource.value) {
    try {
      const json = JSON.stringify({
        username: username.value,
        password: password.value
      })

      const response = await fetchResource('POST', json, '/login', 'api_key')

      if (response) {
        const result: {
          message: string
          token: string
          user_id: string
          username: string
        } = await response.json()

        // Probably rework this underneath

        if (response.ok) {
          token.value = result.token
          user_id.value = result.user_id
          username.value = result.username

          if (userClicked) {
            router.push({ name: 'macroHome' })
          }
          alertSuccess()
          _alert('You have logged into the example account successfully')
        } else {
          alertDanger()
          _alert(result.message)
        }
      }
    } catch (error) {
      alert('Error logging in: ' + error)
    }
  } else {
    alertDanger()
    if (fetchingResource.value) {
      _alert('Already login in...')
    } else {
      _alert(
        `Fill out the ${!login_validation.Username ? 'Username' : 'Password'} field correctly!`
      )
    }
  }
}
