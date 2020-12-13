import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const CustomRadio = withStyles({
  root: {
    color: "#E5E6EC",
    '&$checked': {
      color: "#2B63FF",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default CustomRadio;