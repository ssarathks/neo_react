import React from 'react'
import { connect } from 'react-redux'
import NeofeedInput from '../NeofeedInput/NeofeedInput'
import Button from '@material-ui/core/Button';

import * as actions from '../../Store/Actions/index'

import classes from './Sidebar.module.css'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
const sidebar = (props) => {
    const loginHandler = () => {
        props.history.push('/auth')
        props.backdropClickedHandler()
    }

    const logoutHandler = () => {
        console.log("logout handler called");
        props.logout()
        props.backdropClickedHandler()
    }

    const authButton = props.isAuthenticated ? 
        <Button
            className={classes.SidebarButton}
            color='primary' 
            onClick={logoutHandler}>LOGOUT</Button> : 
        <Button
            className={classes.SidebarButton}
            color='primary' 
            onClick={loginHandler}>LOGIN</Button>

    
    let sidebarAttachedClasses = [classes.Sidebar, classes.Close]
    if (props.sidebarOpen) {
        sidebarAttachedClasses = [classes.Sidebar, classes.Open]
    }
    return(
        <div className={sidebarAttachedClasses.join(' ')}>
            <div className={classes.BrandName}>
                <h2 style={{margin: 'auto'}}>GetNeo</h2>
            </div>

            <NavLink style = {{textDecoration : 'none', }} to='/'>
                <Button
                className={classes.SidebarButton}
                color='primary' 
                onClick={props.backdropClickedHandler}>HOME</Button>
            </NavLink>

            {
            props.isAuthenticated 
            ?<NavLink style = {{textDecoration : 'none', }} to='/profile'>
                <Button
                className={classes.SidebarButton}
                color='primary' 
                onClick={props.backdropClickedHandler}>PROFILE</Button>
            </NavLink> 
            : null
            }
            {authButton}
            <NeofeedInput />

        </div>
    )
}

const mapStatetoProps = state => {
    return({
        isAuthenticated : state.auth.isAuthenticated,
        sidebarOpen : state.neo.sidebarOpen
    })
}
const mapDispatchtoProps = dispatch => {
    return({
        logout : () => {dispatch(actions.logout())},
        backdropClickedHandler : () => {dispatch(actions.backdropClickedHandler())}
    })
}

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(sidebar))