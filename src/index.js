import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { ExperimentWindow } from 'jspsych-react';
import { timelineFactory } from './timeline';
import callbackImageKeyboardResponsePlugin from './callbackImageKeyboardResponsePlugin';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// Define callback function
const callback = (targetID) => console.log(targetID);
const timeline = timelineFactory(callback);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <ExperimentWindow
      settings={{ timeline }}
      plugins={{ callbackImageKeyboardResponsePlugin }}
    />
  </Provider>
  , document.querySelector('.container'));
