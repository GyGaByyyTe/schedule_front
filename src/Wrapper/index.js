import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import {emptySchedule, getSchedules} from "../App/mainReducer";
import Empty from "../Empty";
import ScheduleList from "../ScheduleList";
import Editor from "../Editor";
import {actionGetScheduleList, actionSetActiveSchedule} from "../App/actions";
import io from 'socket.io-client';

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
  const dispatch = useDispatch();
  const onCreateNew = () => dispatch(actionSetActiveSchedule({ body: emptySchedule }));

  useEffect(() => {
    dispatch(actionGetScheduleList());
    const socket = io();
    socket.on("updated", () => dispatch(actionGetScheduleList()));
  }, []);

  return (
      <div className={cn({ [classes.wrapper]: true, [className]: className })}>
        <div className={classes.sidebar}>
          <Editor/>
        </div>
        <div className={classes.container}>
          {schedules.length > 0
              ? (<ScheduleList onCreateNew={onCreateNew}/>)
              : (<Empty onCreateNew={onCreateNew}/>)
          }
        </div>
      </div>)
}

export default Wrapper;