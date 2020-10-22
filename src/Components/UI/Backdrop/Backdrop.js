import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = (props) => {
    let backdropClasses = [classes.Backdrop, classes.Close].join(' ')
    if (props.show) {
        backdropClasses = [classes.Backdrop, classes.Open].join(' ')
    }
    return(
        <div 
            className={backdropClasses}
            onClick = {props.backdropClicked}>
            {props.children}
        </div>
    )

}

export default backdrop