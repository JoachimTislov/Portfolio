import { routeToPage } from '../routeToPage'
import { token } from '../token'

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

    if (response.status == 401) {
      localStorage.removeItem('token')
      routeToPage('macroLogin')
    } else {
      return response
    }
  }
}

export async function deleteEntity(url: string, type: string, alert_identifier: string) {
  if (!token.value) {
    routeToPage('macroLogin')
  } else {
    if (confirm('Are you sure?')) {
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Authorization: token.value
          }
        })

        if (response.status == 401) {
          localStorage.removeItem('token')
          routeToPage('macroLogin')
        }

        if (response.status != 200) {
          //this.$root.alertUserWithMessage(alert_identifier, this.$root.cookie['Message'], 'red')
          console.log(`Error saving changes, when deleting ${type}`)
          return false
        }

        if (response.ok) {
          //this.$root.refreshData()
          //this.$root.alertUserWithMessage(alert_identifier, this.$root.cookie['Message'], 'green')
        }
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
  alert_div: HTMLElement | null,
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
        ...(method !== 'GET' &&
          method !== 'DELETE' &&
          !(data instanceof FormData) && { 'Content-Type': 'application/json' })
      },
      ...(method !== 'GET' && method !== 'DELETE' && { body: data })
    }
    try {
      const response = await fetch(endpoint, fetchBody)

      console.log(response.headers.get('Content-Type'))

      if (response.headers.get('Content-Type') == 'application/json' && url !== '/login') {
        const message = (await response.json()).message

        if (alert_div && typeof message == 'string') {
          alert_div.style.display = 'flex'
          alert_div.innerHTML = message

          if (!response.ok) {
            alert_div.className = 'alert alert-danger'
          } else {
            alert_div.className = 'alert alert-success'
          }
        }
      }

      if (response.status == 401) {
        localStorage.removeItem('token')
        routeToPage('macroLogin')
      }

      return response
    } catch (Error) {
      console.log('Fetch failed: ', Error)
    }
  }
}

export function getFormDataInJSONFormat(identifier: string) {
  const form = document.getElementById(identifier) as HTMLFormElement
  const formData = new FormData(form)

  const jsonData: { [key: string]: {} } = {}
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value
  }

  return JSON.stringify(jsonData)
}
