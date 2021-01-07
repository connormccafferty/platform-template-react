import React from 'react';

const LeftMenu = () => {
  const CHART_URL = 'https://cdn.openfin.co/embed-web/chart.html';
  const appList = [
    {
      url: CHART_URL,
      printName: 'OF Chart',
      processAffinity: 'ps_1'
    },
    {
      url: 'https://www.tradingview.com/chart/?symbol=NASDAQ:AAPL',
      printName: 'TradeView',
      processAffinity: 'tv_1'
    },
    {
      url: 'https://www.google.com/search?q=INDEXDJX:+.DJI&stick=H4sIAAAAAAAAAONgecRozC3w8sc9YSmtSWtOXmNU4eIKzsgvd80rySypFBLjYoOyeKS4uDj0c_UNkgsry3kWsfJ5-rm4Rrh4RVgp6Ll4eQIAqJT5uUkAAAA&source=lnms&sa=X&ved=0ahUKEwii_NWT9fzoAhU3mHIEHWy3AWIQ_AUIDSgA&biw=1280&bih=1366&dpr=1',
      printName: 'News',
      processAffinity: 'mw_1'
    },
    {
      url: `https://cdn.openfin.co/docs/javascript/${window.fin.desktop.getVersion()}`,
      printName: "Documentation",
      processAffinity: 'ps_1'
    }
  ];

  const layoutContainer = document.querySelector('#layout-container');

  const addView = async (printName) => {
    const viewOptions = appList.find(i => i.printName === printName);
    return window.fin.Platform.getCurrentSync().createView(viewOptions, fin.me.identity);
  }

  const nonLayoutWindow = async () => {
    return window.fin.Platform.getCurrentSync().applySnapshot({
      windows: [{
        defaultWidth: 600,
        defaultHeight: 600,
        defaultLeft: 200,
        defaultTop: 200,
        saveWindowState: false,
        url: CHART_URL,
        contextMenu: true
      }]
    });
  }

  const layoutWindow = async () => {
    const viewOptions = {
      url: CHART_URL
    };
    return window.fin.Platform.getCurrentSync().createView(viewOptions);
  }

  return (
    <div id="left-menu" className="hidden">
      <span>Applications</span>
      <ul>
        {appList.map((item) => <li key={appList.indexOf(item)}>
          <button onClick={() => addView(item.printName)}>{item.printName}</button>
        </li>)}
      </ul>
      <span>Windows</span>
      <ul>
        <li><button onClick={() => layoutWindow().catch(console.error)}>Platform Window</button></li>
        <li><button onClick={() => nonLayoutWindow().catch(console.error)}>OF Window</button></li>
      </ul>
    </div>
  )
}

export default LeftMenu;