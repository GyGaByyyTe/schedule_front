import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useScheduleList from "./useScheduleList";
import ScheduleCard from "../ScheduleCard";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
    "& > span": {
      fontWeight: 700,
      fontSize: "18px",
    }
  },
  button: {
    backgroundColor: "#2B63FF",
    color: "white",
    textTransform: "none",
  }
}));

const ScheduleList = () => {
  const classes = useStyles();
  const { data, onClickSchedule } = useScheduleList();

  return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={11}>
          <Grid container justify="flex-start" spacing={2}>
            <Grid item xs={12}>
              <div className={classes.header}>
                <span>{`Schedules(${data.length})`}</span>
                <Button variant="contained" className={classes.button} onClick={() => console.log('ll')}>
                  Create new
                </Button>
              </div>
            </Grid>
            {data.map((schedule) => (
                <Grid key={schedule.id} item xs={4} onClick={onClickSchedule(schedule)}>
                  <ScheduleCard item={schedule} className={classes.paper}/>
                </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
  );
}

export default ScheduleList;