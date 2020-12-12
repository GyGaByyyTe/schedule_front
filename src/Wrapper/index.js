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
    paddingTop: "60px",
    width: "100%",
    // display: "flex",
    // alignItems: "center",
    overflowY: "scroll",
  },
  sidebar: {
    width: "40%",
    maxWidth: 500,
    position: "relative",
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