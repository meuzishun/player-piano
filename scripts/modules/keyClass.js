import { Tone } from '../modules/toneClass.js';
import { events } from '../modules/events.js';

class Key {
  constructor(midi, piano) {
    this.midi = midi;
    this.piano = piano;
    this.filePath = `audio/${this.midi}.mp3`;
    this.setPitchClass();
    this.setKeyColor();
    this.loadSample();
    this.buildElement();
  }

  setPitchClass() {
    this.pitchClass = this.midi % 12;
  }

  setKeyColor() {
    const WhPCs = [0, 2, 4, 5, 7, 9, 11];
    this.color = WhPCs.includes(this.pitchClass) ? 'white' : 'black';
  }

  async loadSample() {
    this.buffer = await this.getFile(this.piano.audioCtx, this.filePath);
  }

  async getFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioBuffer.pitch = this.midi;
    this.piano.numberOfAudioFiles++;
    const loadingBar = document.querySelector('.fill');
    loadingBar.style.width =
      (this.piano.numberOfAudioFiles / this.piano.numOfKeys) * 100 + '%';
    if (this.piano.numberOfAudioFiles === this.piano.numOfKeys) {
      this.piano.entireContainer.classList.remove('hidden');
    }
    return audioBuffer;
  }

  buildElement() {
    const element = document.createElement('div');
    element.classList.add('key', `${this.color}-key`);
    element.dataset.midi = this.midi;
    element.dataset.pitchClass = this.pitchClass;
    element.creator = this; //? Creates a reference to the object that birthed the element... circular but makes events easier to manage.  Is this a problem?
    this.element = element;
  }

  pressedKey(startTime) {
    this.playPitch(startTime);
    this.pressedColor();
    events.emit('keyPressed', this.midi);
  }

  liftedKey(stopTime) {
    this.silencePitch(stopTime);
    this.liftedColor();
    events.emit('keyLifted', this.midi);
  }

  pressedColor() {
    this.element.classList.add(`${this.color}-key-pressed`);
  }

  liftedColor() {
    this.element.classList.remove(`${this.color}-key-pressed`);
  }

  playPitch(startTime) {
    this.tone = new Tone(this.buffer, this.piano);
    this.tone.play(startTime || this.piano.audioCtx.currentTime);
  }

  silencePitch(stopTime) {
    this.tone.stop(stopTime || this.piano.audioCtx.currentTime);
    this.tone = null;
  }
}

export { Key };
