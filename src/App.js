import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/index'
import './App.css';
import Layout from './Containers/Layout/Layout';

class App extends Component{
  componentDidMount = () => {
    console.log("component app mounted");
    this.props.checkAuth()
  }

  render(){
    return(
      <div className="App">
        <Layout>
          
        </Layout>
      </div>
    )
  }
}

const mapDispatchtoProps = (dispatch) => {
  return({
    checkAuth : () => {dispatch(actions.checkAuth())}
  })
}

export default connect(null, mapDispatchtoProps)(App);
