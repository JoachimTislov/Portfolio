import { routeToPage } from '../routeToPage'
import { token } from '../token'

import { showAlert, alertMessage, alertClassName } from '../initVariables'

export function alertUser(message: string, response: Response) {
  alertMessage.value = message

  if (!response.ok) {
    alertClassName.value = 'alert-danger'
  } else {
    alertClassName.value = 'alert-success'
  }

  showAlert.value = true
}

function checkIfUserIsUnAuthorized(response: Response) {
  if (response.status == 401) {
    localStorage.removeItem('token')
    routeToPage('macroLogin')
  } else {
    return response
  }
}

export async function getData(url: string) {
  if (!token.value) {
    routeToPage('macroLogin')
  } else {
    const endpoint = `${import.meta.env.VITE_Local_API_WEB_URL}${url}`
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token.value
      }
    })
    return checkIfUserIsUnAuthorized(response)
  }
}

export async function deleteEntity(
  url: string,
  func?: () => Promise<void>,
  calenderFunc?: (identifier?: string) => void
) {
  if (!token.value) {
    routeToPage('macroLogin')
  } else {
    if (confirm('Are you sure?')) {
      try {
        const endpoint = `${import.meta.env.VITE_Local_API_WEB_URL}${url}`
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            Authorization: token.value
          }
        })

        if (response.ok) {
          if (func) {
            await func()
          }

          if (calenderFunc) {
            calenderFunc()
          }
        }

        const message = (await response.json()).message
        alertUser(message, response)

        return checkIfUserIsUnAuthorized(response)
      } catch (error) {
        console.log(error)
        alert(`Network error: ${error}`)
      }
    }
  }
}

export async function fetchResource(
  method: string,
  data: string | FormData,
  url: string,
  typeOfAuth: string | undefined
): Promise<Response | undefined> {
  const api_key: string = import.meta.env.VITE_API_KEY
  const auth = typeOfAuth == 'api_key' ? api_key : token.value
  if (!auth) {
    routeToPage('macroLogin')
  } else {
    const endpoint = `${import.meta.env.VITE_Local_API_WEB_URL}${url}`

    const fetchBody = {
      method: method,
      headers: {
        Authorization: auth,
        ...(!(data instanceof FormData) && { 'Content-Type': 'application/json' })
      },
      body: data
    }
    try {
      const response = await fetch(endpoint, fetchBody)

      if (response.headers.get('Content-Type') == 'application/json' && url !== '/login') {
        const message = (await response.json()).message

        alertUser(message, response)
      }

      return checkIfUserIsUnAuthorized(response)
    } catch (Error) {
      console.log('Fetch failed: ', Error)
    }
  }
}
