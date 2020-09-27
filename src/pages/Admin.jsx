import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default () => (
  <PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看">
    <Card>
      <Typography.Title
        level={2}
        style={{
          textAlign: 'center',
        }}
      >
        <SmileTwoTone /> Trainer <HeartTwoTone twoToneColor="#eb2f96" />
      </Typography.Title>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
);
