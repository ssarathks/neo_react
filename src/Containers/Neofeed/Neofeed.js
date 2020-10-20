import React, { Component} from 'react'
import { connect } from 'react-redux'
import NeofeedSingleDate from '../NeofeedSingleDate/NeofeedSingleDate'


import classes from './Neofeed.module.css'
class Neofeed extends Component{
  render(){

    //Mapping returned objects on each date and splicing first 10 items
    let neofeed = null
    let neos = null
    if (this.props.feedNeoData) {
      neofeed = Object.keys(this.props.feedNeoData.near_earth_objects).map(date => {
        neos = this.props.feedNeoData.near_earth_objects[date].splice(0,10)

        return(
          //component for rendering list of items of a single date
          <NeofeedSingleDate date = {date} neos = {neos}/>
        )
      })
    }
    return(
      <div className={classes.Neofeed}>
        {/* setting heading on Neofeed page */}
        {this.props.feedNeoData ? 
          <div style={{width : '100%'}}>
            <h3>Near Earth Objects on the selected Dates</h3>
            <p>Showing 10 item on each date.Tap on dates</p>
          </div> : 
          <p>Select Date Range</p>}
        {neofeed}
      </div>
    )
  }
}
 
const mapStatetoProps = state => {
  return({
    feedNeoData : state.neo.feedNeoData
  })
}

const mapDispatchtoProps = dispatch => {
  return({

  })
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Neofeed)