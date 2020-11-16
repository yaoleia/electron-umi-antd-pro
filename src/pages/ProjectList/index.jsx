import { Card, List, Typography, Button, Modal, message, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import ProForm, { ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import AvatarList from './components/AvatarList';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const FormItem = Form.Item;
const { Paragraph } = Typography;

const getKey = (id, index) => `${id}-${index}`;

const ProjectList = ({ dispatch, projectList: { list = [] }, loading, history }) => {
  const [modalVisible, handleModalVisible] = useState(false);
  const [tags, handleTagsChange] = useState([]);
  const getProjectList = () => {
    dispatch({
      type: 'projectList/fetch',
      payload: {
        count: 8,
      },
    });
  };
  // useEffect(() => {
  //   window.addEventListener('focus', getProjectList);
  //   return () => {
  //     window.removeEventListener('focus', getProjectList);
  //   };
  // });
  useEffect(getProjectList, []);
  const types = {
    defect: '缺陷检测',
    position: '目标检测',
    classification: '分类',
    ocr: '字符识别',
    keypoint: '关键点检测',
  };

  const listFiltered = tags.length ? list.filter((item) => tags.includes(item.projectType)) : list;
  const cardList = (
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
      dataSource={listFiltered}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            // window.open(`/#/projectworkplace?pid=${item.id}`, '_blank');
            history.push({
              pathname: '/projectworkplace',
              query: {
                pid: item.title,
              },
            });
          }}
        >
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={
                <>
                  <a>{item.title}</a> - <i>{types[item.projectType] || item.projectType}</i>
                </>
              }
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {item.description}
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
      <Card className={styles.cardTop} bordered={false}>
        <Form
          layout="inline"
          onValuesChange={(values) => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            handleTagsChange(values.typeSelect);
            dispatch({
              type: 'listProjects/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            新建项目
          </Button>
          <FormItem name="typeSelect">
            <TagSelect>
              {Object.keys(types).map((type) => (
                <TagSelect.Option value={type} key={type}>
                  {types[type]}
                </TagSelect.Option>
              ))}
            </TagSelect>
          </FormItem>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
      <Modal
        destroyOnClose
        title="新建项目"
        visible={modalVisible}
        onCancel={() => handleModalVisible(false)}
        footer={null}
      >
        <ProForm
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功！');
            handleModalVisible(false);
          }}
        >
          <ProFormText
            width="100%"
            name="title"
            label="项目名称"
            placeholder="请输入"
            rules={[{ required: true, message: '请填写项目名称！' }]}
          />
          <ProFormRadio.Group
            name="projectType"
            label="项目类型"
            rules={[{ required: true, message: '请选择项目类型！' }]}
          >
            {Object.keys(types).map((type) => (
              <ProFormRadio.Button value={type} key={type}>
                {types[type]}
              </ProFormRadio.Button>
            ))}
          </ProFormRadio.Group>
          <ProFormTextArea width="100%" name="description" label="备注" placeholder="请输入备注" />
        </ProForm>
      </Modal>
    </div>
  );
};

export default connect(({ projectList, loading }) => ({
  projectList,
  loading: loading.models.projectList,
}))(ProjectList);
