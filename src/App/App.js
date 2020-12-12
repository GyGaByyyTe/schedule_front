import React from "react";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {configureStore, history} from "./store";
import './App.css';
// import ScheduleList from "./ScheduleList";
import Empty from "./Empty";

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <header className="AppHeader"/>
            <div className="AppWrapper">
              {/*<ScheduleList/>*/}
              <Empty/>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
  );
}

export default App;
