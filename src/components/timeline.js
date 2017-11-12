// Helper function
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

var post_trial_gap = function() {
  return Math.floor( Math.random() * jitter ) + iti;
};


// Experiment parameters
const trial_duration = 300;
const stim_duration = 200;
const iti = 300;
const jitter = 200;
const n_trials = 10;
const prob = .15;
const plugin_name = 'custom_image_display';


// const callback =  (targetID) => {
//    console.log(targetID)
// }
export function timelineFactory(callback) {
  // Stimuli tagging
  const target_callback = function (){
    callback('target')
  }
  const nontarget_callback = function (){
    callback('nontarget')
  }


  // Stimuli
  var base_path = '../../assets/images/';
  var targets = ['target-76116_640.jpg', 'target-360807_640.jpg', 'target-468232_640.jpg', 'target-2083492_640.jpg'];
  var nontargets = ['nontarget-234836_640.jpg', 'nontarget-274183_640.jpg', 'nontarget-280332_640.jpg', 'nontarget-734689_640.jpg'];

  targets = targets.map(target => (base_path + target));
  nontargets = nontargets.map(nontarget => (base_path + nontarget));

  var stimuli_order = [];

  for (let counter = 0; counter < n_trials; counter++){
      stimuli_order.push(Math.random() > prob)
  };

  var stim_list = [];
  var images = [];

  for (let counter = 0; counter < n_trials; counter++){
    if (stimuli_order[counter] == true) {
      let photo_idx = getRandomInt(0, targets.length);
      var trial = {
        stimulus: targets[photo_idx],
        on_start: target_callback
      }
      var image = targets[photo_idx];
    } else {
      let photo_idx = getRandomInt(0, nontargets.length);
      var trial = {
        stimulus: nontargets[photo_idx],
        on_start: nontarget_callback
      }
      var image = nontargets[photo_idx];
      };

    images.push(image);
    stim_list.push(trial);
  };

  // Create timeline
  var timeline = [];
  /* define welcome message trial */
  var welcome_block = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
  };
  timeline.push(welcome_block);
  /* define instructions trial */
  var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>In this experiment, a pet will appear in the center " +
        "of the screen.</p><p>If the pet is <strong>dog</strong>, " +
        "press the letter F on the keyboard as fast as you can.</p>" +
        "<p>If the circle is <strong>cat</strong>, press the letter J " +
        "as fast as you can.</p>" +
        "<div style='float: left;'><img src='assets/images/nontarget-234836_640.jpg'></img>" +
        "<p class='small'><strong>Press the F key</strong></p></div>" +
        "<div class='float: right;'><img src='assets/images/target-76116_640.jpg'></img>" +
        "<p class='small'><strong>Press the J key</strong></p></div>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 2000
  };
  timeline.push(instructions);


  var test_trials = {
    stimulus: 'stimulus',
    type: plugin_name,
    timeline: stim_list,
    choices: ['f', 'j'],
    trial_duration: trial_duration,
    stimulus_duration: stim_duration,
    post_trial_gap: post_trial_gap(),
  };

  timeline.push(test_trials);

  return timeline;

}
