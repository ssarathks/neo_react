import * as actionTypes from './actionTypes'
import axios from 'axios'
import firebase from '../../fbConfig'

const db = firebase.firestore()

const fetchNeoStart = () => {
  return({
    type : actionTypes.FETCH_NEO_START
  })
}
const fetchNeoSuccess = () => {
  return({
    type : actionTypes.FETCH_NEO_SUCCESS
  })
}
const fetchNeoFail = (error) => {
  return({
    type : actionTypes.FETCH_NEO_FAIL,
    error : error
  })
}
const setNeo = (neos) => {
  return({
    type : actionTypes.SET_NEO,
    neos : neos
  })
}


export const fetchNeo = () => {
  return((dispatch) => {
    dispatch(fetchNeoStart())
    axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse',{
      params : {
        api_key : 'CkIdunEhOIVRPcWaexnoUOrG6eDGhx9Plh8bEBvA',
        page : 0,
        size : 10
      }
    })
    .then(response => {
      console.log(response.data);
      dispatch(setNeo(response.data.near_earth_objects))
      dispatch(fetchNeoSuccess())
    })
    .catch(error => {
      dispatch(fetchNeoFail(error))
    })
  })
}

const setNeoFeedDates = (startDate, endDate) => {
  return({
    type : actionTypes.SET_FEED_DATES,
    startDate : startDate,
    endDate : endDate
  })
}

const setfeedNeo = (data) => {
  return({
    type : actionTypes.SET_FEED_NEO,
    data : data
  })
}

export const fetchNeoFeed = (startDate, endDate) => {
  return((dispatch) => {
    dispatch(setNeoFeedDates(startDate, endDate))
    dispatch(fetchNeoStart())
    axios.get('https://api.nasa.gov/neo/rest/v1/feed',{
      params : {
        api_key : 'CkIdunEhOIVRPcWaexnoUOrG6eDGhx9Plh8bEBvA',
        start_date : startDate,
        end_date : endDate,
        detailed : true
      }
    })
    .then(response => {
      dispatch(setfeedNeo(response.data))
      dispatch(fetchNeoSuccess())
    })
    .catch(error => {
      dispatch(fetchNeoFail(error))
    })
  })
}

export const neoCardClickedHandler = (neo) => {
  return({
    type : actionTypes.NEO_CARD_CLICK,
    neo : neo
  })
}

export const sidebarTogglerClickHandler = () => {
  return({
    type : actionTypes.SIDEBAR_TOGGLE_CLICK,
  })
}

export const backdropClickedHandler = () => {
  return({
    type : actionTypes.BACK_DROP_CLICK
  })
}


export const addToFavourite = (userId, neo) => {
  return((dispatch) => {
    //CHECKING IF DOC EXIST
    db.collection("favourites")
    .doc(userId)
    .get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        //IF DOC EXIST
        db.collection("favourites")
          .doc(userId)
          .update({
            neoIds : firebase.firestore.FieldValue.arrayUnion(neo)
          })
      }
      //ELSE CREATING NEWDOC WITH USERID
      else{
        db.collection("favourites")
          .doc(userId)
          .set({neoIds : [neo]})
      }
    })
  })
}

const setUserNeo = (neos) => {
  return({
    type : actionTypes.SET_USER_NEO,
    neos : neos
  })
}

export const fetchUserNeo = (userId) => {
  return((dispatch) => {
    dispatch(fetchNeoStart())
    db.collection("favourites")
    .doc(userId)
    .get()
    .then(function(doc) {
      if (doc.exists) {
          dispatch(setUserNeo(doc.data().neoIds))
          dispatch(fetchNeoSuccess())
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          dispatch(fetchNeoSuccess())
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        dispatch(fetchNeoFail(error))
    });
  })
}