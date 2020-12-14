import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
  inputRoot: {
    "& > input": {
      padding: "0 !important",
    }
  }
}));
const useTextStyles = makeStyles(() => ({
  root: {
    background: "white",
  }
}));
const CustomAutocomplete = ({ id, model, multiple = false }) => {
  const classes = useStyles();
  const textClasses = useTextStyles();

  return (!multiple
      ? <Autocomplete
          id={id}
          classes={classes}
          value={model.value}
          options={model.options}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) => model.onChange(newValue)}
          renderInput={(params) => <TextField {...params} classes={textClasses} variant="outlined"/>}

          getOptionSelected={(option, newValue) => option?.value === newValue?.value}
      />
      : <Autocomplete
          id={id}
          classes={classes}
          options={model.options}
          value={model.value}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) => model.onChange(newValue)}
          getOptionSelected={(option, newValue) => option?.value === newValue?.value}
          renderInput={(params) => <TextField{...params} classes={textClasses} variant="outlined"/>}
          size="small"
          multiple
          limitTags={1}
          renderTags={(value, getTagProps) => null
              // value.map((option, index) => (
              //     <Chip variant="outlined" label={option.title} size="small" {...getTagProps({ index })}/>
              // ))
          }
      />)

}

export default CustomAutocomplete;