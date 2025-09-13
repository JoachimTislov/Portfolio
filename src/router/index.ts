import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Array.from(Object.values(routes))
})

router.beforeEach((to, _, next) => {
  if (to.name != 'home') {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'instant'
    })
  }
  next()
})

export default router
