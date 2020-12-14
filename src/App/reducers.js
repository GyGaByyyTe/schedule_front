import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {mainReducer} from "./mainReducer"
import {eventHandler} from "../EventHandler/reducer";

const createRootReducer = (history) =>
    combineReducers({
      router: connectRouter(history),
      mainReducer,
      eventHandler,
    });

export default createRootReducer;