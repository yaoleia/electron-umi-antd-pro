import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  history: {
    type: 'hash',
  },
  hash: true,
  antd: {
    dark: true, // compact: true,
  },
  dva: {
    hmr: true,
  },
  outputPath: './dist/renderer',
  publicPath: './',
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/listprojects',
            },
            {
              name: '项目',
              icon: 'ProjectOutlined',
              path: '/listprojects',
              component: './ListProjects',
            },
            {
              name: '数据集',
              icon: 'DatabaseOutlined',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: '模型',
              icon: 'RadarChartOutlined',
              path: '/modellist',
              component: './ModelList',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './ListProjects',
                  authority: ['admin'],
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  headScripts: [
    {
      src: './renderer.js',
    },
  ],
});
