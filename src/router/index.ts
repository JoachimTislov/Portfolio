import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/more-of-me',
      name: 'aboutMe',
      component: () => import('../views/AboutMeView.vue')
    },
    {
      path: '/about/:project',
      name: 'aboutProject',
      component: () => import('../views/AboutProjectView.vue')
    },
    {
      path: '/four-in-a-row',
      name: 'fourInARow',
      component: () => import('../views/FourInARowView.vue')
    },
  ]
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
