import React, { Component } from 'react';
import jsPsych from 'jspsych';
import custom_image_display from './custom_image_display';
import html_keyboard_response from 'jspsych/plugins/jspsych-html-keyboard-response';
import { timelineFactory } from './timeline';

const callback = (targetID) => console.log(targetID);
const timeline = timelineFactory(callback);

// Import plugins
jsPsych.plugins["custom_image_display"] = custom_image_display;
jsPsych.plugins["html-keyboard-response"] = html_keyboard_response;

//<Experiment callback={(target)=> console.log(target)}  />
export default class Experiment extends Component {

  width = this.props.width || '100%';
  height = this.props.height || '100%';

  render() {
    return (<div width={this.width} height={this.height} id="experiment" />)
  }

  componentDidMount() {
    /* start the experiment */
    jsPsych.init({
      display_element: "experiment",
      timeline: timeline,
      default_iti: 3000
    });
  }
}
