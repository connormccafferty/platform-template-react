import React, { useEffect } from 'react';

const PlatformProvider = () => {
  useEffect(() => {
    window.fin.Platform.init();
  }, []);

  return (
    <div>Custom Provider..</div>
  )
}

export default PlatformProvider;