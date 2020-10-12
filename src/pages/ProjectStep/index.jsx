import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

export default ({ location }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div
      className={styles.main}
      style={{
        paddingTop: 100,
        textAlign: 'center',
      }}
    >
      <Link to="/projectlist">projectlist</Link>
      <Spin spinning={loading} size="large" />
      <p>{location.state?.item?.title}</p>
    </div>
  );
};
