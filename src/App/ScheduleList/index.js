import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useScheduleList from "./useScheduleList";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

const ScheduleList = () => {
  const classes = useStyles();
  const { data } = useScheduleList();

  return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {data.map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.paper}/>
                </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
  );
}

export default ScheduleList;