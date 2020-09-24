export const routes = [
  {
    title: '首页',
    name: 'home',
    path: '/',
    icon: 'HomeOutlined',
  },
  {
    title: '数据集',
    name: 'dataset',
    path: '/dataset',
    icon: 'DatabaseOutlined',
  },
  {
    title: '模型',
    name: 'model',
    path: '/model',
    icon: 'RadarChartOutlined',
  },
  {
    name: 'counter',
    path: '/counter',
  },
  {
    name: 'notFound',
  },
];

export function findRoute(name: string) {
  return routes.find((route) => route.name === name);
}
