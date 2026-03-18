import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/SubjectSelector.vue')
    },
    // ── Contabilidad ──
    {
        path: '/contabilidad/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/contabilidad/unidad/1',
        name: 'Unidad1',
        component: () => import('../views/Unidad1.vue')
    },
    {
        path: '/contabilidad/unidad/2',
        name: 'Unidad2',
        component: () => import('../views/Unidad2.vue')
    },
    {
        path: '/contabilidad/unidad/3',
        name: 'Unidad3',
        component: () => import('../views/Unidad3.vue')
    },
    {
        path: '/contabilidad/unidad/4',
        name: 'Unidad4',
        component: () => import('../views/Unidad4.vue')
    },
    {
        path: '/contabilidad/unidad/5',
        name: 'Unidad5',
        component: () => import('../views/Unidad5.vue')
    },
    {
        path: '/contabilidad/modelo-final',
        name: 'ModeloFinal',
        component: () => import('../views/ModeloFinal.vue')
    },
    {
        path: '/contabilidad/modelo-final-2',
        name: 'ModeloFinal2',
        component: () => import('../views/ModeloFinal2.vue')
    },
    {
        path: '/contabilidad/modelo-final-3',
        name: 'ModeloFinal3',
        component: () => import('../views/ModeloFinal3.vue')
    },
    {
        path: '/contabilidad/modelo-final-4',
        name: 'ModeloFinal4',
        component: () => import('../views/ModeloFinal4.vue')
    },
    // ── Sistemas de Datos III ──
    {
        path: '/sd3/dashboard',
        name: 'SD3Dashboard',
        component: () => import('../views/SD3Dashboard.vue')
    },
    {
        path: '/sd3/unidad/1',
        name: 'SD3Unidad1',
        component: () => import('../views/SD3Unidad1.vue')
    },
    {
        path: '/sd3/unidad/2',
        name: 'SD3Unidad2',
        component: () => import('../views/SD3Unidad2.vue')
    },
    {
        path: '/sd3/unidad/3',
        name: 'SD3Unidad3',
        component: () => import('../views/SD3Unidad3.vue')
    },
    {
        path: '/sd3/unidad/4',
        name: 'SD3Unidad4',
        component: () => import('../views/SD3Unidad4.vue')
    },
    {
        path: '/sd3/unidad/5',
        name: 'SD3Unidad5',
        component: () => import('../views/SD3Unidad5.vue')
    },
    // ── Legacy redirects ──
    { path: '/unidad/:id', redirect: to => `/contabilidad/unidad/${to.params.id}` },
    { path: '/dashboard', redirect: '/contabilidad/dashboard' },
    { path: '/modelo-final', redirect: '/contabilidad/modelo-final' },
    { path: '/modelo-final-2', redirect: '/contabilidad/modelo-final-2' },
    { path: '/modelo-final-3', redirect: '/contabilidad/modelo-final-3' },
    { path: '/modelo-final-4', redirect: '/contabilidad/modelo-final-4' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        return savedPosition || { top: 0, behavior: 'smooth' }
    }
})

export default router
