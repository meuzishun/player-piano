import { Key } from 'keyClass.js';

const piano = {
  audioCtx: new AudioContext(),
  masterGain: null,
  audioBuffers: {},
  keys: {},
  keyCount: 0,

  init: function () {
    this.createMasterGain();
    this.display.showApp();
    interface.activateMouse();
  },

  createMasterGain: function () {
    piano.masterGain = piano.audioCtx.createGain();
    piano.masterGain.connect(piano.audioCtx.destination);
    piano.masterGain.gain.value = 1;
  },

  display: {
    CSS_access: document.querySelector(':root'),
    loadingMessage: document.querySelector('.loading-container'),
    container: document.querySelector('.piano-container'),
    controls: {
      container: document.querySelector('.piano-controls'),
      gestureBoxes: document.querySelectorAll('.gesture-box'),
      powerBtn: document.querySelector('.power-btn'),
      volumeSldr: document.querySelector('.volume-slider'),
      tempoInput: document.querySelector('.tempo-field'),
      tonicInput: document.querySelector('.tonic-field'),
      playBtn: document.querySelector('.play-btn'),
      recordBtn: document.querySelector('.record-btn'),
      keyboardBtn: document.querySelector('.keyboard-btn'),
    },
    keyboard: document.querySelector('.keyboard-container'),
    keyContainers: [],
    keyElements: [],
    feedback: {
      container: document.querySelector('.feedback-container'),
      answers: document.querySelectorAll('.answer'),
    },
    showApp: function () {
      piano.display.loadingMessage.classList.add('hidden');
      piano.display.container.classList.remove('hidden');
    },
  },

  setContainer: function (key) {
    let keyContainer;

    if (key.element.classList.contains('white-key')) {
      keyContainer = document.createElement('div');
      keyContainer.classList.add('key-container');
      piano.display.keyContainers.push(keyContainer);
    }

    if (key.element.classList.contains('black-key')) {
      keyContainer =
        piano.display.keyContainers[piano.display.keyContainers.length - 1];
    }

    keyContainer.appendChild(key.element);
    piano.display.keyboard.appendChild(keyContainer);
  },

  buildPiano: function (startingMidi, numOfKeys) {
    this.audioCtx.suspend();
    let endingMidi = startingMidi + numOfKeys;
    for (let midi = startingMidi; midi < endingMidi; midi++) {
      const key = new Key(midi);
      // key.loadSample();
      this.setContainer(key);
      // let keyContainer;
      // if (key.element.classList.contains('white-key')) {
      //     keyContainer = document.createElement('div');
      //     keyContainer.classList.add('key-container');
      //     piano.display.keyContainers.push(keyContainer);
      // }
      // if (key.element.classList.contains('black-key')) {
      //     keyContainer = piano.display.keyContainers[piano.display.keyContainers.length - 1];
      // }

      // keyContainer.appendChild(key.element);
      // piano.display.keyboard.appendChild(keyContainer);
      // piano.keys.push(key);
      piano.keys[`Key-${key.midi}`] = key;
      piano.display.keyElements.push(key.element);
    }
    piano.display.CSS_access.style.setProperty(
      '--num_of_keyContainers',
      piano.display.keyContainers.length
    );
    // display.showApp();
    // interface.activateMouse();
    // piano.init();
  },

  // loadAudioFile: function(audioFile) {
  //     fetch(audioFile).then(function(response) {
  //         return response.arrayBuffer();
  //     }).then(function(arrayBuffer) {
  //         return piano.audioCtx.decodeAudioData(arrayBuffer);
  //     }).then(function(audioBuffer) {
  //         const midi_pitch = /\d+/g.exec(audioFile);
  //         piano.audioBuffers[midi_pitch] = audioBuffer;

  //         if (Object.keys(piano.audioBuffers).length === display.piano.keyElements.length) {
  //             // display.showApp();
  //             // interface.activateMouse();
  //             piano.init();
  //             // piano.createMasterGain();
  //             // piano.masterGain = piano.audioCtx.createGain();
  //             // piano.masterGain.connect(piano.audioCtx.destination);
  //             // piano.masterGain.gain.value = 0.5;
  //         }
  //     }).catch(function(err) {
  //         console.log(`Something went wrong - ${err}`);
  //     });
  // },

  // loadMidiSamples: function(startingMidi, numOfKeys) {
  //     piano.audioCtx.suspend();

  //     for (let i = startingMidi, endMidi = startingMidi + numOfKeys; i < endMidi; i++) {
  //         piano.loadAudioFile(`../audio/${i}.wav`);
  //     }
  // }
};
