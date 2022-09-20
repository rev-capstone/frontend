import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ModeComment } from '@material-ui/icons';
import Narbar from './components/navbar/Narbar';

export const dark = createTheme({
  palette: {
    type: "dark",
  }
});
export const light = createTheme({
  palette: {
    type: "light",
  }
});

let mode = light;

export function flip()
{
  console.log("Before: " + mode.palette.type);
  mode = (mode === light ? dark : light);
  console.log("After: " + mode.palette.type);
  console.log(document.getElementsByTagName("ThemeProvider"));
  root.render(
    <ThemeProvider theme={mode}>
      <CssBaseline />
      <React.StrictMode>
        
        <App/>
      </React.StrictMode>
    </ThemeProvider>
  
  );
  
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={mode}>
    <CssBaseline />
    <React.StrictMode>
      
      <App/>
    </React.StrictMode>
  </ThemeProvider>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
