import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect } from 'umi';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import GeographicView from './components/GeographicView';
import PhoneView from './components/PhoneView';
import styles from './style.less';
const { Option } = Select; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>Avatar</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          Change avatar
        </Button>
      </div>
    </Upload>
  </>
);

const validatorGeographic = (_, value, callback) => {
  const { province, city } = value;

  if (!province.key) {
    callback('Please input your province!');
  }

  if (!city.key) {
    callback('Please input your city!');
  }

  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');

  if (!values[0]) {
    callback('Please input your area code!');
  }

  if (!values[1]) {
    callback('Please input your phone number!');
  }

  callback();
};

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
  handleFinish = () => {
    message.success('accountsettings.basic.update.success');
  };

  render() {
    const { currentUser } = this.props;
    return (
      <GridContent>
        <div className={styles.main}>
          <div className={styles.right}>
            <div className={styles.title}>Basic Settings</div>
            <div className={styles.baseView} ref={this.getViewDom}>
              <div className={styles.left}>
                <Form
                  layout="vertical"
                  onFinish={this.handleFinish}
                  initialValues={currentUser}
                  hideRequiredMark
                >
                  <Form.Item
                    name="email"
                    label="accountsettings.basic.email"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.email-message',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="name"
                    label="accountsettings.basic.nickname"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.nickname-message',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="profile"
                    label="accountsettings.basic.profile"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.profile-message',
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="accountsettings.basic.profile-placeholder"
                      rows={4}
                    />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    label="accountsettings.basic.country"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.country-message',
                      },
                    ]}
                  >
                    <Select
                      style={{
                        maxWidth: 220,
                      }}
                    >
                      <Option value="China">中国</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="geographic"
                    label="accountsettings.basic.geographic"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.geographic-message',
                      },
                      {
                        validator: validatorGeographic,
                      },
                    ]}
                  >
                    <GeographicView />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="accountsettings.basic.address"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.address-message',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="accountsettings.basic.phone"
                    rules={[
                      {
                        required: true,
                        message: 'accountsettings.basic.phone-message',
                      },
                      {
                        validator: validatorPhone,
                      },
                    ]}
                  >
                    <PhoneView />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Update Information
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
