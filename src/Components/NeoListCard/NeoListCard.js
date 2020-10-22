import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import React, { Component } from 'react'
import classes from './NeoListCard.module.css'
import * as actions from '../../Store/Actions/index'
import { connect } from 'react-redux'

class NeoCard extends Component{
  state = {
    showAlert : false
  }

  addToFavouriteHandler = () => {
    this.props.addToFavourite(this.props.userId , this.props.neo)
    this.setState({showAlert : true})
    setTimeout(() => {
        this.setState({
            showAlert : false
        })
    }, 1000);
  }
  render(){
    return(
      <div 
        className={classes.NeoListCard}>
          {/* SHOWING ALERT ONCE ADD TO FAVOURITE CLICKED */}
          {this.state.showAlert ? <Alert className={classes.Alert} severity="success" variant='filled'>Added to Favourite</Alert> : null}

          <div 
            //ONCE CLICKED NEODETAIL WILL BE RENDERED
            style={{width : '70%'}}
            onClick={this.props.clicked}>
              <h4>{this.props.neo.name}</h4>
              ID : {this.props.neo.id}
          </div>

          <div style={{display: this.props.btnDisplay,alignItems : 'center'}}>
            {/* ADD TO FAVOURITE BUTTON */}
            <Button 
              variant='contained' 
              onClick={this.addToFavouriteHandler}
              disabled={!this.props.isAuthenticated}
              startIcon={<AddIcon />}>Favourite</Button>
          </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return({
    userId : state.auth.userId,
    isAuthenticated : state.auth.isAuthenticated
  })
}

const mapDispatchtoProps = (dispatch) => {
  return({
    addToFavourite : (userId, neo) => {dispatch(actions.addToFavourite(userId, neo))}
  })
}

export default connect(mapStatetoProps, mapDispatchtoProps)(NeoCard)