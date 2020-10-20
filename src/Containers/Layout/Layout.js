import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

import Sidebar from '../../Components/Sidebar/Sidebar'
import Neo from '../Neo/Neo'
import Neofeed from '../Neofeed/Neofeed';

import classes from './Layout.module.css'
const layout = () => {
  return(
    <div className ={classes.Layout}>
      {/* <Navbar /> */}
      <Sidebar />
      <Switch>
        <Route exact path='/' component={Neo}/>
        <Route exact path='/neofeed' component={Neofeed}/>
      </Switch>
    </div>
  )
}

export default layout