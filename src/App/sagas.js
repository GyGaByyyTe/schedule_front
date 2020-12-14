import {fork} from "redux-saga/effects";
import {watcherSaga} from "./watcherSaga";
import {eventHandlerSaga} from "../EventHandler/sagas";

export default function* startForkWatchers() {
  yield fork(watcherSaga);
  yield fork(eventHandlerSaga);
}
