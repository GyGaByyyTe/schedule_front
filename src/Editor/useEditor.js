import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {emptySchedule, getActiveSchedule, getDeadlines, getSurveysList, getTriggers} from "../App/mainReducer";
import {checkNewSelectValue, defaultOption, init, is} from "./utils";
import {actionCreateSchedule, actionEditSchedule, actionSetActiveSchedule} from "../App/actions";


const useEditor = () => {
  const dispatch = useDispatch();
  const activeSchedule = useSelector(getActiveSchedule);
  const triggers = useSelector(getTriggers);
  const deadlines = useSelector(getDeadlines);
  const surveysList = useSelector(getSurveysList);
  const getInit = (schedule) => init(schedule, triggers, deadlines, surveysList);
  const initSchedule = getInit(activeSchedule);
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
  const [surveys, setSurveys] = useState(initSchedule.surveys);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    const newSchedule = getInit(activeSchedule);
    setName(newSchedule.name);
    setDescription(newSchedule.description);
    setTrigger(newSchedule.trigger);
    setMandatory(newSchedule.mandatory);
    setDeadline(newSchedule.deadline);
    setRecurrence(newSchedule.recurrence);
    setEveryDays(newSchedule.everyDays);
    setTimes(newSchedule.times);
    setSurveys(newSchedule.surveys);
  }, [activeSchedule, triggers, deadlines, surveysList])

  useEffect(() => {
    if (trigger) {
      const newSchedule = getInit({
        ...activeSchedule, trigger: {
          id: trigger.value,
          option: activeSchedule.trigger.option || 0
        }
      });
      setTriggerExtension(newSchedule.triggerExtension);
      setTriggerExtensionLabel(newSchedule.triggerExtensionLabel);
    }
  }, [trigger, triggers, deadlines, surveysList, activeSchedule])

  const onClose = () => dispatch(actionSetActiveSchedule({ body: { ...activeSchedule, id: null } }));

  const onSave = () => {
    const newSchedule = {
      ...activeSchedule,
      name: name,
      description: description,
      trigger: {
        id: trigger.value,
        option: triggerExtension.value?.value || triggerExtension.value,
      },
      mandatory: {
        state: is(mandatory),
        deadline: deadline.value,
      },
      recurrence: {
        state: is(recurrence),
        everyDays: everyDays,
        times: times,
      },
      surveys: surveys.map(s => s.value),
    }
    if (activeSchedule.id && activeSchedule.id !== emptySchedule.id) {
      dispatch(actionEditSchedule(newSchedule));
    } else {
      delete newSchedule.id;
      dispatch(actionCreateSchedule(newSchedule));
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
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
        onChange: (index) => (e) => {
          const { value } = e.target;
          const oldTimes = [...times];
          oldTimes[index] = value;
          setTimes(oldTimes);
        },
        addTime: () => setTimes([...times, new Date().toLocaleTimeString('ru-Ru', {
          hour12: false,
          hour: "numeric",
          minute: "numeric"
        })])
      },
      surveys: {
        value: surveys,
        options: useMemo(() => [defaultOption, ...surveysList.map(d => ({
          title: d.name,
          value: d.id
        }))], [surveysList]),
        onChange: setSurveys,
        remove: (id) => () => setSurveys(surveys.filter((_, index) => index !== id))
      },
    },
    tabValue,
    handleTabChange,
    onClose,
    onSave,
  }
}

export default useEditor;