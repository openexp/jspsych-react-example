/*
 * Example plugin template
 */

export var plugin = (function() {

  var plugin = {};

  plugin.info = {
    name: 'image-button-response',
    description: '',
    parameters: {
      stimulus: {
        type: 'image',
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      }
    }
  }
  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.parameter = trial.parameter || 'default value';

    var new_html = '<img src="'+trial.stimulus+'" id="custom_plugin"></img>';

    // add prompt
    new_html += trial.prompt;

    // add option for on_start parameter in the experiment
    if (typeof trial.on_start === 'function'){
      trial.on_start.call()
    } else if (typeof trial.on_start !== 'undefined') {
      trial.data['on_start'] = trial.on_start;
    };

    // add option for on_start parameter in the experiment
    if (typeof trial.on_start === 'function'){
      trial.on_start.call()
    } else if (typeof trial.on_start !== 'undefined') {
      trial.data['on_start'] = trial.on_start;
    };
    // draw
    display_element.innerHTML = new_html;

    // store response
    var response = {
      rt: -1,
      key: -1
    };

  //   var end_trial = function() {
  //     display_element.innerHTML = '';
  //   }
  //
  // };

  // // define data output
  // plugin.trial_data = {
  //   "rt": response.rt,
  //   "stimulus": trial.stimulus,
  //   "key_press": response.key
  // };
  };
  return plugin;
})();
