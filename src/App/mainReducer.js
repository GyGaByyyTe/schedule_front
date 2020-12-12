const initialMainReducer = {
  schedules: [0, 1, 2],
  triggers: [
    {
      id: 1,
      name: "Subject entered Phase",
      select: {
        label: "Select phase",
        options: [
          { id: 1, name: "Phase one" },
          { id: 2, name: "Phase two" },
          { id: 3, name: "Finishing" },
        ]
      }
    },
    {
      id: 2,
      name: "Subject finished Step",
      select: {
        label: "Select step",
        options: [
          { id: 1, name: "Step 1" },
          { id: 2, name: "Step 2" },
          { id: 3, name: "Step 3" },
          { id: 4, name: "Step 4" },
          { id: 5, name: "Step 5" },
        ]
      }
    },
    {
      id: 3,
      name: "Subject signed Consent",
    },
    {
      id: 4,
      name: "Date after Enrollment reached",
      number: {
        label: "enter days",
      }
    },
    {
      id: 5,
      name: "Report filled",
      select: {
        label: "Select report",
        options: [
          { id: 1, name: "Medication" },
          { id: 2, name: "Adverse Event" },
          { id: 3, name: "Test Report" },
        ]
      }
    },
    {
      id: 6,
      name: "Survey filled",
      select: {
        label: "Select survey",
        options: [
          { id: 1, name: "Short Form Health Survey (SF-36)" },
          { id: 2, name: "Apetite" },
          { id: 3, name: "Sleep Apenia Questionnaire" }
        ]
      }
    },
    {
      id: 7,
      name: "Survey rejected",
    }
  ],
  deadlines: [
    { id: 1, value: "30m" },
    { id: 2, value: "1h" },
    { id: 3, value: "6h" },
    { id: 4, value: "7d" },
    { id: 5, value: "no deadline" },
  ],
}

export const mainReducer = (state = initialMainReducer, action) => {
  switch (action.type) {
    case "x":
      return { ...state, schedules: action.payload.body }
    case "y":
      return { ...state, schedules: action.payload.body }
    default:
      return state;
  }
}

export const getMainReducer = (state) => state.mainReducer;
export const getSchedules = (state) => getMainReducer(state).schedules;
