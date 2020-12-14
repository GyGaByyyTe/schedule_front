import {fade, withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const CustomInput = withStyles((theme) => ({
  root: {
    width: "100%",
    "& .Mui-error input": { border: "1px solid red" },
    "& .MuiInput-underline.Mui-error:after": { border: "none" },
    "& .MuiInput-underline:before": { border: "none" },
    "& input": {
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
      "& input[type='time']": { width: "auto" },
      "& input[type='button']": { width: "auto" },
    },
  },
}))(TextField);

export default CustomInput;