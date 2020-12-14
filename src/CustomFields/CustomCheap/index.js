import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  customCheap: {
    marginTop: "10px",
    position: "relative",
    padding: "7px 10px",
    color: "#2B63FF",
    fontSize: "12px",
    background: "rgba(43, 99, 255, 0.05)",
    borderRadius: "5px",
  },
  close: {
    width: "0",
    cursor: "pointer",
    height: "100%",
    right: "15px",
    top: "50%",
    opacity: "0.5",
    transform: "translateY(-18%)",
    "&:before, &:after": {
      left: 0,
      height: "10px",
      width: "1px",
      backgroundColor: "#2B63FF",
      borderRadius: "5px",
    }
  }
}));

const CustomCheap = ({ value, onClose }) => {
  const classes = useStyles();

  return (
      <div className={classes.customCheap}>
        {value}
        <span className={`close ${classes.close}`} onClick={onClose}/>
      </div>
  )
}

export default CustomCheap;