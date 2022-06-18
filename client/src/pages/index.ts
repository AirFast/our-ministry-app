import type { RouteRecordRaw } from 'vue-router'

export const pages: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./home'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./login'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./register'),
  },
]