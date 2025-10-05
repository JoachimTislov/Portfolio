export default {
  about: {
    path: '/more-of-me',
    name: 'about',
    displayName: 'My Background',
    component: () => import('../views/AboutMeView.vue')
  },
  project: {
    path: '/about/:project',
    name: 'project',
    component: () => import('../views/AboutProjectView.vue')
  },
  connectFour: {
    path: '/connect-four',
    name: 'connectFour',
    displayName: 'Connect Four - Bot',
    component: () => import('../views/ConnectFourView.vue')
  },
  home: {
    path: '/:pathMatch(.*)*',
    name: 'home',
    displayName: 'Home',
    component: () => import('../views/HomeView.vue')
  }
}
