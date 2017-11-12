import React, { Component } from 'react';
import jsPsych from 'jspsych';
import custom_image_display from './custom_image_display';
import html_keyboard_response from 'jspsych/plugins/jspsych-html-keyboard-response';
import { timelineFactory } from './timeline';

const callback = (targetID) => console.log(targetID);
const timeline = timelineFactory(callback);

jsPsych.plugins["custom_image_display"] = custom_image_display;
jsPsych.plugins["html-keyboard-response"] = html_keyboard_response;

//<Experiment callback={(target)=> console.log(target)}  />
export default class Experiment extends Component {
  constructor(props) {
    super(props);
  }

  handleFinish(){
    <h2>Thanks!</h2>
  }

  render() {
    return (<div id="experiment" />)
  }

  componentDidMount() {
    /* start the experiment */
    jsPsych.init({
      display_element: "experiment",
      timeline: timeline,
      default_iti: 3000,
      on_finish: this.handleFinish
    });
  }

}
