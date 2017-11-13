import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import html_keyboard_response from 'jspsych/plugins/jspsych-html-keyboard-response';
import Experiment from 'jspsych-react';
import { timelineFactory } from './timeline';
import custom_image_display from './custom_image_display';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Define callback function
const callback = (targetID) => console.log(targetID);
const timeline = timelineFactory(callback);

// Import plugins
const plugins = {
"custom_image_display": custom_image_display,
"html-keyboard-response": html_keyboard_response
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Experiment plugins={plugins} timeline={timeline} width="30%"/>
  </Provider>
  , document.querySelector('.container'));
