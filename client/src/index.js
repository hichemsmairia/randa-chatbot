import React from "react";
import ReactDOM from "react-dom";
//import './index.scss';
import "antd/dist/antd.css";

import App from "./App";



import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';


import * as serviceWorker from "./serviceWorker";
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const initialState = {};

ReactDOM.render(
 
      <App />
    
  

  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


