import React from 'react'
import classes from './Datepicker.module.css'


// USED IN NEOFEEDINPUT COMPONENT
const datePicker = (props) => {
  return(
    <div className={classes.DatePicker}>
      <label htmlFor={props.name}>{props.name}</label>
      <input 
        className={classes.DatePickerInput} 
        type="date" 
        name={props.name} 
        onChange={(event) => props.dateChanged(event.target.value)}/>
    </div>
    
  )
}

export default datePicker