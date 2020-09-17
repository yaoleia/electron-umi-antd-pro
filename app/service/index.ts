/**
 * Created by hao.cheng on 2017/4/16.
 */
import { get, post } from './axios';

export const login = (json: any) => post('/base/user/login', json);

export const npmDependencies = () => get('./npm.json');

export const weibo = () =>
  get('./weibo.json')
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const gitOauthLogin = () =>
  get(
    '/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin'
  );
