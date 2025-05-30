import { Piano } from './modules/pianoClass.js';
import { Melody } from './modules/melodyClass.js';
import { player } from './modules/player.js';
import { computerKeyboardInput } from './modules/computerKeyboardInput.js';
import teacher from './modules/teacher.js';

const newGestureButton = document.querySelector('.newGesture-btn');
const playButton = document.querySelector('.play-btn');
const keyboardButton = document.querySelector('.keyboard-btn');
const tonicLetter = document.querySelector('#tonic-letter');
const tonicOctave = document.querySelector('#tonic-octave');

player.piano = new Piano(73, 24);

newGestureButton.addEventListener('click', () => {
  teacher.ignore();
  teacher.clearQuestion();
  teacher.clearFeedback();

  const melody = new Melody();
  teacher.setQuestion(melody);
  player.melody = melody;

  player.playMelody();
  const waitTime = Math.round(melody.notes.at(-2).endTime * 1000);

  const waitForGesture = setTimeout(() => {
    teacher.listen();
    clearTimeout(waitForGesture);
  }, waitTime);
});

playButton.addEventListener('click', () => {
  player.playMelody();
});

keyboardButton.addEventListener('click', () => {
  keyboardButton.classList.toggle('hot');
  if (keyboardButton.classList.contains('hot')) {
    computerKeyboardInput.on();
  } else {
    computerKeyboardInput.off();
  }
});

tonicLetter.addEventListener('change', computerKeyboardInput.reset);
tonicOctave.addEventListener('change', computerKeyboardInput.reset);

computerKeyboardInput.connect(player.piano);
