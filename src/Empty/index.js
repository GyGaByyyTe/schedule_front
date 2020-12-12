import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useEmpty from "./useEmpty";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 20px 60px -20px rgba(39, 52, 109, 0.1)",
    margin: "auto",
    height: "82%", //976 all
    width: "72%", //1792 all
  },
  title: {
    margin: 0,
    fontSize: "22px",
  },
  text: {
    width: "54%",
    fontSize: "15px",
    color: "#A5AAC1",
  },
  button: {
    backgroundColor: "#2B63FF",
    color: "white",
    textTransform: "none",
  }
}));

const Empty = () => {
  const classes = useStyles();
  const { text, onClick } = useEmpty();

  return (
      <div className={classes.root}>
        <h6 className={classes.title}>{text.title}</h6>
        <p className={classes.text}>{text.content}</p>
        <Button variant="contained" className={classes.button} onClick={onClick}>
          {text.button}
        </Button>
      </div>
  );
}

export default Empty;