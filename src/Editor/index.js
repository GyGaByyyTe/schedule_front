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
  },
  indicator: {
    backgroundColor: '#2B63FF',
  },
})(Tabs);

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  editor: {
    height: "100%",
    position: "relative",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    display: "flex",
  },
  title: {
    fontSize: 18,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 0,
    background: "#FAFBFF",
    boxShadow: "inset 0px 1px 0px #E5E6EC"
  }
}));

const Editor = () => {
  const classes = useStyles();
  const { tabValue, handleTabChange, onClick } = useEditor();

  return (
      <div className={classes.editor}>
        <div className={classes.header}>
          <Button variant="contained" className={classes.button} onClick={onClick}>
            X
          </Button>
          <div>
            <h3 className={classes.title}>Edit Schedule</h3>
            <CustomTabs value={tabValue} onChange={handleTabChange}>
              <CustomTab label="Item One"/>
              <CustomTab label="Item Two"/>
            </CustomTabs>
          </div>
        </div>
        <div className={classes.content}>
          <FormHandler value={tabValue}/>
        </div>
        <div className={classes.footer}>
          <Button variant="contained" className={classes.button} onClick={onClick}>Close</Button>
          <Button variant="contained" className={classes.button} onClick={onClick}>Save changes</Button>
        </div>
      </div>
  );
}

export default Editor;