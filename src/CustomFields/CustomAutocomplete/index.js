import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inputRoot: {
    "& > input": {
      padding: "0 !important",
    }
  }
}));
const CustomAutocomplete = ({ id, model }) => {
  const classes = useStyles();

  return <Autocomplete
      id={id}
      classes={classes}
      value={model.value}
      options={model.options}
      getOptionLabel={(option) => option.title}
      getOptionSelected={(option, newValue) => option?.value === newValue?.value}
      onChange={(event, newValue) => model.onChange(newValue)}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} variant="outlined"/>}
  />
}

export default CustomAutocomplete;