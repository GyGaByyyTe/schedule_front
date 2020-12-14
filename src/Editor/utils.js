export const defaultOption = { title: "", value: 0 };

export const fillOption = (field) => field ? { title: field.name, value: field.id } : defaultOption;

export const getTriggerExtension = (trigger, schedule) => {
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

export const init = (schedule, triggerArray = [], deadlineArray = [], surveyArray = []) => {
  const trigger = triggerArray.find(t => t.id === schedule.trigger.id);
  const triggerExtension = trigger?.select || trigger?.number || null;
  const triggerExtensionLabel = triggerExtension?.label || "";
  const isMandatory = schedule.mandatory.state;
  const deadline = isMandatory && deadlineArray.find(d => d.id === schedule.mandatory.deadline);
  const surveys = schedule.surveys?.length ? schedule.surveys.map(s => fillOption(surveyArray.find(sv => sv.id === s))) : null;
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
    surveys: surveys || [],
  }
};

export const is = (field) => field === "true";

export const checkNewSelectValue = (newValue) => newValue === null ? defaultOption : newValue;
