import React from 'react';
import { Card } from 'antd';
import { history } from 'umi';
import { RollbackOutlined } from '@ant-design/icons';
import ScreenFull from '@/components/ScreenFull';
import styles from './style.less';

export default (props) => {
  const { children, name, defaultPath = '/', ...otherProps } = props;
  const { redirect } = history.location.query;
  const goBack = () => history.push(redirect || defaultPath);
  return (
    <Card
      className={styles.cardWrap}
      style={{
        marginBottom: 24,
      }}
      title={
        <>
          <a className={styles.goBack} onClick={goBack}>
            <RollbackOutlined /> 返回
          </a>
          <ScreenFull />
          <span className={styles.title}>{name}</span>
        </>
      }
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
      {...otherProps}
    >
      {children}
    </Card>
  );
};
