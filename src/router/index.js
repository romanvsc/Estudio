import { createRouter, createWebHistory } from 'vue-router'
import { getLegacyExamRedirect } from '../content/subjects'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/SubjectSelector.vue')
  },
  {
    path: '/modelos-final',
    name: 'FinalModelsHub',
    component: () => import('../views/FinalModelsHub.vue')
  },
  {
    path: '/repaso',
    name: 'ReviewHub',
    component: () => import('../views/ReviewHub.vue')
  },
  {
    path: '/modelos-final/:subject/:examId',
    name: 'SubjectExam',
    component: () => import('../views/SubjectExam.vue')
  },
  {
    path: '/:subject/dashboard',
    name: 'SubjectDashboard',
    component: () => import('../views/SubjectDashboard.vue')
  },
  {
    path: '/:subject/unidad/:unitId',
    name: 'SubjectUnit',
    component: () => import('../views/SubjectUnit.vue')
  },
  { path: '/unidad/:id', redirect: to => `/contabilidad/unidad/${to.params.id}` },
  { path: '/dashboard', redirect: '/contabilidad/dashboard' },
  { path: '/modelo-final', redirect: '/modelos-final/contabilidad/final-1' },
  { path: '/modelo-final-2', redirect: '/modelos-final/contabilidad/final-2' },
  { path: '/modelo-final-3', redirect: '/modelos-final/contabilidad/final-3' },
  { path: '/modelo-final-4', redirect: '/modelos-final/contabilidad/final-4' },
  { path: '/contabilidad/modelo-final', redirect: to => getLegacyExamRedirect(to.path) },
  { path: '/contabilidad/modelo-final-2', redirect: to => getLegacyExamRedirect(to.path) },
  { path: '/contabilidad/modelo-final-3', redirect: to => getLegacyExamRedirect(to.path) },
  { path: '/contabilidad/modelo-final-4', redirect: to => getLegacyExamRedirect(to.path) },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

export default router
