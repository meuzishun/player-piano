const display = {
  CSS_access: document.querySelector(':root'),
  loadingMessage: document.querySelector('.loading-container'),

  piano: {
    container: document.querySelector('.piano-container'),
    controls: {
      container: document.querySelector('.piano-controls'),
      gestureBoxes: document.querySelectorAll('.gesture-box'),
      powerBtn: document.querySelector('.power-btn'),
      volumeSldr: document.querySelector('.volume-slider'),
      tempoInput: document.querySelector('.tempo-field'),
      playBtn: document.querySelector('.play-btn'),
      recordBtn: document.querySelector('.record-btn'),
      keyboardBtn: document.querySelector('.keyboard-btn'),
    },
    keyboard: document.querySelector('.keyboard-container'),
    keyContainers: [],
    keyElements: [],
  },

  showApp: function () {
    display.loadingMessage.classList.add('hidden');
    display.piano.container.classList.remove('hidden');
  },

  buildPiano: function (startingMidi, numOfKeys) {
    piano.audioCtx.suspend();
    let endingMidi = startingMidi + numOfKeys;
    for (let midi = startingMidi; midi < endingMidi; midi++) {
      const key = new Key(midi);

      let keyContainer;
      if (key.element.classList.contains('white-key')) {
        keyContainer = document.createElement('div');
        keyContainer.classList.add('key-container');
        display.piano.keyContainers.push(keyContainer);
      }
      if (key.element.classList.contains('black-key')) {
        keyContainer =
          display.piano.keyContainers[display.piano.keyContainers.length - 1];
      }

      keyContainer.appendChild(key.element);
      display.piano.keyboard.appendChild(keyContainer);
      // piano.keys.push(key);
      piano.keys[`Key-${key.midi}`] = key;
      display.piano.keyElements.push(key.element);
    }
    display.CSS_access.style.setProperty(
      '--num_of_keyContainers',
      display.piano.keyContainers.length
    );
    // display.showApp();
    // interface.activateMouse();
    // piano.init();
  },
};
