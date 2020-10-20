// Component for showing Neo feed fetched in a single date

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Backdrop from '../../Components/Backdrop/Backdrop'
import Modal from '../../Components/Modal/Modal'
import NeoDetailCard from '../../Components/NeoDetailCard/NeoDetailCard'
import NeoCard from '../../Components/NeoListCard/NeoListCard'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import * as actions from '../../Store/Actions/index'

import classes from './NeofeedSingleDate.module.css'
class NeofeedSingleDate extends Component{
  state = {
    expand : false
  }
  expandToggleHandler = (date) => {
    let updatedExpand = this.state.expand
    updatedExpand = !updatedExpand
    this.setState({
      expand : updatedExpand
    })
  }

  //FOR SHOWING BACKDROP AND MODEL 
  //actions are managed through redux action creators Actions/noe.js
  neoCardClickedHandler = (neo) => {
    this.props.neoCardClickedHandler(neo)
  }
  backdropClickedHandler = () => {
    this.props.backdropClickedHandler()
  }

  render(){
    let neos = null
    neos = this.props.neos.map(neo => {
      let attachedClasses = [classes.NeoList_Expandable]
      if (this.state.expand) {
        attachedClasses = [classes.NeoList_Expandable, classes.NeoList_Expandable_Show].join(' ')
      }
      return(
        <div className={attachedClasses}>
          <NeoCard neo = {neo} clicked = {() => this.neoCardClickedHandler(neo)}/>
        </div>
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


    return(
      <div className={classes.NeofeedSingleDate}>
        <h4 
          className={classes.NeofeedSingleDate_Heading} 
          onClick={() => {this.expandToggleHandler(this.props.date)}}>
            {this.props.date}
            {this.state.expand ? 
              <ExpandLessIcon style = {{float :'right'}}/> : 
              <ExpandMoreIcon style = {{float :'right'}}/>}
        </h4>

        {neos}
        
        {neoDetail}
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return({
    neoCardClicked : state.neo.neoCardClicked,
    selectedNeo : state.neo.selectedNeo
  })
}

const mapDispatchtoProps = dispatch => {
  return({
    neoCardClickedHandler : (neo) => {dispatch(actions.neoCardClickedHandler(neo))},
    backdropClickedHandler : () => {dispatch(actions.backdropClickedHandler())}
  })
}

export default connect(mapStatetoProps , mapDispatchtoProps)(NeofeedSingleDate)