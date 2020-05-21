const buildrc = require("../../../.buildrc.js");

export default {
  history: { type: 'hash' },
  outputPath: `../../dist/renderer`,
  publicPath: './',
  dva: {
    immer: true,
    hmr: false,
  },
  title: 'umi 3.0',

  alias: buildrc.webpack.alias,
  ignoreMomentLocale: true,
  routes: [
    {
      path: '/',
      component: './index',
    },
  ],
};
