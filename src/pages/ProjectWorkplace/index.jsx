import { Avatar, Card, Col, List, Row } from 'antd';
import React, { Component } from 'react';
import { Link, connect } from 'umi';
import moment from 'moment';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

class DashboardWorkplace extends Component {
  UNSAFE_componentWillMount() {
    const {
      location: { query = {} },
      history,
    } = this.props;
    const { pid } = query;
    if (pid) {
      document.title = `工作台 - ${pid}`;
      return;
    }
    history.push('/projectlist');
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardWorkplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardWorkplace/clear',
    });
  }

  renderActivities = (item) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      currentUser,
      location: { query = {} },
    } = this.props;

    if (!currentUser || !currentUser.userid) {
      return null;
    }

    return (
      <div>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title={`当前项目: ${query.pid || ''}`}
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              bodyStyle={{
                padding: 0,
              }}
            ></Card>
            <Card
              bodyStyle={{
                padding: 0,
              }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
            >
              <List
                renderItem={(item) => this.renderActivities(item)}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              title="XX 指数"
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} />
              </div>
            </Card>
            <Card
              bodyStyle={{
                paddingTop: 12,
                paddingBottom: 12,
              }}
              bordered={false}
              title="团队"
            >
              <div className={styles.members}>
                <Row gutter={48}></Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(DashboardWorkplace);
