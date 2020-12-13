import {fork} from "redux-saga/effects";
import {watcherSaga} from "./watcherSaga";

export default function* startForkWatchers() {
  yield fork(watcherSaga);
}
