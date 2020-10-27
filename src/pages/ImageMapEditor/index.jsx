import React, { useEffect } from 'react';
import { PageHeader } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import styles from './index.less';
export default ({ history }) => {
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <PageHeader
        backIcon={
          <a>
            <RollbackOutlined /> 返回
          </a>
        }
        className="site-page-header"
        onBack={history.goBack}
        title="数据标注"
      />
    </div>
  );
};
