import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CustomInput from "../CustomFields/CustomInput";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomAutocomplete from "../CustomFields/CustomAutocomplete";
import {withStyles} from "@material-ui/core/styles";
import CustomRadio from "../CustomFields/CustomRadio";
import CustomNumberInput from "../CustomFields/CustomNumberInput";
import Grid from "@material-ui/core/Grid";
import CustomLabel from "../CustomFields/CustomLabel";
import "./index.css";
import {FormControl} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import CustomCheap from "../CustomFields/CustomCheap";

const TabPanel = withStyles((theme) => ({
  root: {
    padding: 0,
    textTransform: 'none',
    minWidth: "auto",
    minHeight: "unset",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    color: "#A5AAC1",
    fontSize: 12,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      minWidth: "unset",
      color: 'black',
    },
  },
  selected: {},
}))((props) => {
  const { children, value, index, classes, ...other } = props;
  return (
      <div role="tabpanel"
           hidden={value !== index}
           id={`simple-tabpanel-${index}`}
          // aria-labelledby={`simple-tab-${index}`}
           {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography component={"span"}>{children}</Typography>
            </Box>
        )}
      </div>
  );
})

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const FormHandler = ({ tabValue, schedule }) => {
  return (
      <div className="FormHandler">
        <TabPanel value={tabValue} index={0}>
          <CustomLabel id="name" text="Schedule Name" required/>
          <CustomInput id="name"
                       required
                       error={schedule.name.error.value}
                       helperText={schedule.name.error.value ? schedule.name.error.text : null}
                       value={schedule.name.value}
                       onChange={schedule.name.onChange}/>

          <CustomLabel id="description" text="Description"/>
          <CustomInput id="description"
                       value={schedule.description.value}
                       onChange={schedule.description.onChange}/>

          <CustomLabel id="trigger" text="Trigger Event" required/>
          <CustomAutocomplete id="trigger" required model={schedule.triggers}/>

          {schedule.triggerExtension.label &&
          <CustomLabel id="triggerExtension" text={schedule.triggerExtension.label}/>
          }
          {schedule.triggerExtension.options
              ? (<CustomAutocomplete id="triggerExtension" model={schedule.triggerExtension}/>)
              : schedule.triggerExtension.value !== null &&
              (<CustomNumberInput id="triggerExtension" model={schedule.triggerExtension}/>)
          }

          <CustomLabel id="mandatory" text="Mandatory (is it required to fill in the survey?)"/>
          <RadioGroup id="mandatory" row name="mandatory"
                      value={schedule.mandatory.value}
                      onChange={schedule.mandatory.onChange}>
            <FormControlLabel value="false" control={<CustomRadio/>} label="No"/>
            <FormControlLabel value="true" control={<CustomRadio/>} label="Yes"/>
          </RadioGroup>
          {schedule.deadline.options.length > 0 &&
          <React.Fragment>
            <CustomLabel id="deadline" text="Deadline to fill in the survey:"/>
            <CustomAutocomplete id="deadline" model={schedule.deadline}/>
          </React.Fragment>
          }

          <CustomLabel id="recurrence" text="Recurrence"/>
          <RadioGroup id="recurrence" row
                      value={schedule.recurrence.value}
                      onChange={schedule.recurrence.onChange}>
            <FormControlLabel value="false" control={<CustomRadio/>} label="No"/>
            <FormControlLabel value="true" control={<CustomRadio/>} label="Yes"/>
          </RadioGroup>
          {schedule.recurrence.showDays &&
          <React.Fragment>
            <CustomLabel id="everyDays" text="Every"/>
            <CustomNumberInput id="everyDays" model={schedule.everyDays}/>

            <CustomLabel id="at" text="At"/>
            <Grid container justify="flex-start" spacing={1}>
              {schedule.time.value.map((time, id) => (
                  <Grid key={`${time}#${id}`} item lg={3} md={4} sm={6} xs={12}>
                    <CustomInput type="time"
                                 inputProps={{ step: 300, onChange: schedule.time.onChange(id) }}
                                 value={time}/>
                  </Grid>
              ))}
              <Grid key="button#$" item lg={3} md={4} sm={6} xs={12}>
                <CustomInput type="button"
                             value="+"
                             inputProps={{ onClick: schedule.time.addTime }}/>
              </Grid>
            </Grid>
          </React.Fragment>
          }

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CustomLabel id="surveys" text="Choose surveys"/>
          <FormControl style={{ width: "100%" }}>
            <CustomAutocomplete id="surveys" model={schedule.surveys} multiple/>
            <FormHelperText style={{ fontSize: "10px" }}>
              You can assign as many Surveys as needed to an Event.
            </FormHelperText>
          </FormControl>
          {schedule.surveys.value.map((s, id) =>
              <CustomCheap key={`${id}${s.title}`} value={s.title} onClose={schedule.surveys.remove(id)}/>)}
        </TabPanel>
      </div>
  )
}

export default FormHandler;