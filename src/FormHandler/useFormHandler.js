import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveSchedule, getDeadlines, getTriggers} from "../App/mainReducer";

const defaultOption = { title: "", value: 0 };

const fillOption = (field) => field ? { title: field.name, value: field.id } : defaultOption;

const getTriggerExtension = (trigger, schedule) => {
  if (trigger?.select) {
    return {
      value: fillOption(trigger.select.options.find(o => o.id === schedule.trigger.option)),
      options: trigger.select.options,
    }
  } else if (trigger?.number) {
    return { value: schedule.trigger.option }
  } else {
    return {
      value: null,
    }
  }
}

const init = (schedule, triggerArray = [], deadlineArray = []) => {
  const trigger = triggerArray.find(t => t.id === schedule.trigger.id);
  const triggerExtension = trigger?.select || trigger?.number || null;
  const triggerExtensionLabel = triggerExtension?.label || "";
  const isMandatory = schedule.mandatory.state;
  const deadline = isMandatory && deadlineArray.find(d => d.id === schedule.mandatory.deadline);
  return {
    name: schedule.name || "",
    description: schedule.description || "",
    trigger: fillOption(trigger),
    triggerExtension: getTriggerExtension(trigger, schedule),
    triggerExtensionLabel: triggerExtensionLabel,
    mandatory: isMandatory ? "true" : "false",
    deadline: fillOption(deadline),
    recurrence: schedule.recurrence.state ? "true" : "false",
    everyDays: schedule.recurrence.everyDays || "",
    times: schedule.recurrence.times || [],
  }
};

const is = (field) => field === "true";

const useFormHandler = () => {
  const activeSchedule = useSelector(getActiveSchedule);
  const triggers = useSelector(getTriggers);
  const deadlines = useSelector(getDeadlines);
  const initSchedule = init(activeSchedule, triggers, deadlines);
  const [name, setName] = useState(initSchedule.name);
  const [description, setDescription] = useState(initSchedule.description);
  const [trigger, setTrigger] = useState(initSchedule.trigger);
  const [triggerExtension, setTriggerExtension] = useState(initSchedule.triggerExtension);
  const [triggerExtensionLabel, setTriggerExtensionLabel] = useState(initSchedule.triggerExtensionLabel);
  const [mandatory, setMandatory] = useState(initSchedule.mandatory);
  const [deadline, setDeadline] = useState(initSchedule.deadline);
  const [recurrence, setRecurrence] = useState(initSchedule.recurrence);
  const [everyDays, setEveryDays] = useState(initSchedule.everyDays);
  const [times, setTimes] = useState(initSchedule.times);

  useEffect(() => {
    const newSchedule = init(activeSchedule, triggers, deadlines);
    setName(newSchedule.name);
    setDescription(newSchedule.description);
    setTrigger(newSchedule.trigger);
    setMandatory(newSchedule.mandatory);
    setDeadline(newSchedule.deadline);
    setRecurrence(newSchedule.recurrence);
    setEveryDays(newSchedule.everyDays);
    setTimes(newSchedule.times);
  }, [activeSchedule, triggers, deadlines])

  useEffect(() => {
    if (trigger) {
      const newSchedule = init({
        ...activeSchedule, trigger: {
          id: trigger.value,
          option: activeSchedule.trigger.option || 0
        }
      }, triggers, deadlines);
      setTriggerExtension(newSchedule.triggerExtension);
      setTriggerExtensionLabel(newSchedule.triggerExtensionLabel);
    }
  }, [trigger, triggers, deadlines, activeSchedule])

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    setter(value);
  }

  const checkNewSelectValue = (newValue) => newValue === null ? defaultOption : newValue;

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
        options: useMemo(() => [defaultOption, ...triggers.map(t => ({ title: t.name, value: t.id }))], [triggers]),
        value: trigger,
        onChange: (newValue) => setTrigger(checkNewSelectValue(newValue)),
      },
      triggerExtension: {
        label: triggerExtensionLabel,
        value: triggerExtension?.options ? {
          title: triggerExtension.value.title,
          value: triggerExtension.value.value,
        } : triggerExtension.value,
        options: useMemo(() => triggerExtension?.options
            ? [defaultOption, ...triggerExtension.options.map(t => ({
              title: t.name,
              value: t.id
            }))]
            : null, [triggerExtension]),
        onChange: triggerExtension?.options
            ? (newValue) =>
                setTriggerExtension({
                  ...triggerExtension,
                  value: checkNewSelectValue(newValue)
                })
            : handleInputChange((value) => setTriggerExtension({ value })),
      },
      mandatory: {
        value: mandatory,
        onChange: handleInputChange(setMandatory),
      },
      deadline: {
        options: useMemo(() => is(mandatory)
            ? [defaultOption, ...deadlines.map(d => ({ title: d.name, value: d.id }))]
            : [], [mandatory, deadlines]),
        value: deadline,
        onChange: setDeadline,
      },
      recurrence: {
        value: recurrence,
        showDays: is(recurrence),
        onChange: handleInputChange(setRecurrence),
      },
      everyDays: {
        value: everyDays,
        onChange: handleInputChange(setEveryDays),
      },
      time: {
        value: times,
        onChange: (e) => console.log(e.target),
        addTime: () => setTimes([...times, new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: "numeric",
          minute: "numeric"
        })])
      }
    },
  }
}

export default useFormHandler;