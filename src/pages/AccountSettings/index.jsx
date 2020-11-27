import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import styles from './style.less';

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          上传新头像
        </Button>
      </div>
    </Upload>
  </>
);

class BaseView extends Component {
  view = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;

    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  }

  getViewDom = (ref) => {
    this.view = ref;
  };
  handleFinish = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: { ...values },
    });
    message.success('个人设置保存成功！');
  };

  render() {
    const { currentUser } = this.props;
    return (
      <GridContent>
        <div className={styles.main}>
          <div className={styles.right}>
            <div className={styles.title}>个人设置</div>
            <div className={styles.baseView} ref={this.getViewDom}>
              <div className={styles.left}>
                <Form
                  layout="vertical"
                  onFinish={this.handleFinish}
                  initialValues={currentUser}
                  hideRequiredMark
                >
                  <Form.Item name="time" label="注册日期">
                    <Input readOnly disabled />
                  </Form.Item>
                  <Form.Item name="username" label="用户名">
                    <Input readOnly disabled />
                  </Form.Item>
                  <Form.Item
                    name="nickname"
                    label="用户昵称"
                    rules={[
                      {
                        message: '请填写用户昵称',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="电子邮箱"
                    rules={[
                      {
                        message: '请填写电子邮箱地址',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="title"
                    label="职位名称"
                    rules={[
                      {
                        message: '请填写职位名称',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="电话号码"
                    rules={[
                      {
                        message: '请填写电话号码',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      保存设置
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className={styles.right}>
                <AvatarView avatar={this.getAvatarURL()} />
              </div>
            </div>
          </div>
        </div>
      </GridContent>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(BaseView);
