import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Store/Actions/index'
import firebase from '../../fbConfig'
import { checkAuth } from '../../Store/Actions'

class Test extends Component{
  componentDidMount = () => {
    const db = firebase.firestore()
    const email = 'sarathputhen@gmail.com'
    const password = 'sarath@1998'
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     console.log("logged");
    //   })
    //   .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
    

    // db.collection("test")
    //   .get()
    //   .then( querySnapshot => {
    //     querySnapshot.forEach( doc => {
    //       console.log(doc.id, "=>", doc.data());
    //     })
    //   })
  }

  clickHandler = () => {
    this.props.logout()
  }

  render(){
    return(
      <div onClick={this.clickHandler}>
        test
      </div>
    )
  }
}

const mapDispatchtoProps = (dispatch) => {
  return({
    checkAuth : () => {dispatch(actions.checkAuth())},
    logout : () => {dispatch(actions.logout())}
  })
}

export default connect(null, mapDispatchtoProps)(Test)