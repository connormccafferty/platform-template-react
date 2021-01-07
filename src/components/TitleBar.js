import React, { useEffect } from 'react';

const TitleBar = () => {
  const LIGHT_THEME = 'light-theme';
  const DARK_THEME = 'dark-theme';

  useEffect(() => {
    window.fin.Platform.getCurrentSync().getWindowContext().then(initialContext => {
      if (initialContext && initialContext.theme) {
        setTheme(initialContext.theme);
      }
    });

    window.fin.Platform.getCurrentSync().on('window-context-changed', async (evt) => {
      const context = await window.fin.Platform.getCurrentSync().getWindowContext();
      //we only want to react to events that include themes
      if (evt.context.theme && evt.context.theme !== context.theme) {
        setTheme(evt.context.theme);
      }
    });

    window.fin.me.on('layout-ready', async () => {
      // Whenever a new layout is ready on this window (on init, replace, or applyPreset)
      const { settings } = await window.fin.Platform.Layout.getCurrentSync().getConfig();
      // determine whether it is locked and update the icon
      if (settings.hasHeaders && settings.reorderEnabled) {
        document.getElementById('lock-button').classList.remove('layout-locked');
      } else {
        document.getElementById('lock-button').classList.add('layout-locked');
      }
    });
  }, []);

  const setTheme = async (theme) => {
    const root = document.documentElement;

    if (theme === LIGHT_THEME) {
      root.classList.add(LIGHT_THEME);

    } else {
      root.classList.remove(LIGHT_THEME);
    }

    const context = await window.fin.Platform.getCurrentSync().getWindowContext() || {};
    if (context.theme !== theme) {
      window.fin.Platform.getCurrentSync().setWindowContext({ theme });
    }
  }

  const toggleTheme = async () => {
    let themeName = DARK_THEME;
    if (!document.documentElement.classList.contains(LIGHT_THEME)) {
      themeName = LIGHT_THEME;
    }
    setTheme(themeName);
  }


  const maxOrRestore = async () => {
    if (await window.fin.me.getState() === 'normal') {
      return await window.fin.me.maximize();
    }

    return window.fin.me.restore();
  }

  const toggleLockedLayout = async () => {
    const oldLayout = await window.fin.Platform.Layout.getCurrentSync().getConfig();
    const { settings, dimensions } = oldLayout;
    if (settings.hasHeaders && settings.reorderEnabled) {
      window.fin.Platform.Layout.getCurrentSync().replace({
        ...oldLayout,
        settings: {
          ...settings,
          hasHeaders: false,
          reorderEnabled: false
        }
      });
    } else {
      window.fin.Platform.Layout.getCurrentSync().replace({
        ...oldLayout,
        settings: {
          ...settings,
          hasHeaders: true,
          reorderEnabled: true
        },
        dimensions: {
          ...dimensions,
          headerHeight: 25
        }
      });
    }
  };

  const toggleMenu = () => {
    document.querySelector('#left-menu').classList.toggle('hidden');
  }

  return (
    <div id='title-bar' >
      <div className="title-bar-draggable">
        <div id="title"></div>
      </div>
      <div id="buttons-wrapper">
        <div className="button" title="Toggle Theme" id="theme-button" onClick={toggleTheme}></div>
        <div className="button" title="Toggle Sidebar" id="menu-button" onClick={toggleMenu}></div>
        <div className="button" title="Toggle Layout Lock" id="lock-button" onClick={toggleLockedLayout}></div>
        <div className="button" title="Minimize Window" id="minimize-button" onClick={() => window.fin.me.minimize().catch(console.error)}></div>
        <div className="button" title="Maximize Window" id="expand-button" onClick={() => maxOrRestore().catch(console.error)}></div>
        <div className="button" title="Close Window" id="close-button" onClick={() => window.fin.me.close().catch(console.error)}></div>
      </div>
    </div>
  )
}

export default TitleBar;
