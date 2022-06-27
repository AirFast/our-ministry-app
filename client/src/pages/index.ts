import type { RouteRecordRaw } from 'vue-router'

export const pages: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true },
    component: () => import('./home'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { auth: false },
    component: () => import('./login'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { auth: false },
    component: () => import('./register'),
  }
]