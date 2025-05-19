// The composer looks at the gestures selected, the number of gestures needed, and whether or not they should match ends
// TODO: Give more options for choices... matched ends is one.  What about matched starts?  No repeats?
import { pitchSequences } from './sequences.js';

const composer = {
  gestureBoxes: document.querySelectorAll('.gesture-box'),
  numberOfGestures: document.querySelector('#gesture-num'),
  matchedBox: document.querySelector('#matched-checkbox'),
  gatherGestures: function () {
    this.possibleGestures = [];
    this.gestureBoxes.forEach((box) => {
      if (box.checked) {
        let gestures = pitchSequences[box.dataset.mode][box.dataset.gesture];
        gestures.forEach((gesture) => this.possibleGestures.push(gesture));
      }
    });
  },
  pickRandomGesture: function (pool) {
    let len = pool.length;
    let randomIndex = Math.floor(Math.random() * len);
    return pool[randomIndex];
  },
  findMatches: function (given, pool) {
    let lastIndex = given.length - 1;
    return pool.filter((gesture) => gesture[0] === given[lastIndex]);
  },
  findMismatches: function (given, pool) {
    let lastIndex = given.length - 1;
    return pool.filter((gesture) => gesture[0] !== given[lastIndex]);
  },
  pickRandomGestures: function () {
    this.gatherGestures();
    let numberOfGestures = this.numberOfGestures.value;
    this.chosenGestures = [];
    for (let i = 0; i < numberOfGestures; i++) {
      if (i === 0) {
        const choice = this.pickRandomGesture(this.possibleGestures);
        this.chosenGestures.push(choice);
      }
      if (i > 0) {
        const choicesLen = this.chosenGestures.length;
        const lastChoice = this.chosenGestures[choicesLen - 1];
        let filteredChoices;
        if (this.matchedBox.checked) {
          filteredChoices = this.findMatches(lastChoice, this.possibleGestures);
        }
        if (!this.matchedBox.checked) {
          filteredChoices = this.findMismatches(
            lastChoice,
            this.possibleGestures
          );
        }
        const choice = this.pickRandomGesture(filteredChoices);
        this.chosenGestures.push(choice);
      }
    }
  },
};

export { composer };
