import React, { Component} from 'react'
import {connect} from 'react-redux'
import Modal from '../../Components/Modal/Modal'
import Backdrop from '../../Components/Backdrop/Backdrop'
import NeoDetailCard from '../../Components/NeoDetailCard/NeoDetailCard'
import NeoListCard from '../../Components/NeoListCard/NeoListCard'

import * as actions from '../../Store/Actions/index'

import classes from './Neo.module.css'
class Neo extends Component{
  componentDidMount = () => {
    this.props.fetchNeo()
  }

  neoCardClickedHandler = (neo) => {
    this.props.neoCardClickedHandler(neo)
  }

  backdropClickedHandler = () => {
    this.props.backdropClickedHandler()
  }

  render(){
    let neos = this.props.neos.map(neo => {
      return(
        <NeoListCard
          key = {neo.id} 
          neo = {neo}
          clicked = {() => this.neoCardClickedHandler(neo)}/>
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
      <div className={classes.Neo}>
        {neos}
        {neoDetail}
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return({
    neos : state.neo.neos,
    neoCardClicked : state.neo.neoCardClicked,
    selectedNeo : state.neo.selectedNeo,
    authLoading : state.auth.loading
  })
}

const mapDispatchtoProps = dispatch => {
  return({
    fetchNeo : () => {dispatch(actions.fetchNeo())},
    neoCardClickedHandler : (neo) => {dispatch(actions.neoCardClickedHandler(neo))},
    backdropClickedHandler : () => {dispatch(actions.backdropClickedHandler())}
  })
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Neo)