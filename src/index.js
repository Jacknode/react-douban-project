import 'core-js/fn/object/assign';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
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
render(<App/>, document.getElementById('app'));
