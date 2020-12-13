import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomInput from "../CustomInput";
import useFormHandler from "./useFormHandler";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputAdornment from "@material-ui/core/InputAdornment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography component={"span"}>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const FormHandler = ({ value }) => {
  const { schedule } = useFormHandler();
  return (
      <>
        <TabPanel value={value} index={0}>
          <InputLabel shrink htmlFor="name">
            Name
          </InputLabel>
          <CustomInput required
                       id="name"
                       name="name"
                       value={schedule.name.value}
                       onChange={schedule.name.onChange}/>

          <InputLabel shrink htmlFor="description">
            Description
          </InputLabel>
          <CustomInput id="description"
                       name="description"
                       value={schedule.description.value}
                       onChange={schedule.description.onChange}/>

          <InputLabel shrink htmlFor="trigger">
            Trigger Event
          </InputLabel>
          <Autocomplete
              value={schedule.triggers.value}
              options={schedule.triggers.options}
              getOptionLabel={(option) => option.title}
              getOptionSelected={(option, newValue) =>
                  option?.value === newValue?.value}
              onChange={(event, newValue) =>
                  schedule.triggers.onChange(newValue)}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} variant="outlined"/>}
          />

          <InputLabel shrink htmlFor="mandatory">
            Mandatory (is it required to fill in the survey?)
          </InputLabel>
          <RadioGroup id="mandatory"
                      name="mandatory"
                      value={schedule.mandatory.value}
                      row
                      onChange={schedule.mandatory.onChange}>
            <FormControlLabel value="false" control={<Radio/>} label="No"/>
            <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
          </RadioGroup>
          {schedule.deadline.options.length > 0 &&
          <React.Fragment>
            <InputLabel shrink htmlFor="deadline">
              Deadline to fill in the survey:
            </InputLabel>
            <Autocomplete
                value={schedule.deadline.value}
                options={schedule.deadline.options}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, newValue) =>
                    option?.value === newValue?.value}
                onChange={(event, newValue) =>
                    schedule.deadline.onChange(newValue)}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} variant="outlined"/>}
            />
          </React.Fragment>
          }

          <InputLabel shrink htmlFor="recurrence">
            Recurrence
          </InputLabel>
          <RadioGroup id="recurrence"
                      name="recurrence"
                      value={schedule.recurrence.value}
                      row
                      onChange={schedule.recurrence.onChange}>
            <FormControlLabel value="false" control={<Radio/>} label="No"/>
            <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
          </RadioGroup>
          {schedule.recurrence.showDays &&
          <React.Fragment>
            <InputLabel shrink htmlFor="everyDays">
              Every
            </InputLabel>
            <CustomInput id="everyDays" name="everyDays"
                         inputProps={{ min: "0", step: "1" }}
                         endAdornment={<InputAdornment position="end">Days</InputAdornment>}
                         type="number"
                         value={schedule.everyDays.value}
                         onChange={schedule.everyDays.onChange}/>

            <InputLabel shrink htmlFor="at">
              At
            </InputLabel>
            {schedule.time.value.map((time, id) => (
                <CustomInput id={`${time}#${id}`}
                             inputProps={{
                               step: 300, // 5 min
                             }}
                             type="time"
                             value={time}
                             onChange={schedule.time.onChange}/>
            ))}
            <CustomInput
                type="button"
                value="+"
                onClick={schedule.time.addTime}/>

          </React.Fragment>
          }
        </TabPanel>
        <TabPanel value={value} index={1}>
          Second panelolo
        </TabPanel>
      </>
  )
}

export default FormHandler;