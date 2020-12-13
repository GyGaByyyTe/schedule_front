import {fade, withStyles} from '@material-ui/core/styles';
import {InputBase} from "@material-ui/core";

const CustomInput = withStyles((theme) => ({
  root: {
    width: "100%",
    // background: "white",
    "& input[type='time']": { width: "auto" },
    "& input[type='button']": { width: "auto" }
  },
  input: {
    width: "100%",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '8px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default CustomInput;