import React, { Component } from 'react';
import jsPsych from 'jspsych';
import { plugin } from './custom_plugin';
import { timeline, images } from './experiment';


// Load to jsPsych
jsPsych.plugins["custom_plugin"] = plugin;
jsPsych.pluginAPI.preloadImages(images)

export default class Experiment extends Component {
  constructor(props) {
    super(props);
  }

  handleFinish(){
    <h2>Thanks!</h2>
  }

  render() {
    return (<div className="experiment" />)
  }

  componentWillMount() {
    /* start the experiment */
    jsPsych.init({
      timeline: timeline,
      default_iti: 3000,
      on_finish: this.handleFinish()
    });
    console.log(jsPsych)
  }

}
