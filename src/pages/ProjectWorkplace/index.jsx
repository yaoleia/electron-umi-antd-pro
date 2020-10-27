import { Avatar, Card, Col, List, Row, Steps, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect } from 'umi';
import moment from 'moment';
import { RollbackOutlined } from '@ant-design/icons';
import ScreenFull from '@/components/ScreenFull';
import DashboardAnalysis from '@/pages/DashboardAnalysis';
import DashboardMonitor from '@/pages/DashboardMonitor';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';

const { Step } = Steps;

const steps = [
  {
    title: '数据',
  },
  {
    title: '训练',
  },
  {
    title: '评估',
  },
];

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

const ProjectWorkplace = ({ location: { query = {} }, history, currentUser }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const { pid } = query;
    if (pid) {
      document.title = `工作台 - ${pid}`;
      return;
    }

    history.push('/projectlist');
  }, []);

  const renderActivities = (item) => {
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

  if (!currentUser || !currentUser.userid) {
    return null;
  }

  const Dataset = () => (
    <Row gutter={24}>
      <Col xl={16} lg={24} md={24} sm={24} xs={24}>
        <Card
          bodyStyle={{
            padding: 0,
          }}
          bordered={false}
          className={styles.activeCard}
          title="动态"
        >
          <List
            renderItem={(item) => renderActivities(item)}
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
          <div className={styles.chart}>chart</div>
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
  );

  return (
    <div>
      <Card
        className={styles.projectList}
        style={{
          marginBottom: 24,
        }}
        title={
          <>
            <Link className={styles.goBack} to="/">
              <RollbackOutlined /> 返回
            </Link>
            <ScreenFull />
            <span className={styles.projectTitle}>{`当前项目: ${query.pid || ''}`}</span>
          </>
        }
        bordered={false}
        extra={
          <div className="steps-action">
            {current > 0 && (
              <Button
                style={{
                  marginRight: 10,
                }}
                onClick={() => setCurrent(current - 1)}
              >
                上一步
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => setCurrent(current + 1)}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('模型已保存!')}>
                保存模型
              </Button>
            )}
          </div>
        }
        bodyStyle={{
          padding: 0,
        }}
      ></Card>
      <Steps current={current} className={styles.stepContainer}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {current === 0 && <Dataset />}
      {current === 1 && <DashboardAnalysis />}
      {current === 2 && <DashboardMonitor />}
    </div>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(ProjectWorkplace);
