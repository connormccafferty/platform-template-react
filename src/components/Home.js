import React, { useState, useEffect } from 'react';

const ExampleView = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    async function ofVersion() {
      const v = await window.fin.System.getVersion();
      setVersion(v);
    }

    ofVersion();
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>Welcome, this is a React Platform running on OpenFin version: {version}</div>
  )
}

export default ExampleView;