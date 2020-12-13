import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CustomAutocomplete = ({ id, model }) => {
  return <Autocomplete
      id={id}
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