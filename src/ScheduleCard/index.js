import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import cn from "classnames";
import {useSelector} from "react-redux";
import {getDeadlines, getTriggers} from "../App/mainReducer";

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: "0px 4px 0px 0px rgba(43,99,255,1)," +
        "0px 8px 0px 0px rgba(43,99,255,0.5)",
    // boxShadow: "0px 4px 0px 0px rgba(255,255,255,.5)," +
    //     "0px 8px 0px 0px rgba(255,255,255,0.2)," +
    //     "0px 20px 60px -20px rgba(39, 52, 109, 0.1)",
  },
}));

const ScheduleCard = ({ item, className }) => {
  const classes = useStyles();
  const triggers = useSelector(getTriggers);
  const deadlines = useSelector(getDeadlines);
  const triggerData = triggers.find(t => t.id === item.trigger.id);
  const triggerOption = item.trigger.option && triggerData?.select?.options?.find(t => t.id === item.trigger.option);
  return <Paper className={cn({ [classes.root]: true, [className]: className })}>
    <h3>
      {item.name}
    </h3>
    <p>{item.description}</p>
    <div>
      {triggerData.name}
      {triggerOption &&
      <span>-> {triggerOption.name}</span>
      }
    </div>
    <span>{item.mandatory.state ? "Mandatory" : "Optional"}</span>
    <span>{item.recurrence.state}</span>
    <hr/>
    <div><b>{item.surveys.length}</b> Surveys</div>
  </Paper>
}

export default ScheduleCard;