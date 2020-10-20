import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import DatePicker from '../../Components/Datepicker/Datepicker'

import * as actions from '../../Store/Actions/index'

import classes from './NeofeedInput.module.css'
class Neofeed extends Component {
  state = {
    feedDates : {}
  }

  dateChangedHandler = (value,fieldName) => {
    let updatedfeedDates = {...this.state.feedDates}
    updatedfeedDates[fieldName] = value
    this.setState({feedDates : updatedfeedDates})
  }

  redirectToFeed = () => {
    this.props.history.push('/neofeed')
  }

  fetchNeoFeedHandler = (event, redirectToFeed) => {
    event.preventDefault()
    this.props.fetchNeoFeed(this.state.feedDates['Start-Date'], this.state.feedDates['End-Date'])
    redirectToFeed()
  }
  render(){
    let neoDateFieldsArray = ['Start-Date','End-Date']
    let neoDateFields = neoDateFieldsArray.map(fieldName => {
      return(
        <DatePicker 
          name={fieldName} 
          dateChanged = {(value) => this.dateChangedHandler(value,fieldName)}
          key = {fieldName}/>
      )
    })
    return(
      <div className={classes.Neofeed}>
        <form onSubmit = {(event) => {this.fetchNeoFeedHandler(event, this.redirectToFeed)}}>
          {neoDateFields}
          <input type='submit' />
        </form>
      </div>
    )
  }
}

const mapDispatchtoProps = dispatch => {
  return({
    fetchNeoFeed : (startDate, endDate) => {dispatch(actions.fetchNeoFeed(startDate,endDate))},
  })
}

export default withRouter(connect(null, mapDispatchtoProps)(Neofeed))