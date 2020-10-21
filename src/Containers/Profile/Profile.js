import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Input } from '@material-ui/core'
// import Button from '@material-ui/core/Button';

import * as actions from '../../Store/Actions/index'
import classes from './Profile.module.css'
import NeoListCard from '../../Components/NeoListCard/NeoListCard';
import Backdrop from '../../Components/Backdrop/Backdrop';
import Modal from '../../Components/Modal/Modal';
import NeoDetailCard from '../../Components/NeoDetailCard/NeoDetailCard';
import Spinner from '../../Components/Spinner/Spinner';
import { Redirect } from 'react-router';

class Profile extends Component{
  state = {
    neoId : null
  }
  componentDidMount = () => {
    this.props.fetchUserNeo(this.props.userId)
  }

  neoCardClickedHandler = (neo) => {
    this.props.neoCardClickedHandler(neo)
  }

  backdropClickedHandler = () => {
    this.props.backdropClickedHandler()
  }

  addToFavouriteHandler = () => {
    this.props.addToFavourite(this.props.userId, this.state.neoId)
  }
  
  render(){
    let userFavouriteNeos = this.props.userFavouriteNeos.map(neo => {
      return(
        <NeoListCard
          key = {neo.id} 
          neo = {neo}
          btnDisplay = "none"
          clicked = {() => this.neoCardClickedHandler(neo)}/>
      )
    })

    let neoDetail = this.props.neoCardClicked ? 
        <div>
          <Backdrop 
            show = {this.props.neoCardClicked}
            backdropClicked = {this.backdropClickedHandler}>
          </Backdrop>
            <Modal show = {this.props.neoCardClicked}>
              <NeoDetailCard neo = {this.props.selectedNeo}/>
            </Modal>
        </div>
      : null

    //REDIRECTING FROM PROFILE PAGE IF NOT AUTHENTICATED
    let authRedirect = !this.props.isAuthenticated ? <Redirect to='/auth' /> : null
    return(
      <div className={classes.Profile}>
        {authRedirect}
        {//SPINNER SHOWING WHILE LOADING NEOS
        this.props.neoLoading ? 
        <Spinner /> :
        <div>
          <h3>Welcome {this.props.userEmail}</h3>
          <hr />
          <h4>Your Favourite Neos</h4>
          {userFavouriteNeos}
          {neoDetail}
        </div>
        }
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated,
    userEmail : state.auth.userEmail,
    userId : state.auth.userId,
    userFavouriteNeos : state.neo.userFavouriteNeos,
    neoCardClicked : state.neo.neoCardClicked,
    selectedNeo : state.neo.selectedNeo,
    neoLoading : state.neo.neoLoading
  })
}

const mapDispatchtoProps = (dispatch) => {
  return({
    addToFavourite : (userId, neoId) => {dispatch(actions.addToFavourite(userId, neoId))},
    fetchUserNeo : (userId) => {dispatch(actions.fetchUserNeo(userId))},
    neoCardClickedHandler : (neo) => {dispatch(actions.neoCardClickedHandler(neo))},
    backdropClickedHandler : () => {dispatch(actions.backdropClickedHandler())}
  })
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Profile)