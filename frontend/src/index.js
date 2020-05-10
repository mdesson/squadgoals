import React from 'react';
import { AppContainer, setConfig } from 'react-hot-loader';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './state/store';

const reduxStore = store();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

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