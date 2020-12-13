export const ScheduleActions = {
  SET_ACTIVE_SCHEDULE: "SET_ACTIVE_SCHEDULE",
  GET_SCHEDULE_LIST: "GET_SCHEDULE_LIST",
  GET_SCHEDULE_LIST_OK: "GET_SCHEDULE_LIST_OK",
  GET_SCHEDULE_LIST_ERROR: "GET_SCHEDULE_LIST_ERROR",
  CREATE_SCHEDULE: "CREATE_SCHEDULE",
  CREATE_SCHEDULE_OK: "CREATE_SCHEDULE_OK",
  CREATE_SCHEDULE_ERROR: "CREATE_SCHEDULE_ERROR",
  EDIT_SCHEDULE: "EDIT_SCHEDULE",
  EDIT_SCHEDULE_OK: "EDIT_SCHEDULE_OK",
  EDIT_SCHEDULE_ERROR: "EDIT_SCHEDULE_ERROR"
};

export const actionSetActiveSchedule = (payload) =>
    ({ type: ScheduleActions.SET_ACTIVE_SCHEDULE, payload })

export const actionGetScheduleList = (payload = {}) =>
    ({ type: ScheduleActions.GET_SCHEDULE_LIST, payload })

export const actionCreateSchedule = (payload) =>
    ({ type: ScheduleActions.CREATE_SCHEDULE, payload })

export const actionEditSchedule = (payload) =>
    ({ type: ScheduleActions.EDIT_SCHEDULE, payload })

