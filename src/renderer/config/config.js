const buildrc = require("../../../.buildrc.js");

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'Hello World',
        dll: true,
        // routes: {
        //   exclude: [],
        // },
        hardSource: false,
        routes: {
          exclude: [/components/],
        },
      },
    ],
  ],
  alias: buildrc.webpack.alias,
  treeShaking: true,
  ignoreMomentLocale: true,
  routes: [
    {
      path: '/',
      component: './index',
    },
  ],
};
