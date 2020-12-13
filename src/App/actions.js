export const ScheduleActions = {
  SET_ACTIVE_SCHEDULE: "SET_ACTIVE_SCHEDULE"
};

export const actionSetActiveSchedule = (payload) =>
    ({ type: ScheduleActions.SET_ACTIVE_SCHEDULE, payload })