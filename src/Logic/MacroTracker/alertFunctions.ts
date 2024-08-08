import { alertClassName, alertMessage, showAlert } from './initVariables'

export function hideAlert() {
  showAlert.value = false
}

export function revealAlert() {
  showAlert.value = true
}

export function alertDanger() {
  revealAlert()
  alertClassName.value = 'alert-danger'
}

export function alertSuccess() {
  revealAlert()
  alertClassName.value = 'alert-success'
}

export function alertSecondary() {
  revealAlert()
  alertClassName.value = 'alert-secondary'
}

export function _alert(message: string) {
  alertMessage.value = message
}
