import { Key } from '../modules/keyClass.js';

class Piano {
  constructor(numOfKeys, startKey) {
    this.audioCtx = new AudioContext();
    this.powerBtn = document.querySelector('.power-btn');
    this.volumeSldr = document.querySelector('.volume-slider');
    this.container = document.querySelector('.keyboard-container');
    this.entireContainer = document.querySelector('.piano-container');
    this.numOfKeys = numOfKeys;
    this.startKey = startKey;
    this.numberOfAudioFiles = 0;
    this.keys = {};
    this.pairs = [];
    this.init();
  }

  powerToggle() {
    this.powerBtn.classList.contains('on')
      ? this.audioCtx.resume()
      : this.audioCtx.suspend();
  }

  buildMasterGain() {
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.connect(this.audioCtx.destination);
    this.updateMasterGain();
    this.powerBtn.addEventListener('click', () => {
      this.powerBtn.classList.toggle('on');
      this.powerToggle();
    });
    this.volumeSldr.addEventListener('change', () => {
      this.updateMasterGain();
    });
  }

  updateMasterGain() {
    this.masterGain.gain.value = Math.pow(this.volumeSldr.value / 100, 2);
  }

  buildKeys() {
    const endingKey = this.startKey + this.numOfKeys;
    for (let i = this.startKey; i < endingKey; i++) {
      const key = new Key(i, this);
      this.keys[i] = key;
    }
  }

  createContainer() {
    const pairContainer = document.createElement('div');
    pairContainer.classList.add('key-pair-container');
    return pairContainer;
  }

  addKeys() {
    const keys = Object.values(this.keys);
    keys.forEach((key) => {
      let pairContainer;
      if (key.element.classList.contains('white-key')) {
        pairContainer = this.createContainer();
        this.pairs.push(pairContainer);
      }
      if (key.element.classList.contains('black-key')) {
        pairContainer = this.pairs[this.pairs.length - 1];
      }
      pairContainer.appendChild(key.element);
      this.container.appendChild(pairContainer);
    });
  }

  mouseDown(evt) {
    evt.currentTarget.creator.pressedKey();
  }

  mouseUp(evt) {
    evt.currentTarget.creator.liftedKey();
  }

  addMouseControl() {
    const keys = Object.values(this.keys);
    keys.forEach((key) => {
      key.element.addEventListener('mousedown', this.mouseDown);
    });
    this.container.addEventListener('mousedown', () => {
      keys.forEach((key) => {
        key.element.addEventListener('mouseup', this.mouseUp);
        key.element.addEventListener('mouseenter', this.mouseDown);
        key.element.addEventListener('mouseleave', this.mouseUp);
      });
    });
    document.addEventListener('mouseup', () => {
      keys.forEach((key) => {
        key.element.removeEventListener('mouseup', this.mouseUp);
        key.element.removeEventListener('mouseenter', this.mouseDown);
        key.element.removeEventListener('mouseleave', this.mouseUp);
      });
    });
  }

  init() {
    this.audioCtx.suspend();
    this.buildMasterGain();
    this.buildKeys();
    this.addKeys();
    this.addMouseControl();
    document
      .querySelector(':root')
      .style.setProperty('--num_of_keyContainers', this.pairs.length);
  }
}

export { Piano };
