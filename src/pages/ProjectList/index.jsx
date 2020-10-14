import { Card, List, Typography, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import ProTable from '@ant-design/pro-table';
import AvatarList from './components/AvatarList';
import styles from './style.less';

const { Paragraph } = Typography;

const getKey = (id, index) => `${id}-${index}`;

const ProjectList = ({ dispatch, projectList: { list = [] }, loading }) => {
  const [modalVisible, handleModalVisible] = useState(false);
  const getProjectList = () => {
    dispatch({
      type: 'projectList/fetch',
      payload: {
        count: 8,
      },
    });
  };
  useEffect(() => {
    window.addEventListener('focus', getProjectList);
    return () => {
      window.removeEventListener('focus', getProjectList);
    };
  });
  useEffect(getProjectList, []);
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
            window.open(`/#/projectlist/projectstep?pid=${item.title}`, '_blank');
            // history.push({
            //   pathname: '/projectlist/projectstep',
            //   query: {
            //     pid: item.title,
            //   },
            // });
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
              title: '项目名称',
              dataIndex: 'name',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '项目名称为必填项',
                  },
                ],
              },
            },
            {
              title: '项目类型',
              dataIndex: 'type',
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '项目名称为必填项',
                  },
                ],
              },
            },
            {
              title: '项目描述',
              dataIndex: 'description',
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
