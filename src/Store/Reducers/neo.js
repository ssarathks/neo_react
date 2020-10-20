import * as actionTypes from '../Actions/actionTypes'
const initialState = {
    neos : [],
    neofeedDates : {
      startDate : '',
      endDate : ''
    },
    feedNeoData : null,
    neoCardClicked : false,
    selectedNeo : null,
}

const neoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEO:
          return({
            ...state,
            neos : action.neos
          })
        case actionTypes.SET_FEED_DATES:
          return({
            ...state,
            neofeedDates : {
              ...state.neofeedDates,
              startDate : action.startDate,
              endDate : action.endDate
            }
          })
        case actionTypes.SET_FEED_NEO:
          return({
            ...state,
            feedNeoData : action.data
          })  
        case actionTypes.NEO_CART_CLICK:
          return({
            ...state,
            neoCardClicked : true,
            selectedNeo : action.neo
          })
        case actionTypes.BACK_DROP_CLICK:
          return({
            ...state,
            neoCardClicked : false,
            selectedNeo : null
          })    
        default:
            return state
    }
}

export default neoReducer