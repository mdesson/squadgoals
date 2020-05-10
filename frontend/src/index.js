import React from 'react';
import { AppContainer, setConfig } from 'react-hot-loader';
import { render } from 'react-dom';

import AppRouter from './AppRouter';

// Hide the react-hot-loader patch warning on console
setConfig({ showReactDomPatchNotification: false });

const renderApp = (App) => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(AppRouter);