import React from 'react';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;
export default () => (
  <div>
    <div id="components-steps-demo-icon">
      <Steps>
        <Step status="finish" title="Login" icon={<UserOutlined />} />
        <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
        <Step status="process" title="Pay" icon={<LoadingOutlined />} />
        <Step status="wait" title="Done" icon={<SmileOutlined />} />
      </Steps>
    </div>
  </div>
);
