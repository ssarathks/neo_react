import React, { Component } from 'react'
import * as actions from '../../Store/Actions/index'


import { Input } from '@material-ui/core'
import Button from '@material-ui/core/Button';

import classes from './Auth.module.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner';


class Auth extends Component{
  state = {
    email : '',
    password : ''
  }

  loginHandler = () => {
    this.props.login(this.state.email, this.state.password)
  }

  signupHandler = () => {
    this.props.signup(this.state.email, this.state.password)
  }
  render(){

    // REDIRECTING IF USER IS AUTHENTICATED
    const authRedirect = this.props.isAuthenticated ? <Redirect to='/'/> : null

    //CHECKING AUTH STATE AND LOADER SHOWING
    const content = this.props.authLoading ?
    <Spinner /> : 
    <>
      <div>
        <h4 style={{width: '100%'}}>Authenticate</h4>
      </div>
      <form className={classes.AuthForm} >
        {/* <input type="text" placeholder="Email"/>
        <input type="password" placeholder="Password"/> */}
        <Input 
          type="text"
          placeholder="Email" 
          onChange={(event) => {this.setState({email : event.target.value})}}/>
        <Input 
          placeholder="Password" 
          type='password' 
          onChange={(event) => {this.setState({password : event.target.value})}}/>
        <Button 
          color='primary'
          variant='contained'
          style={{width:'40%', alignSelf:'center'}}
          onClick={this.loginHandler}>Login</Button>
        <Button 
          color='secondary'
          variant= 'contained'
          style={{width:'40%', alignSelf:'center'}}
          onClick={this.signupHandler}>Signup</Button>
      </form>
    </>

    return(
      <div className={classes.Auth}>

        {authRedirect}
        {content}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated,
    authLoading : state.auth.loading
  })
}

const mapDispatchtoProps = (dispatch) => {
  return({
    login : (email, password) => {dispatch(actions.login(email, password))},
    signup : (email, password) => {dispatch(actions.signup(email, password))}
  })
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Auth)
