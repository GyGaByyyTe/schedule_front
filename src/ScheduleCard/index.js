import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import cn from "classnames";
import useScheduleCard from "./useScheduleCard";

const useStyles = makeStyles(() => ({
  card: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: 10,
    height: 200,
    fontSize: 10,
    color: "#27346D",
    boxShadow: "0px 4px 0px 0px rgba(255,255,255,.5)," +
        "0px 8px 0px 0px rgba(255,255,255,0.2)," +
        "0px 20px 60px -20px rgba(39, 52, 109, 0.1)",
    "&-active": {
      boxShadow: "0px 4px 0px 0px rgba(43,99,255,1)," +
          "0px 8px 0px 0px rgba(43,99,255,0.5)",
    },
    "& *": {
      padding: "0 10px 0 10px",
    }
  },
  name: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "18px",
    margin: "10px 0 0",
  },
  description: {
    lineHeight: "14px",
    margin: "5px 0 0",
    color: "#A5AAC1"
  },
  trigger: {
    lineHeight: "14px",
    margin: "20px 0 0",
  },
  mandatory: {
    lineHeight: "14px",
    margin: "5px 0 0",
  },
  recurrence: {
    lineHeight: "14px",
    margin: "5px 0 0",
  },
  surveys: {
    margin: "15px 0",
    fontSize: 8,
    color: "rgba(79,84,108,0.9)",
    "& > b": {
      padding: "0 5px 0",
      fontSize: 10,
      color: "black"
    },
  },
  hr: {
    borderTop: "1px solid #E5E6EC",
    borderBottom: "transparent",
    borderLeft: "transparent",
    borderRight: "transparent",
    margin: "25px 0 0",
  },
}));

const ScheduleCard = ({ item, className }) => {
  const classes = useStyles();
  const { isActive, model } = useScheduleCard({ schedule: item });

  return (
      <Paper className={cn({ [classes.card]: true, [`${classes.card}-active`]: isActive, [className]: className })}>
        <p className={classes.name}>
          {model.name}
        </p>
        <p className={classes.description}>
          {model.description}
        </p>
        <p className={classes.trigger}>
          {model.trigger.name}
          {model.trigger.option &&
          <span>-> {model.trigger.option}</span>
          }
        </p>
        <p className={classes.mandatory}>
          {model.mandatory}
        </p>
        <p className={classes.recurrence}>
          {model.recurrence}
        </p>
        <hr className={classes.hr}/>
        <p className={classes.surveys}><b>{model.surveysCount}</b>Surveys</p>
      </Paper>)
}

export default ScheduleCard;