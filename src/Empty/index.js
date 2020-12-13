import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    height: "82%",
    width: "72%",
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

const Empty = ({ onCreateNew }) => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <h6 className={classes.title}>
          Create Schedule
        </h6>
        <p className={classes.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        <Button variant="contained" className={classes.button} onClick={onCreateNew}>
          Create schedule
        </Button>
      </div>
  );
}

export default Empty;