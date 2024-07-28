import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '', name: 'about', component: () => import('../views/AboutMeView.vue')
        },
        {
          path: 'projects', name: 'projects', component: () => import('../views/MyProjectsView.vue')
        }
      ]
    },
    
    {
      path: '/about-me',
      name: 'mainAboutMe',
      component: () => import('../views/AboutMeView.vue')
    },
    {
      path: '/-projects',
      name: 'mainProjects',
      component: () => import('../views/MyProjectsView.vue')
    },
    {
      path: '/four-in-a-row',
      name: 'fourInARow',
      component: () => import('../views/FourInARowView.vue'),
    },
    {
      path: '/macro-tracker',
      name: 'macro-tracker',
      component: () => import('../views/MacroTracker/MacroTrackerView.vue'),
      children: [
        {
          path: '/login', name: 'login', component: () => import('../views/MacroTracker/LoginView.vue')
        },
        {
          path: '/home', name: 'home', component: () => import('../views/MacroTracker/HomeView.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/profile', name: 'profile', component: () => import('../views/MacroTracker/ProfileView.vue'),
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
  ] 
})

export default router
