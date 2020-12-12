import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useScheduleList from "./useScheduleList";
import ScheduleCard from "../ScheduleCard";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
  },
}));

const ScheduleList = () => {
  const classes = useStyles();
  const { data } = useScheduleList();

  return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {data.map((schedule) => (
                <Grid key={schedule.id} item xs={4}>
                  <ScheduleCard item={schedule} className={classes.paper}/>
                </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
  );
}

export default ScheduleList;