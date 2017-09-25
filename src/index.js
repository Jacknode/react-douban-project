import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
// import route from './router/index'
import store from './stores/index'

// import 'styles/css/index.css'
// import 'styles/css/font-awesome.min.css'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './components/MyAwesomeReactComponent';
// const App = () => (
//   <MuiThemeProvider>
//     <MyAwesomeReactComponent />
//   </MuiThemeProvider>
// );

// Render the main component into the dom

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('app'));
