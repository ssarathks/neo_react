import React, { Component} from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
    this.setState(prevState => {
      return({sidebarOpen : !prevState.sidebarOpen})
    })
  }

  render(){
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
        {/* <Navbar /> */}
        <SidebarToggler sidebarTogglerClicked={this.sidebarTogglerClickHandler}/>
        <Sidebar open = {this.state.sidebarOpen}/>
        <div className={classes.Content}>
          {routes}
        </div>
      </div>
      )
  }
}


const mapStatetoProps = (state) => {
  return({
    isAuthenticated : state.auth.isAuthenticated
  })
} 

export default connect(mapStatetoProps,null)(Layout)