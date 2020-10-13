import { Card, List, Typography, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import ProTable from '@ant-design/pro-table';
import AvatarList from './components/AvatarList';
import styles from './style.less';

const { Paragraph } = Typography;

const getKey = (id, index) => `${id}-${index}`;

const ProjectList = ({ dispatch, projectList: { list = [] }, loading, history }) => {
  const [modalVisible, handleModalVisible] = useState(false);
  useEffect(() => {
    dispatch({
      type: 'projectList/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);
  const cardList = list && (
    <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            history.push({
              pathname: '/projectlist/projectstep',
              query: {
                pid: item.title,
              },
            });
          }}
        >
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Button type="primary" onClick={() => handleModalVisible(true)}>
          新建项目
        </Button>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
      <Modal
        destroyOnClose
        title="新建项目"
        visible={modalVisible}
        onCancel={() => handleModalVisible(false)}
        footer={null}
      >
        <ProTable
          rowKey="key"
          type="form"
          columns={[
            {
              title: '规则名称',
              dataIndex: 'name',
              tip: '规则名称是唯一的 key',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '规则名称为必填项',
                  },
                ],
              },
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default connect(({ projectList, loading }) => ({
  projectList,
  loading: loading.models.projectList,
}))(ProjectList);
