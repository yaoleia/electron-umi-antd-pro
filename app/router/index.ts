export const routes = [
  {
    name: 'home',
    path: '/',
    icon: 'HomeOutlined',
  },
  {
    name: 'dataset',
    path: '/dataset',
    icon: 'DatabaseOutlined',
  },
  {
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
