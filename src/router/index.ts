import { hideAlert } from '@/Logic/MacroTracker/alertFunctions'
import { token } from '@/Logic/MacroTracker/variables'
import { createRouter, createWebHistory } from 'vue-router'

const macroLogin = 'macroLogin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Portfolio/HomeView.vue')
    },
    {
      path: '/more-of-me',
      name: 'aboutMe',
      component: () => import('../views/Portfolio/AboutMeView.vue')
    },
    {
      path: '/about-project',
      name: 'aboutProject',
      component: () => import('../views/Portfolio/AboutProjectView.vue')
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
          path: 'calender',
          name: 'macroCalender',
          component: () => import('../views/MacroTracker/CalenderView.vue'),
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
  return token.value
}

router.beforeEach((to, from, next) => {
  if (to.name != 'macroLogin' && to.name != 'macroHome' && to.name != 'macroProfile') {
    hideAlert()
  }

  if (to.name != 'home') {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'instant'
    })
  }

  if (to.meta.requiresAuth && !isAuthenticated()) {
    //console.log('User is not authed, redirecting to:', to.meta.authRedirect)
    next({ name: to.meta.authRedirect as string })
  } else {
    //console.log('Routing to website: ', to.name, 'from: ', from.name)
    next()
  }
})

export default router
