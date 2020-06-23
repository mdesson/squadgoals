import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./rootEpic";
import rootReducer from "./rootReducer";
import { ajax } from "rxjs/observable/dom/ajax";

let reduxStore;

const buildReduxStore = (deps = {}, forceCreationOfNewStore = false) => {
  if (!reduxStore || forceCreationOfNewStore) {
    const { initialState, ajax: disableAjax } = deps;

    const ajaxLib = disableAjax || ajax;

    const epicMiddleware = createEpicMiddleware({
      dependencies: { ajax: ajaxLib },
    });

    const args = [
      composeWithDevTools(applyMiddleware(epicMiddleware)), // enhancer
    ];

    if (initialState) {
      args.unshift(initialState); // add initial state
    }
    reduxStore = createStore(rootReducer, ...args);
    epicMiddleware.run(rootEpic);
  }

  return reduxStore;
};

export default buildReduxStore;
