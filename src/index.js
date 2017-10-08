import 'core-js/fn/object/assign';
import React from 'react'
import ReactDOM from 'react-dom'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './components/App'
import Movie from './components/Movie'

import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'

import reducers from './stores/reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer
}), applyMiddleware(middleware))

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Router>
  <App/>
</Router>, document.getElementById('app'))
