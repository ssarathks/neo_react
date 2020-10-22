import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


import { Input } from '@material-ui/core'
import Button from '@material-ui/core/Button';

import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../Store/Actions/index'
import classes from './Auth.module.css'


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

    //SHOWING ERROR IF OCCURED
    const authError = this.props.authError ? <h4 style={{color : 'red'}}>{this.props.authError}</h4> : null

    //CHECKING AUTH STATE AND LOADER SHOWING
    const content = this.props.authLoading ?
    <Spinner /> : 
    <>
      <div>
        <h4 style={{width: '100%'}}>Authenticate</h4>
      </div>
      <form className={classes.AuthForm} >
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
        {authError}
        {authRedirect}
        {content}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated,
    authLoading : state.auth.loading,
    authError : state.auth.authError
  })
}

const mapDispatchtoProps = (dispatch) => {
  return({
    login : (email, password) => {dispatch(actions.login(email, password))},
    signup : (email, password) => {dispatch(actions.signup(email, password))}
  })
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Auth)
