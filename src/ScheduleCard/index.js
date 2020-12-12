import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import cn from "classnames";
//

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
  const classes = useStyles()
  return <Paper className={cn({ [classes.root]: true, [className]: className })}/>
}

export default ScheduleCard;