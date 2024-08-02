import { token } from '@/Logic/MacroTracker/token';
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
      component: () => import('../views/Four-in-a-row/FourInARowView.vue'),
    },
    {
      path: '/macro-tracker',
      name: 'macro-tracker',
      component: () => import('../views/MacroTracker/MacroTrackerView.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: 'login', 
          name: 'macroLogin', 
          component: () => import('../views/MacroTracker/LoginView.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: 'home', 
          name: 'macroHome', 
          component: () => import('../views/MacroTracker/HomeView.vue'),
          meta: { requiresAuth: true, authRedirect: macroLogin}
        },
        {
          path: 'profile', 
          name: 'macroProfile', 
          component: () => import('../views/MacroTracker/ProfileView.vue'),
          meta: { requiresAuth: true, authRedirect: macroLogin}
        }
      ]
    },
  ] 
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !token.value) {

      next({ name: to.meta.authRedirect as string });
      
    } else {
      console.log('Routing to website')
      next();
    }
  }
);

export default router
