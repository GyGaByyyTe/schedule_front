import React from "react";
import {useSelector} from "react-redux";
import cn from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import {getSchedules} from "../App/mainReducer";
import Empty from "../Empty";
import ScheduleList from "../ScheduleList";
import Editor from "../Editor";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    background: "#fafbff",
  },
  container: {
    padding: "60px 0",
    width: "100%",
    overflowY: "scroll",
  },
  sidebar: {
    minWidth: "40%",
    maxWidth: 500,
    position: "relative",
    background: "#FAFBFF",
    boxShadow: "0px 0px 60px rgba(39, 52, 109, 0.1)",
  }
}));

const Wrapper = ({ className }) => {
  const classes = useStyles();
  const schedules = useSelector(getSchedules);

  return (
      <div className={cn({ [classes.wrapper]: true, [className]: className })}>
        <div className={classes.sidebar}>
          <Editor/>
        </div>
        <div className={classes.container}>
          {schedules.length > 0
              ? (<ScheduleList/>)
              : (<Empty/>)
          }
        </div>
      </div>)
}

export default Wrapper;