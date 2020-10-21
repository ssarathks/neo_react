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
    }

    const logoutHandler = () => {
        props.logout()
    }

    const authButton = props.isAuthenticated ? 
        <Button
            color='primary' 
            style={{width:'100%', alignSelf:'center'}}
            onClick={logoutHandler}>LOGOUT</Button> : 
        <Button
            color='primary' 
            style={{width:'100%', alignSelf:'center'}}
            onClick={loginHandler}>LOGIN</Button>

    return(
        <div className={classes.Sidebar}>
            <div className={classes.BrandName}>
                <h2 style={{margin: 'auto'}}>GetNeo</h2>
            </div>
            <NavLink style = {{textDecoration : 'none', }} to='/'>
                <Button
                color='primary' 
                style={{width:'100%', alignSelf:'center'}}>HOME</Button>
            </NavLink>

            {
            props.isAuthenticated 
            ?<NavLink style = {{textDecoration : 'none', }} to='/profile'>
                <Button
                color='primary' 
                style={{width:'100%', alignSelf:'center'}}>PROFILE</Button>
            </NavLink> 
            : null
            }
            {authButton}
            <NeofeedInput />

            {/* <Button style={{width:'100%', alignSelf:'center',color : 'black'}}>
                <NavLink style = {{textDecoration : 'none', }} to='/profile'>Profile</NavLink>
            </Button> */}
        </div>
    )
}

const mapStatetoProps = state => {
    return({
        isAuthenticated : state.auth.isAuthenticated
    })
}
const mapDispatchtoProps = dispatch => {
    return({
        logout : () => {dispatch(actions.logout())},
    })
}

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(sidebar))