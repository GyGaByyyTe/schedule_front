import {call, put, takeLatest} from "redux-saga/effects";
import {ScheduleActions} from "./actions";
import {createSchedule, editSchedule, getScheduleList} from "../api";

function* getListSaga(action) {
  try {
    const response = yield call(getScheduleList, { ...action.payload });
    yield put({ type: ScheduleActions.GET_SCHEDULE_LIST_OK, payload: { body: response } })
  } catch (e) {
    yield put({ type: ScheduleActions.GET_SCHEDULE_LIST_ERROR, payload: { error: e } })
  }
}

function* createScheduleSaga(action) {
  try {
    const response = yield call(createSchedule, { ...action.payload });
    yield put({ type: ScheduleActions.CREATE_SCHEDULE_OK, payload: { body: response } })
  } catch (e) {
    yield put({ type: ScheduleActions.CREATE_SCHEDULE_ERROR, payload: { error: e } })
  }
}

function* editScheduleSaga(action) {
  try {
    const response = yield call(editSchedule, { ...action.payload });
    yield put({ type: ScheduleActions.EDIT_SCHEDULE_OK, payload: { body: response } })
  } catch (e) {
    yield put({ type: ScheduleActions.EDIT_SCHEDULE_ERROR, payload: { error: e } })
  }
}

export function* watcherSaga() {
  yield takeLatest(ScheduleActions.GET_SCHEDULE_LIST, getListSaga);
  yield takeLatest(ScheduleActions.CREATE_SCHEDULE, createScheduleSaga);
  yield takeLatest(ScheduleActions.EDIT_SCHEDULE, editScheduleSaga);
}
