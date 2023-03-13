import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/Layout';

export const routes = [
  {
    path: '/',
    redirect: '/table/baseTable',
  },
  {
    path: '/table',
    name: '表格',
    icon: 'biaoge',
    component: Layout,
    children: [
      {
        name: '基本表单',
        path: '',
        children: [
          {
            path: '/table/baseTable',
            name: 'baseTable',
            meta: {
              title: 'baseTable',
            },
            component: () => import('@/views/table/baseTable'),
          },
        ],
      },
      {
        name: '通用表单',
        path: '',
        children: [
          {
            path: '/table/commonTable',
            name: 'commonTable',
            meta: {
              title: 'commonTable',
            },
            component: () => import('@/views/table/commonTable'),
          },
        ],
      },
      {
        name: '无分页表单',
        path: '',
        children: [
          {
            path: '/table/noPageTable',
            name: 'noPageTable',
            meta: {
              title: 'noPageTable',
            },
            component: () => import('@/views/table/noPageTable'),
          },
        ],
      },
    ],
  },
  {
    path: '/form',
    name: '表单',
    icon: 'biaodan',
    component: Layout,
    children: [
      {
        path: '',
        name: '基础表格',
        children: [
          {
            path: '/form/baseForm',
            name: 'baseForm',
            component: () => import('@/views/form/baseForm'),
            meta: {
              title: '基础表单',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/chart',
    name: '图表',
    icon: 'tubiao',
    component: Layout,
    children: [
      {
        name: '柱状图',
        path: '',
        children: [
          {
            path: '/chart/bar',
            name: 'bar',
            component: () => import('@/views/chartBar'),
            meta: {
              title: 'bar',
            },
          },
        ],
      },
      {
        name: '折线图',
        path: '',
        children: [
          {
            path: '/chart/line',
            name: 'line',
            component: () => import('@/views/chartLine'),
            meta: {
              title: 'line',
            },
          },
        ],
      },
      {
        name: '饼图',
        path: '',
        children: [
          {
            path: '/chart/pie',
            name: 'pie',
            component: () => import('@/views/chartPie'),
            meta: {
              title: 'pie',
            },
          },
        ],
      },
      {
        name: '综合案例',
        path: '',
        children: [
          {
            path: '/chart/example',
            name: 'example',
            component: () => import('@/views/chartExample'),
            meta: {
              title: 'example',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/preview',
    name: '预览',
    icon: 'yulan',
    component: Layout,
    children: [
      {
        path: '',
        name: '文件预览',
        children: [
          {
            path: '/preview/file',
            name: 'previewFile',
            component: () => import('@/views/preview'),
            meta: {
              title: 'previewFile',
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
