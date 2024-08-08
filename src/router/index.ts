import { hideAlert } from '@/Logic/MacroTracker/hideAlert'
import { createRouter, createWebHistory } from 'vue-router'

const macroLogin = 'macroLogin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Portfolio/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'about',
          component: () => import('../views/Portfolio/AboutMeView.vue')
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('../views/Portfolio/MyProjectsView.vue')
        }
      ]
    },

    {
      path: '/about',
      name: 'mainAbout',
      component: () => import('../views/Portfolio/AboutMeView.vue')
    },
    {
      path: '/projects',
      name: 'mainProjects',
      component: () => import('../views/Portfolio/MyProjectsView.vue')
    },
    {
      path: '/four-in-a-row',
      name: 'fourInARow',
      component: () => import('../views/Four-in-a-row/FourInARowView.vue')
    },
    {
      path: '/macro-tracker',
      name: 'macro-tracker',
      component: () => import('../views/MacroTracker/MacroTrackerView.vue'),
      children: [
        {
          path: '',
          name: 'Redirecting to home',
          redirect: '/macro-tracker/home'
        },
        {
          path: 'login',
          name: 'macroLogin',
          component: () => import('../views/MacroTracker/LoginView.vue')
        },
        {
          path: 'register',
          name: 'macroRegister',
          component: () => import('../views/MacroTracker/RegisterView.vue')
        },
        {
          path: 'home',
          name: 'macroHome',
          component: () => import('../views/MacroTracker/HomeView.vue'),
          meta: { requiresAuth: true, authRedirect: macroLogin }
        },
        {
          path: 'meals',
          name: 'macroMeals',
          component: () => import('../views/MacroTracker/MealsView.vue'),
          meta: { requiresAuth: true, authRedirect: macroLogin }
        },
        {
          path: 'ingredients',
          name: 'macroIngredients',
          component: () => import('../views/MacroTracker/IngredientsView.vue'),
          meta: { requiresAuth: true, authRedirect: macroLogin }
        },
        {
          path: 'profile',
          name: 'macroProfile',
          component: () => import('../views/MacroTracker/ProfileView.vue'),
          meta: { requiresAuth: true, authRedirect: macroLogin }
        }
      ]
    }
  ]
})

function isAuthenticated() {
  return (
    localStorage.getItem('token') &&
    localStorage.getItem('user_id') &&
    localStorage.getItem('username')
  )
}

router.beforeEach((to, from, next) => {
  hideAlert()

  if (to.meta.requiresAuth && !isAuthenticated()) {
    console.log('User is not authed, redirecting to:', to.meta.authRedirect)
    next({ name: to.meta.authRedirect as string })
  } else {
    console.log('Routing to website: ', to.name, 'from: ', from.name)
    next()
  }
})

router.afterEach((to, from, failure) => {
  console.log('After:', to, from, failure)
})

export default router
