import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "../CustomInput";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useInputStyles = makeStyles(() => ({
  input: {
    borderTopRightRadius: "0 !important",
    borderBottomRightRadius: "0 !important",
    borderRight: "transparent !important",
  },
}));
const useEndStyles = makeStyles(() => ({
  positionEnd: {
    height: "35px",
    maxHeight: "unset",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    margin: 0,
    fontSize: 15,
    padding: "0 5px"
  }
}));

const CustomNumberInput = ({ id, model }) => {
  const inputClasses = useInputStyles();
  const endClasses = useEndStyles();
  return <CustomInput id={id}
                      classes={inputClasses}
                      inputProps={{ min: "0", step: "1" }}
                      endAdornment={<InputAdornment classes={endClasses} position="end">Days</InputAdornment>}
                      type="number"
                      value={model.value}
                      onChange={model.onChange}/>
}

export default CustomNumberInput;