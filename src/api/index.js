export const getScheduleList = () => fetch("/schedule/all/")
    .then(response => response.json())

export const createSchedule = (schedule) => fetch("/schedule/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(schedule)
})

export const editSchedule = (schedule) => fetch("/schedule/", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(schedule)
})