import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    color: "black",
    fontWeight: "600",
    fontSize: 14,
    margin: "20px 0 5px",

    "&:first-child": {
      marginTop: 0
    }
  }
}));

const CustomLabel = ({ id, text, required = false }) => {
  const classes = useStyles()
  return <InputLabel shrink classes={classes} required={required} htmlFor={id}>
    {text}
  </InputLabel>
}

export default CustomLabel;