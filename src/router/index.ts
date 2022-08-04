import { createRouter, createWebHistory, RouterOptions, RouteRecordRaw } from 'vue-router';

// 路由
export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/generate-code',
  },
  // {
  //   meta: {
  //     title: '按钮',
  //   },
  //   name: 'Button',
  //   path: '/docs/button',
  //   component: () => import('@/docs/button/README.md'),
  // },
  {
    meta: {
      title: '代码生产',
    },
    name: 'GenerateCode',
    path: '/generate-code',
    component: () => import('@/packages/generate-low-code/index.vue'),
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
