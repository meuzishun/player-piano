const interface = {
  display: {
    loadMessage: document.querySelector('.loading'),
    showApp: function () {
      interface.display.loadMessage.classList.add('hidden');
      interface.piano.classList.remove('hidden');
    },
  },
  input: {
    clickedKey: function (evt) {
      let now = piano.audioCtx.currentTime;
      let element = evt.currentTarget;
      let midi_pitch = element.dataset.midi;

      const note = new Note(midi_pitch);
      note.play(now);
      interface.changeColor(element);

      const endNote = function () {
        let now = piano.audioCtx.currentTime;
        note.stop(now);
        interface.returnColor(element);
      };

      element.addEventListener('mouseup', endNote);
      element.addEventListener('mouseleave', endNote);

      interface.keys.forEach((key) => {
        key.addEventListener('mouseenter', interface.input.clickedKey);
        key.addEventListener('mouseleave', endNote);
      });

      document.body.addEventListener('mouseup', () => {
        interface.keys.forEach((key) => {
          key.removeEventListener('mouseenter', interface.input.clickedKey);
          key.removeEventListener('mouseleave', endNote);
        });
      });
    },
  },

  piano: document.querySelector('.piano-container'),
  controls: document.querySelector('.piano-controls'),
  keyboard: document.querySelector('.keyboard-container'),
  CSS_access: document.querySelector(':root'),

  numberOfKeys: 0,
  startingMidi: 0,

  keys: [],
  keyContainers: [],
  whitePC: [0, 2, 4, 5, 7, 9, 11],
  blackPC: [1, 3, 6, 8, 10],

  keySpecs: function (key, midi) {
    const pitchClass = midi % 12;

    if (interface.whitePC.includes(pitchClass)) {
      key.classList.add('white-key');

      const keyContainer = document.createElement('div');
      keyContainer.classList.add('key-container');
      keyContainer.appendChild(key);
      interface.keyContainers.push(keyContainer);
      interface.keyboard.appendChild(keyContainer);
    }

    if (interface.blackPC.includes(pitchClass)) {
      key.classList.add('black-key');
      const keyContainer =
        interface.keyContainers[interface.keyContainers.length - 1];
      keyContainer.appendChild(key);
    }

    return key;
  },

  createKey: function (midi) {
    const key = document.createElement('div');
    key.classList.add('key');
    key.dataset.midi = midi;
    // key.addEventListener('mousedown', interface.clickedKey);
    key.addEventListener('mousedown', interface.input.clickedKey);
    return this.keySpecs(key, midi);
  },

  buildMarkup: function () {
    for (
      let i = this.startingMidi,
        endingMidi = this.numberOfKeys + this.startingMidi;
      i < endingMidi;
      i++
    ) {
      const key = this.createKey(i);
      interface.keys.push(key);
    }

    interface.CSS_access.style.setProperty(
      '--num_of_keyContainers',
      this.keyContainers.length
    );
  },

  clickedKey: function (evt) {
    let now = piano.audioCtx.currentTime;
    let element = evt.currentTarget;
    let midi_pitch = element.dataset.midi;

    const note = new Note(midi_pitch);
    note.play(now);

    interface.changeColor(element);

    const endNote = function () {
      let now = piano.audioCtx.currentTime;
      note.stop(now);
      interface.returnColor(element);
    };

    element.addEventListener('mouseup', endNote);
    element.addEventListener('mouseleave', endNote);

    interface.keys.forEach((key) => {
      key.addEventListener('mouseenter', interface.clickedKey);
      key.addEventListener('mouseleave', endNote);
    });

    document.body.addEventListener('mouseup', () => {
      interface.keys.forEach((key) => {
        key.removeEventListener('mouseenter', interface.clickedKey);
        key.removeEventListener('mouseleave', endNote);
      });
    });
  },

  // showApp: function() {
  //     interface.loadMessage.classList.add('hidden');
  //     interface.piano.classList.remove('hidden');
  // },

  changeColor: function (elem) {
    if (elem.classList.contains('white-key')) {
      elem.classList.add('white-key-clicked');
    }

    if (elem.classList.contains('black-key')) {
      elem.classList.add('black-key-clicked');
    }
  },

  returnColor: function (elem) {
    if (elem.classList.contains('white-key-clicked')) {
      elem.classList.remove('white-key-clicked');
    }

    if (elem.classList.contains('black-key-clicked')) {
      elem.classList.remove('black-key-clicked');
    }
  },

  findKey: function (midi) {
    return interface.keys.find((key) => key.dataset.midi == midi);
  },

  lightSequence: function (midis, durations) {},
};

const powerBtn = document.querySelector('.power-btn');

powerBtn.addEventListener('click', function () {
  if (powerBtn.classList.contains('on')) {
    powerBtn.classList.remove('on');
    piano.audioCtx.suspend();
  } else {
    powerBtn.classList.add('on');
    piano.audioCtx.resume();
  }
});
