import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Store } from '../store';
import Routes from '../router/Routes';
import Menu from '../components/Menu';
import logo from '../assets/256x256.png';

const { Header, Sider, Content } = Layout;

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout className="main-layout">
          <Sider
            onCollapse={(e) => setCollapsed(e)}
            collapsible
            collapsed={collapsed}
          >
            <Link to="/" className="logo">
              <img alt="logo" src={logo} />
              <span>ManuVision</span>
            </Link>
            <Menu />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Root);
