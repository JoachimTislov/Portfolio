import { login } from './Ajax/login'
import { _alert, alertSecondary, alertSuccess } from './alertFunctions'
import { login_validation, password } from './initVariables'
import { username } from './variables'

export async function initiateExampleAccount(userClicked?: boolean) {
  login_validation.Username = true
  login_validation.Password = true

  username.value = 'Peddi'
  password.value = import.meta.env.VITE_EXAMPLE_ACCOUNT_PASSWORD

  alertSecondary()
  _alert('Login into the example account, this might take some time')

  await login(userClicked)
}
