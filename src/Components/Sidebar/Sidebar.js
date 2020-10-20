import React from 'react'
import Neofeed from '../../Containers/NeofeedInput/NeofeedInput'
import classes from './Sidebar.module.css'
const sidebar = (props) => {
    
    return(
        <div className={classes.Sidebar}>
            <div className={classes.BrandName}>
                BrandName
            </div>
            <Neofeed />
        </div>
    )
}

export default sidebar