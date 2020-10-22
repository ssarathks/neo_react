import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';
import * as actions from '../../Store/Actions/index'
// import Navbar from '../../Components/Navbar/Navbar';

import Sidebar from '../../Components/Sidebar/Sidebar'
import SidebarToggler from '../../Components/SidebarToggler/SidebarToggler';
import Auth from '../Auth/Auth';
import Neo from '../Neo/Neo'
import Neofeed from '../Neofeed/Neofeed';
import Profile from '../Profile/Profile';

import classes from './Layout.module.css'

class Layout extends Component{

  state = {
    sidebarOpen : false
  }

  sidebarTogglerClickHandler = () => {
    this.props.sidebarTogglerClickHandler()
  }

  backdropClickedHandler = () => {
    this.setState({sidebarOpen : false})
  }

  render(){
    // GUARDING ROUTES BY CHECKING AUTHENTICATION
    const routes = this.props.isAuthenticated ? 
    <Switch>
      <Route exact path='/' component = {Neo}/>
      <Route exact path='/auth' component = {Auth}/>
      <Route exact path='/neofeed' component={Neofeed}/>
      <Route exact path='/profile' component={Profile}/>
    </Switch> :
    <Switch>
      <Route exact path='/' component = {Neo}/>
      <Route exact path='/auth' component = {Auth}/>
      <Route exact path='/neofeed' component={Neofeed}/>
    </Switch>

    return(
      <div className ={classes.Layout}>
        <SidebarToggler sidebarTogglerClicked={this.sidebarTogglerClickHandler}/>
        <Sidebar open = {this.props.sidebarOpen}/>
        <Backdrop show = {this.props.sidebarOpen} backdropClicked = {this.props.backdropClickedHandler}/>
        
        {/* CONTENT DIV SHOWS DYNAMIC CONTENT PART OF APP */}
        <div className={classes.Content}>
          {routes}
        </div>
      </div>
      )
  }
}


const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated,
    sidebarOpen : state.neo.sidebarOpen
  })
} 

const mapDispatchtoProps = (dispatch) => {
  return({
    sidebarTogglerClickHandler : () => {dispatch(actions.sidebarTogglerClickHandler())},
    backdropClickedHandler : () => {dispatch(actions.backdropClickedHandler())}

  })
}


export default connect(mapStatetoProps,mapDispatchtoProps)(Layout)