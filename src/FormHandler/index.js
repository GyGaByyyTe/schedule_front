import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "../CustomInput";
import useFormHandler from "./useFormHandler";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomAutocomplete from "../CustomFields/CustomAutocomplete";

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
                       value={schedule.name.value}
                       onChange={schedule.name.onChange}/>

          <InputLabel shrink htmlFor="description">
            Description
          </InputLabel>
          <CustomInput id="description"
                       value={schedule.description.value}
                       onChange={schedule.description.onChange}/>

          <InputLabel shrink htmlFor="trigger">
            Trigger Event
          </InputLabel>
          <CustomAutocomplete id="trigger" model={schedule.triggers}/>

          {schedule.triggerExtension.label &&
          <InputLabel shrink htmlFor="triggerExtension">
            {schedule.triggerExtension.label}
          </InputLabel>
          }
          {schedule.triggerExtension.options
              ? (<CustomAutocomplete id="triggerExtension" model={schedule.triggerExtension}/>)
              : schedule.triggerExtension.value !== null &&
              (<CustomInput id="triggerExtension"
                            inputProps={{ min: "0", step: "1" }}
                            endAdornment={<InputAdornment
                                position="end">Days</InputAdornment>}
                            type="number"
                            value={schedule.triggerExtension.value}
                            onChange={schedule.triggerExtension.onChange}/>)
          }

          <InputLabel shrink htmlFor="mandatory">
            Mandatory (is it required to fill in the survey?)
          </InputLabel>
          <RadioGroup id="mandatory" row name="mandatory"
                      value={schedule.mandatory.value}
                      onChange={schedule.mandatory.onChange}>
            <FormControlLabel value="false" control={<Radio/>} label="No"/>
            <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
          </RadioGroup>
          {schedule.deadline.options.length > 0 &&
          <React.Fragment>
            <InputLabel shrink htmlFor="deadline">
              Deadline to fill in the survey:
            </InputLabel>
            <CustomAutocomplete id="deadline" model={schedule.deadline}/>
          </React.Fragment>
          }

          <InputLabel shrink htmlFor="recurrence">
            Recurrence
          </InputLabel>
          <RadioGroup id="recurrence" row
                      value={schedule.recurrence.value}
                      onChange={schedule.recurrence.onChange}>
            <FormControlLabel value="false" control={<Radio/>} label="No"/>
            <FormControlLabel value="true" control={<Radio/>} label="Yes"/>
          </RadioGroup>
          {schedule.recurrence.showDays &&
          <React.Fragment>
            <InputLabel shrink htmlFor="everyDays">
              Every
            </InputLabel>
            <CustomInput id="everyDays"
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
                             inputProps={{ step: 300 }}
                             type="time"
                             value={time}
                             onChange={schedule.time.onChange}/>
            ))}
            <CustomInput type="button"
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