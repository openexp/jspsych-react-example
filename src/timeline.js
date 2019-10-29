// Helper function
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const post_trial_gap = function () {
  return Math.floor(Math.random() * jitter) + iti;
};


// Experiment parameters
const trial_duration = 300;
const stim_duration = 200;
const iti = 300;
const jitter = 200;
const n_trials = 2010;
const prob = .15;
const plugin_name = 'callbackImageKeyboardResponsePlugin';


/**
 *
 * Example callback:
 *
 * const callback =  (targetID) => {
 *    console.log(targetID)
 * }
 *
 */
export function timelineFactory(callback) {

  const start_callback = function () {
    callback('start')
  };
  const target_callback = function () {
    callback('target')
  };
  const nontarget_callback = function () {
    callback('nontarget')
  };
  const stop_callback = function () {
    callback('stop')
  };

  const base_path = '../src/images/';
  let targets = [
    'target-76116_640.jpg',
    'target-360807_640.jpg',
    'target-468232_640.jpg',
    'target-2083492_640.jpg'
  ];
  let nontargets = [
    'nontarget-234836_640.jpg',
    'nontarget-274183_640.jpg',
    'nontarget-280332_640.jpg',
    'nontarget-734689_640.jpg'
  ];

  targets = targets.map(target => `${base_path}${target}`);
  nontargets = nontargets.map(nontarget => `${base_path}${nontarget}`);

  const stimuli_order = [];

  for (let counter = 0; counter < n_trials; counter++) {
    stimuli_order.push(Math.random() > prob)
  }

  const stim_list = [];
  const images = [];
  let trial, image;
  for (let counter = 0; counter < n_trials; counter++) {
    if (stimuli_order[counter] === true) {
      let photo_idx = getRandomInt(0, targets.length);
      trial = {
        stimulus: targets[photo_idx],
        on_start: target_callback
      };
      image = targets[photo_idx];
    } else {
      let photo_idx = getRandomInt(0, nontargets.length);
      trial = {
        stimulus: nontargets[photo_idx],
        on_start: nontarget_callback
      };
      image = nontargets[photo_idx];
    }

    images.push(image);
    stim_list.push(trial);
  }

  // Create timeline
  const timeline = [];

  const welcome_block = {
    type: 'html-keyboard-response',
    stimulus: "Welcome to the experiment. Press any key to begin.",
    post_trial_gap: 500,
    on_start: start_callback
  };
  timeline.push(welcome_block);

  const test_trials = {
    stimulus: 'stimulus',
    type: plugin_name,
    timeline: stim_list,
    choices: ['f', 'j'],
    trial_duration: trial_duration,
    stimulus_duration: stim_duration,
    post_trial_gap: post_trial_gap(),
  };
  timeline.push(test_trials);

  const end_block = {
    type: 'html-keyboard-response',
    stimulus: "Thanks for participating!",
    post_trial_gap: 500,
    on_start: stop_callback
  };

  timeline.push(end_block);

  return timeline;

}
