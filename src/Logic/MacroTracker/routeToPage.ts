import router from '@/router'

export function routeToPage(pageName: string) {
  console.log('Routing to page: ', pageName)

  return router.push({ name: pageName })
}
