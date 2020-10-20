import { Tag, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import screenfull from 'screenfull';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  const [isFullscreen, setFullScreen] = useState(false);
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) {
      return false;
    }
    screenfull.toggle();
  };

  const screenfullChange = () => setFullScreen(screenfull.isFullscreen);

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', screenfullChange);
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', screenfullChange);
      }
    };
  }, []);

  return (
    <div className={className}>
      <Button
        type="text"
        shape="circle"
        onClick={() => handleFullScreen()}
        icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      />
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
