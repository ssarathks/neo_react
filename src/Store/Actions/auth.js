import firebase from '../../fbConfig'
import * as actionTypes from './actionTypes'

const authStart = () => {
  return({
    type : actionTypes.AUTH_START
  })
}

const authFinish = () => {
  return({
    type : actionTypes.AUTH_FINISH
  })
}
const setAuth = (user = null) => {
  return({
    type : actionTypes.SET_AUTH,
    user : user
  })
}
const removeAuth = () => {
  return({
    type : actionTypes.REMOVE_AUTH,
  })
}

export const checkAuth = () => {
  return( dispatch => {
    dispatch(authStart())
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.email);
        dispatch(setAuth(user))
        dispatch(authFinish())
        // ...
      } else {
        console.log("No");
        dispatch(setAuth())
        dispatch(authFinish())
      }
    });
  })
}

export const login = (email, password) => {
  return(dispatch => {
    dispatch(authStart())

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      dispatch(setAuth(user))
      dispatch(authFinish())
    })
    .catch(function(error) {
      dispatch(setAuth())
      dispatch(authFinish())

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  })
}

export const logout = () => {
  return(dispatch => {
    console.log("logout called");
    firebase.auth()
      .signOut()
      .then(() => {
      dispatch(setAuth())
      console.log("logged out");
    }).catch((error) => {
      console.log("logout error");
    });
  })
}