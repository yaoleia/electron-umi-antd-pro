import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Store } from '../store';
import Routes from '../Routes';
import Menu from '../components/Menu';

const { Header, Sider, Content } = Layout;

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <Layout className="main-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default hot(Root);
