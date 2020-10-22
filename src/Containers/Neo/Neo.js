
// COMPONENT FOR RENDERIGN NEOS FETCHED FROM neo/browse API
import React, { Component} from 'react'
import {connect} from 'react-redux'
import Modal from '../../Components/UI/Modal/Modal'
import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import NeoDetailCard from '../../Components/NeoDetailCard/NeoDetailCard'
import NeoListCard from '../../Components/NeoListCard/NeoListCard'

import * as actions from '../../Store/Actions/index'

import classes from './Neo.module.css'
import Spinner from '../../Components/UI/Spinner/Spinner'
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
          btnDisplay = "flex"
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

    const neoFetchError = this.props.neoFetchError ?
      <h4 style={{color:'red'}}>{this.props.neoFetchError}</h4> : null
    return(
      <div className={classes.Neo}>
        {neoFetchError}
        {this.props.neoLoading ? 
          <Spinner /> : 
            <div>
            <h3>Near Earth Objects</h3>
            <hr />
            {neos}
            {neoDetail}
          </div>
        }
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return({
    neos : state.neo.neos,
    neoCardClicked : state.neo.neoCardClicked,
    selectedNeo : state.neo.selectedNeo,
    authLoading : state.auth.loading,
    neoLoading : state.neo.neoLoading,
    neoFetchError : state.neo.neoFetchError
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