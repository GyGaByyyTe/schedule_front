import {useSelector} from "react-redux";
import {getActiveSchedule, getTriggers} from "../App/mainReducer";

const useScheduleCard = ({ schedule }) => {
  const activeSchedule = useSelector(getActiveSchedule);
  const triggers = useSelector(getTriggers);
  const triggerData = triggers.find(t => t.id === schedule.trigger.id);
  const triggerOption = schedule.trigger.option && triggerData?.select?.options?.find(t => t.id === schedule.trigger.option);
  const recurrence = schedule.recurrence;
  const recTimes = recurrence.times?.length ? ` (at ${recurrence.times.join(",")})` : "";
  return {
    isActive: activeSchedule?.id === schedule.id,
    model: {
      name: schedule.name,
      description: schedule.description,
      trigger: {
        name: triggerData.name,
        option: triggerOption?.name,
      },
      mandatory: schedule.mandatory.state ? "Mandatory" : "Optional",
      recurrence: recurrence.state ? `Every ${recurrence.everyDays} days${recTimes}` : "Once",
      surveysCount: schedule.surveys.length,
    }
  }
}

export default useScheduleCard;