import React, { useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import styles from './index.less';

export default () => {
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <PageHeader name="数据标注" defaultPath="/datasetlist" />
    </div>
  );
};
