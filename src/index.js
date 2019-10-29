import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { Experiment } from 'jspsych-react';
import { timelineFactory } from './timeline';
import callbackImageKeyboardResponsePlugin from './callbackImageKeyboardResponsePlugin';


const createStoreWithMiddleware = applyMiddleware()(createStore);

// Define callback function
const callback = (targetID) => console.log(targetID);
const timeline = timelineFactory(callback);

// Import plugins
const plugins = {
  callbackImageKeyboardResponsePlugin
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Experiment timeline={timeline} plugins={plugins} width="100%"/>
  </Provider>
  , document.querySelector('.container'));
