import React, { useEffect } from 'react';
import TitleBar from './TitleBar';
import LeftMenu from './LeftMenu';
// import LayoutForm from './LayoutForm';
// import SnapshotForm from './SnapshotForm';

import '../styles/frame-styles.css';
import '../styles/light-theme.css';

const PlatformWindow = () => {

  useEffect(() => {
    const containerId = 'layout-container';
    // Before .50 AI version this may throw...
    window.fin.Platform.Layout.init({ containerId });
  }, []);

  return (
    <div id="of-frame-main">
      <TitleBar />
      <div id="body-container">
        <LeftMenu></LeftMenu>
        <div className="two-sided-container">
          <div id="layout-container" className="face"></div>
          {/* <LayoutForm className="face hidden"></LayoutForm> */}
          {/* <SnapshotForm className="face hidden"></SnapshotForm> */}
        </div>
      </div>
    </div>
  )
}

export default PlatformWindow;