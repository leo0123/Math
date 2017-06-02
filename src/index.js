import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './components/App.jsx';
import "keypress";

//import injectTapEventPlugin from 'react-tap-event-plugin';
//import FlatButton from "material-ui/FlatButton";
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//injectTapEventPlugin();
var listener = new window.keypress.Listener();
console.log(listener);
ReactDOM.render( < App / > , document.getElementById('root'));


//ReactDOM.render( <MuiThemeProvider>< FlatButton label="test" /></MuiThemeProvider>, document.getElementById('root'));
