import {useSelector} from "react-redux";
import {getActiveSchedule, getDeadlines, getTriggers} from "../App/mainReducer";
import {useEffect, useMemo, useState} from "react";

const defaultTrigger = { title: "", value: 0 };
const init = (schedule, triggerArray = [], deadlineArray = []) => {
  const trigger = triggerArray.find(t => t.id === schedule.trigger.id);
  return {
    name: schedule.name || "",
    description: schedule.description || "",
    trigger: trigger ? { title: trigger.name, value: trigger.id } : defaultTrigger,
    mandatory: schedule.mandatory.state ? "true" : "false",
    recurrence: schedule.recurrence.state ? "true" : "false",
  }
};

const useFormHandler = () => {
  const activeSchedule = useSelector(getActiveSchedule);
  const triggers = useSelector(getTriggers);
  const deadlines = useSelector(getDeadlines);

  const initSchedule = init(activeSchedule, triggers, deadlines);
  const [name, setName] = useState(initSchedule.name);
  const [description, setDescription] = useState(initSchedule.description);
  const [trigger, setTrigger] = useState(initSchedule.trigger);
  const [mandatory, setMandatory] = useState(initSchedule.mandatory);
  const [recurrence, setRecurrence] = useState(initSchedule.recurrence);

  useEffect(() => {
    const newSchedule = init(activeSchedule, triggers, deadlines);
    setName(newSchedule.name);
    setDescription(newSchedule.description);
    setTrigger(newSchedule.trigger);
    setMandatory(newSchedule.mandatory);
    setRecurrence(newSchedule.recurrence);
  }, [activeSchedule, triggers, deadlines])

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    console.log(e.target);
    setter(value);
  }

  return {
    schedule: {
      name: {
        value: name,
        onChange: handleInputChange(setName),
      },
      description: {
        value: description,
        onChange: handleInputChange(setDescription),
      },
      triggers: {
        options: useMemo(() => [defaultTrigger, ...triggers.map(t => ({ title: t.name, value: t.id }))], [triggers]),
        value: trigger,
        onChange: setTrigger,
      },
      mandatory: {
        value: mandatory,
        onChange: handleInputChange(setMandatory),
      },
      recurrence: {
        value: recurrence,
        onChange: handleInputChange(setRecurrence),
      },
    },
  }
}

export default useFormHandler;