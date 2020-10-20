import React  from 'react'
import classes from './NeoListCard.module.css'
const neoCard = (props) => {
  return(
    <div 
      className={classes.NeoListCard}
      onClick={props.clicked}>
        <h4>{props.neo.name}</h4>
        ID : {props.neo.id}
    </div>
  )
}

export default neoCard