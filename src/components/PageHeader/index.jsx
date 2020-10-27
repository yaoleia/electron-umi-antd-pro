import React from 'react';
import { Card } from 'antd';
import { Link, history } from 'umi';
import { RollbackOutlined } from '@ant-design/icons';
import ScreenFull from '@/components/ScreenFull';
import styles from './style.less';

export default (props) => {
  const { children, name, backTo, defaultPath, ...otherProps } = props;
  const goBack = () => {
    if (history.action === 'POP') return history.push(defaultPath || '/');
    history.goBack();
  };
  return (
    <Card
      className={styles.cardWrap}
      style={{
        marginBottom: 24,
      }}
      title={
        <>
          {backTo ? (
            <Link className={styles.goBack} to={backTo}>
              <RollbackOutlined /> 返回
            </Link>
          ) : (
            <a className={styles.goBack} onClick={goBack}>
              <RollbackOutlined /> 返回
            </a>
          )}
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
