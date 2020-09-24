import React from 'react';
import { Menu } from 'antd/';
import { Link, withRouter } from 'react-router-dom';
import * as Icon from '@ant-design/icons';
import { routes } from '../router';

const { Item } = Menu;

const iconBC = (name: string) =>
  React.createElement(Icon && (Icon as any)[name]);

const SiderMenu = withRouter(({ history }) => {
  const { pathname } = history.location;

  const selectedKeys = routes
    .filter((route) => {
      if (!route.path) return false;
      if (route.path === '/') return pathname === '/';
      return pathname.startsWith(route.path);
    })
    .map((route) => route.path);

  return (
    <Menu theme="dark" mode="inline" selectedKeys={selectedKeys as any}>
      {routes.map(
        (route) =>
          route.icon && (
            <Item key={route.path} icon={iconBC(route.icon)}>
              <Link to={route.path}>{route.title}</Link>
            </Item>
          )
      )}
    </Menu>
  );
});
export default React.memo(SiderMenu);
