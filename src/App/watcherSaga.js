import {call, put, takeLatest} from "redux-saga/effects";
import {ScheduleActions} from "./actions";
import {getScheduleList} from "../api";


function* getListSaga(action) {
  try {
    const response = yield call(getScheduleList, { ...action.payload });
    yield put({ type: ScheduleActions.GET_SCHEDULE_LIST_OK, payload: { body: response } })
  } catch (e) {
    yield put({ type: ScheduleActions.GET_SCHEDULE_LIST_ERROR, payload: { error: e } })
  }
}

export function* watcherSaga() {
  yield takeLatest(ScheduleActions.GET_SCHEDULE_LIST, getListSaga);
}
