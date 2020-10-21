import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import neoReducer from './Store/Reducers/neo';
import authReducer from './Store/Reducers/auth'

const rootReducer = combineReducers({
  neo : neoReducer,
  auth : authReducer
})

const comboseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,comboseEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
