import React from "react";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {configureStore, history} from "./store";

import './App.css';
import Wrapper from "../Wrapper";

const store = configureStore();

function App() {

  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <header className="AppHeader"/>
            <Wrapper className="AppWrapper"/>
          </div>
        </ConnectedRouter>
      </Provider>
  );
}

export default App;
