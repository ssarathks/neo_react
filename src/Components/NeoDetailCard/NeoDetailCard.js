import React from 'react'
import classes from './NeoDetailCard.module.css'
const neoDetailCard = (props) => {
  let estimated_diameter = <span>{props.neo.estimated_diameter.kilometers.estimated_diameter_min} km to {props.neo.estimated_diameter.kilometers.estimated_diameter_max} km</span>
  
  let potentiallyHazard = props.neo.is_potentially_hazardous_asteroid ? <span>Potentially Hazard Asteroid</span> : <span>Not a Potentially Hazard Asteroid</span>
  return(
    <div className={classes.NeoDetailCard}>
      <h3>{props.neo.name}</h3>
      <p>ID : {props.neo.id}</p>
      <p>Estimated Diameter : {estimated_diameter}</p>
      <p>Hazard Status : {potentiallyHazard}</p>
    </div>
  )
}

export default neoDetailCard