import { login } from './Ajax/login'
import { _alert, alertSecondary } from './alertFunctions'
import { login_validation, password } from './initVariables'
import { username } from './variables'

export async function initiateExampleAccount(userClicked?: boolean) {
  alertSecondary()
  await _alert('Login into the example account, this might take some time')

  login_validation.Username = true
  login_validation.Password = true

  username.value = 'Peddi'
  password.value = import.meta.env.VITE_EXAMPLE_ACCOUNT_PASSWORD

  await login(userClicked)
}
