import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import {SocketEvents} from "../EventHandler/reducer";
import {eventAddListener, eventRemoveListener, eventSocketConnect} from "../EventHandler/actions";
import {emptySchedule, getActiveSchedule, getSchedules} from "../App/mainReducer";
import {actionGetScheduleList, actionSetActiveSchedule} from "../App/actions";
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
    width: 0,
    left: -300,
    maxWidth: 500,
    position: "relative",
    background: "#FAFBFF",
    transition: "left 0.3s, width 0.3s",
    boxShadow: "0px 0px 60px rgba(39, 52, 109, 0.1)",
    "&-visible": {
      width: "40%",
      left: 0,
    }
  }
}));

const Wrapper = ({ className }) => {
  const classes = useStyles();
  const activeSchedule = useSelector(getActiveSchedule);
  const schedules = useSelector(getSchedules);
  const dispatch = useDispatch();
  const onCreateNew = () => dispatch(actionSetActiveSchedule({ body: emptySchedule }));

  useEffect(() => {
    dispatch(eventAddListener({ event: SocketEvents.UPDATE, handler: onScheduleUpdate }))

    dispatch(actionGetScheduleList());
    dispatch(eventSocketConnect());

    return () => dispatch(eventRemoveListener({ event: SocketEvents.UPDATE }));

  }, []);

  const onScheduleUpdate = () => dispatch(actionGetScheduleList());

  return (
      <div className={cn({ [classes.wrapper]: true, [className]: className })}>
        <div className={cn({ [classes.sidebar]: true, [`${classes.sidebar}-visible`]: activeSchedule.id })}>
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