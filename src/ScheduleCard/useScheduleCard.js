import {useSelector} from "react-redux";
import {getDeadlines, getTriggers} from "../App/mainReducer";

const useScheduleCard = ({ schedule }) => {
  const triggers = useSelector(getTriggers);
  const deadlines = useSelector(getDeadlines);
  const triggerData = triggers.find(t => t.id === schedule.trigger.id);
  const triggerOption = schedule.trigger.option && triggerData?.select?.options?.find(t => t.id === schedule.trigger.option);
  const recurrence = schedule.recurrence;
  const recTimes = recurrence.times?.length ? ` (at ${recurrence.times.join(",")})` : "";
  return {
    model: {
      name: schedule.name,
      description: schedule.description,
      trigger: {
        name: triggerData.name,
        option: triggerOption.name,
      },
      mandatory: schedule.mandatory.state ? "Mandatory" : "Optional",
      recurrence: recurrence.state ? `Every ${recurrence.every} days${recTimes}` : "Once",
      surveysCount: schedule.surveys.length,
    }
  }
}

export default useScheduleCard;