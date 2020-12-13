import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";

import createRootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
      (typeof window !== "undefined" &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
      compose;

  return {
    ...createStore(
        createRootReducer(history),
        composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};
