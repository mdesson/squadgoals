import React from "react";
import { AppContainer, setConfig } from "react-hot-loader";
import { render } from "react-dom";
import { Provider } from "react-redux";

import AppRouter from "./AppRouter";
import store from "./state/store";

// Hide the react-hot-loader patch warning on console
setConfig({ showReactDomPatchNotification: false });

const reduxStore = store();

const renderApp = (App) => {
  render(
    <AppContainer>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApp(AppRouter);
