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

const authFail = (error) => {
  return({
    type : actionTypes.AUTH_FAIL,
    error : error
  })
}
const setAuth = (user = null) => {
  return({
    type : actionTypes.SET_AUTH,
    user : user
  })
}


export const checkAuth = () => {
  return( dispatch => {
    dispatch(authStart())
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
      dispatch(authFail(error))
    });

  })
}

export const signup = (email, password) => {
  return(dispatch => {
    dispatch(authStart())

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user =>{
      console.log(user);
      dispatch(authFinish())

    })
    .catch(function(error) {
      dispatch(authFail(error))
    });
  })
}

export const logout = () => {
  console.log("auth logour called");
  return(dispatch => {
    firebase.auth()
      .signOut()
      .then(() => {
      dispatch(setAuth())
    }).catch((error) => {
      console.log("logout error");
    });
  })
}