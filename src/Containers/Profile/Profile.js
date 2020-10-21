import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Profile.module.css'

class Profile extends Component{
  render(){
    return(
      <div className={classes.Profile}>
        <h3>Welcome {this.props.userEmail}</h3>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return({
    userEmail : state.auth.userEmail
  })
}

export default connect(mapStatetoProps, null)(Profile)