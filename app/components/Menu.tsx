import React from 'react';
import { Menu } from 'antd/';
import { Link, withRouter } from 'react-router-dom';
import * as Icon from '@ant-design/icons';
import { routes } from '../router';

const { Item } = Menu;

const iconBC = (name: string) =>
  React.createElement(Icon && (Icon as any)[name]);

const SiderMenu = withRouter(({ history }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['home']}
      selectedKeys={[history.location.pathname]}
    >
      {routes.map(
        (route) =>
          route.icon && (
            <Item key={route.path} icon={iconBC(route.icon)}>
              <Link to={route.path}>{route.name}</Link>
            </Item>
          )
      )}
    </Menu>
  );
});
export default React.memo(SiderMenu);
