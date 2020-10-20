// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

// export default function DatePicker(props) {
//   const classes = useStyles();

//   return (
//     <form className={classes.container} noValidate>
//       <TextField
//         id="date"
//         label={props.label}
//         type="date"
//         defaultValue="2017-05-24"
//         className={classes.textField}
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//     </form>
//   );
// }

import React from 'react'
import classes from './Datepicker.module.css'
// const dateSubmitHandler = (event) => {
//   event.preventDefault()
//   console.log(event.target.value);
// }
const datePicker = (props) => {
  return(
    <div className={classes.DatePicker}>
      <label htmlFor={props.name}>{props.name}</label>
      <input className={classes.DatePickerInput} type="date" name={props.name} onChange={(event) => props.dateChanged(event.target.value)}/>
    </div>
    
  )
}

export default datePicker