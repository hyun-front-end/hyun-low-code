import { createRouter, createWebHistory, RouterOptions, RouteRecordRaw } from 'vue-router';

// 路由
export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/docs/button',
  },
  {
    meta: {
      title: '按钮',
    },
    name: 'Button',
    path: '/docs/button',
    component: () => import('@/docs/button/README.md'),
  },
  {
    meta: {
      title: '测试',
    },
    name: 'DashboardConsole',
    path: '/dashboard/console',
    component: () => import('@/docs/dashboard/console/console.vue'),
  },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
} as RouterOptions);

export default router;
