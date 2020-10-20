import * as actionTypes from './actionTypes'
import axios from 'axios'

const setNeo = (neos) => {
  return({
    type : actionTypes.SET_NEO,
    neos : neos
  })
}


export const fetchNeo = () => {
  return((dispatch) => {
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
    axios.get('https://api.nasa.gov/neo/rest/v1/feed',{
      params : {
        api_key : 'CkIdunEhOIVRPcWaexnoUOrG6eDGhx9Plh8bEBvA',
        start_date : startDate,
        end_date : endDate,
        detailed : true
      }
    })
    .then(response => {
      console.log(response.data);
      dispatch(setfeedNeo(response.data))
    })
  })
}

export const neoCardClickedHandler = (neo) => {
  return({
    type : actionTypes.NEO_CART_CLICK,
    neo : neo
  })
}

export const backdropClickedHandler = () => {
  return({
    type : actionTypes.BACK_DROP_CLICK
  })
}