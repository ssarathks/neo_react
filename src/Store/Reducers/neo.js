import * as actionTypes from '../Actions/actionTypes'
const initialState = {
    neos : [],
    neofeedDates : {
      startDate : '',
      endDate : ''
    },
    feedNeoData : null,
    userFavouriteNeos : [],
    neoCardClicked : false,
    selectedNeo : null,
    neoLoading : false
}

const neoReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_NEO_START:
        return({
          ...state,
          neoLoading : true
        })
      case actionTypes.FETCH_NEO_SUCCESS:
        return({
          ...state,
          neoLoading : false
        })
      case actionTypes.FETCH_NEO_FAIL:
        return({
          ...state,
          neoLoading : false
        })
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
      case actionTypes.SET_USER_NEO:
        return({
          ...state,
          userFavouriteNeos : action.neos
        })  
      case actionTypes.NEO_CARD_CLICK:
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