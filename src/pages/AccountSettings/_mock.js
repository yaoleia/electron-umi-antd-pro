// eslint-disable-next-line import/no-extraneous-dependencies
import city from './geographic/city.json';
import province from './geographic/province.json';

function getProvince(_, res) {
  return res.json(province);
}

function getCity(req, res) {
  return res.json(city[req.params.province]);
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};
