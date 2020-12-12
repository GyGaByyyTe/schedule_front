import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "../CustomInput";

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
  return (
      <>
        <TabPanel value={value} index={0}>
          <InputLabel shrink htmlFor="name">
            Name
          </InputLabel>
          <CustomInput required id="name"/>

          <InputLabel shrink htmlFor="description">
            Description
          </InputLabel>
          <CustomInput required id="description"/>

          <InputLabel shrink htmlFor="trigger">
            Trigger Event
          </InputLabel>
          <CustomInput required id="trigger"/>

          <InputLabel shrink htmlFor="mandatory">
            Mandatory (is it required to fill in the survey?)
          </InputLabel>

          <InputLabel shrink htmlFor="deadline">
            Deadline to fill in the survey:
          </InputLabel>

          <InputLabel shrink htmlFor="recurrence">
            Recurrence
          </InputLabel>

          <InputLabel shrink htmlFor="every">
            Every
          </InputLabel>

          <InputLabel shrink htmlFor="at">
            At
          </InputLabel>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Second panelolo
        </TabPanel>
      </>
  )
}

export default FormHandler;