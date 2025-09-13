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
    displayName: 'View Project',
    component: () => import('../views/AboutProjectView.vue')
  },
  fourInARow: {
    path: '/four-in-a-row',
    name: 'fourInARow',
    displayName: 'Four in a Row',
    component: () => import('../views/FourInARowView.vue')
  },
  home: {
    path: '/:pathMatch(.*)*',
    name: 'home',
    displayName: 'Home',
    component: () => import('../views/HomeView.vue')
  }
}
