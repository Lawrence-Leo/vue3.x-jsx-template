import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.js';
import ElTableInfiniteScroll from 'el-table-infinite-scroll';
import router from './router';

import ElementPlus from 'element-plus';
import '@/styles/el-reset.scss';

import '@/styles/normalize.css';
import '@/styles/base.css';
import '@/styles/reset.css';
import '@/styles/global.css';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .use(ElTableInfiniteScroll)
  .mount('#app');
