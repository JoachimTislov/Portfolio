import { token } from '../token'
import { fetchingResource } from '../initVariables'
import { _alert, alertDanger, alertSecondary, alertSuccess } from '../alertFunctions'
import router from '@/router'
import { hideModal } from '../hideModal'

function load() {
  fetchingResource.value = true
}

function unLoad() {
  fetchingResource.value = false
}

export function removeLocalData() {
  token.value = undefined
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('username')
}

function checkIfUserIsUnAuthorized(response: Response, modal_id?: string) {
  if (response.status == 401) {
    if (modal_id) {
      hideModal(modal_id)
    }
    forceFullyLogTheUserOut()
  } else {
    return response
  }
}

function forceFullyLogTheUserOut() {
  removeLocalData()
  alertSecondary()
  _alert('Your session has expired as another person has logged into your account')
  router.push({ name: 'macroLogin' })
}

export async function getData(url: string) {
  if (!token.value) {
    forceFullyLogTheUserOut()
  } else {
    load()

    const endpoint = `${import.meta.env.VITE_API_WEB_URL}${url}`
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token.value
      }
    })

    unLoad()

    return checkIfUserIsUnAuthorized(response)
  }
}

export async function deleteEntity(
  url: string,
  func?: () => Promise<void>,
  calenderFunc?: (identifier?: string) => void
) {
  if (!token.value) {
    forceFullyLogTheUserOut()
  } else {
    if (confirm('Are you sure?')) {
      try {
        load()

        const endpoint = `${import.meta.env.VITE_API_WEB_URL}${url}`
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            Authorization: token.value
          }
        })

        unLoad()

        if (response.ok) {
          if (func) {
            await func()
          }

          if (calenderFunc) {
            calenderFunc()
          }
        }

        if (response.ok) {
          alertSuccess()
        } else {
          alertDanger()
        }

        const message = (await response.json()).message
        _alert(message)

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
  typeOfAuth: string | undefined,
  modal_id?: string
): Promise<Response | undefined> {
  const api_key: string = import.meta.env.VITE_API_KEY
  const auth = typeOfAuth == 'api_key' ? api_key : token.value
  if (!auth) {
    forceFullyLogTheUserOut()
  } else {
    const endpoint = `${import.meta.env.VITE_API_WEB_URL}${url}`

    const fetchBody = {
      method: method,
      headers: {
        Authorization: auth,
        ...(!(data instanceof FormData) && { 'Content-Type': 'application/json' })
      },
      body: data
    }

    try {
      load()

      const response = await fetch(endpoint, fetchBody)

      if (response.headers.get('Content-Type') == 'application/json' && url !== '/login') {
        const message = (await response.json()).message

        if (response.ok) {
          if (modal_id) {
            hideModal(modal_id)
          }
          alertSuccess()
        } else {
          alertDanger()
        }

        _alert(message)
      }

      unLoad()

      return checkIfUserIsUnAuthorized(response, modal_id)
    } catch (Error) {
      console.log('Fetch failed: ', Error)
    }
  }
}
