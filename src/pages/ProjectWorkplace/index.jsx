import React, { useEffect } from 'react';
import styles from './index.less';
import StepsIcon from './StepsIcon';
export default ({ location: { query = {} }, history }) => {
  useEffect(() => {
    const { pid } = query;
    if (pid) {
      document.title = `工作台 - ${pid}`;
      return;
    }
    history.push('/projectlist');
  }, []);

  return (
    <div className={styles.main}>
      <StepsIcon />
    </div>
  );
};
