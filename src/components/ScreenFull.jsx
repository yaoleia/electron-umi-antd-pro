import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import screenfull from 'screenfull';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

export default () => {
  const [isFullscreen, setFullScreen] = useState(screenfull.isEnabled && screenfull.isFullscreen);
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
    <Button
      type="text"
      shape="circle"
      onClick={() => handleFullScreen()}
      icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    />
  );
};
