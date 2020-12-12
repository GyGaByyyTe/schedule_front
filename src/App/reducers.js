import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {mainReducer} from "./mainReducer"

const createRootReducer = (history) =>
    combineReducers({
      router: connectRouter(history),
      mainReducer,
    });

export default createRootReducer;