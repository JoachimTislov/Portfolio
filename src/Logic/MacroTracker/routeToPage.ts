import router from '@/router'
import { _alert, alertSecondary } from './alertFunctions'

export function routeToPage(pageName: string) {
  //console.log('Routing to page: ', pageName)

  if (pageName == 'macroLogin') {
    _alert('Successfully logged you out')
    alertSecondary()
  }

  return router.push({ name: pageName })
}
