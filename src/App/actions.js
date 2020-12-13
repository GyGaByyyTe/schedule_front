export const ScheduleActions = {
  SET_ACTIVE_SCHEDULE: "SET_ACTIVE_SCHEDULE",
  GET_SCHEDULE_LIST: "GET_SCHEDULE_LIST",
  GET_SCHEDULE_LIST_OK: "GET_SCHEDULE_LIST_OK",
  GET_SCHEDULE_LIST_ERROR: "GET_SCHEDULE_LIST_ERROR"
};

export const actionSetActiveSchedule = (payload) =>
    ({ type: ScheduleActions.SET_ACTIVE_SCHEDULE, payload })

export const actionGetScheduleList = (payload = {}) =>
    ({ type: ScheduleActions.GET_SCHEDULE_LIST, payload })