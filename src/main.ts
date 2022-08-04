import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupNaive } from '@/plugins';
import { installComponent } from '@/packages';
import './styles/index.less';

async function onMounted() {
  const app = createApp(App);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  // 挂载路由
  app.use(router);

  // 挂载组件
  app.use(installComponent);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount('#app', true);
}

void onMounted();
