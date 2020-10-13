import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

export default ({ location, history }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.query?.pid) return;
    history.push('/projectlist');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
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
      <p>{location.query?.pid}</p>
    </div>
  );
};
