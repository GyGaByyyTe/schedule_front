import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Button} from "@material-ui/core";
import FormHandler from "../FormHandler";
import useEditor from "./useEditor";

const CustomTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    minHeight: "unset",
    height: 25,
    paddingLeft: 20,
  },
  indicator: {
    backgroundColor: '#2B63FF',
  },
})(Tabs);

const CustomTab = withStyles((theme) => ({
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
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  editor: {
    height: "100%",
    position: "relative",
    flexGrow: 1,
    backgroundColor: "#FAFBFF",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 15px",
    lineHeight: "12px",
    background: "none",
    borderRadius: 5,
    border: "1px solid #E5E6EC",
    textTransform: "none",
    boxShadow: "none",
    color: "rgb(165,170,193)",
    "&-blue": {
      background: "#2B63FF",
      color: "white",
    },
    "&-header": {
      margin: 0,
      borderRadius: 0,
    }
  },
  content: {
    width: "100%",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    background: "white"
  },
  title: {
    color: "rgb(39,52,109)",
    fontSize: 18,
    paddingLeft: 20,
  },
  main: {
    overflowY: "scroll",
    height: "100%",
  },
  footer: {
    width: "100%",
    padding: "10px 20px",
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    background: "#FAFBFF",
    boxShadow: "inset 0px 1px 0px #E5E6EC"
  }
}));

const Editor = () => {
  const classes = useStyles();
  const { tabValue, schedule, handleTabChange, onClose, onSave } = useEditor();

  return (
      <div className={classes.editor}>
        <div className={classes.header}>
          <Button variant="contained" className={`${classes.button} ${classes.button}-header`} onClick={onClose}>
            X
          </Button>
          <div className={classes.content}>
            <h3 className={classes.title}>Edit Schedule</h3>
            <CustomTabs value={tabValue} onChange={handleTabChange}>
              <CustomTab label="General"/>
              <CustomTab label="Assigned Surveys"/>
            </CustomTabs>
          </div>
        </div>
        <div className={classes.main}>
          <FormHandler tabValue={tabValue} schedule={schedule}/>
        </div>
        <div className={classes.footer}>
          <Button variant="contained" className={classes.button} onClick={onClose}>Close</Button>
          <Button variant="contained" className={`${classes.button} ${classes.button}-blue`} onClick={onSave}>Save
            changes</Button>
        </div>
      </div>
  );
}

export default Editor;