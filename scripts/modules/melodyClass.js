// The melody takes the score, the composer's chosen gestures, and the 'Glued' setting and creates a sequence of Notes with absolute MIDI pitch numbers and durations in beats
import { composer } from '../modules/composer.js'; // The composer looks at the gestures selected, the number of gestures needed, and whether or not they should match ends
import { score } from '../modules/score.js'; // The score looks at the tonic selected and the meter selected and saves the settings for other modules
import { Note } from '../modules/noteClass.js';
import { durationSequences } from '../modules/sequences.js';

class Melody {
  constructor() {
    score.init();
    this.score = score;
    composer.gatherGestures();
    composer.pickRandomGestures();
    this.gestures = composer.chosenGestures;
    this.createNotes();
    this.tonicize();
    if (document.querySelector('#glued-checkbox').checked) {
      this.glue();
    }
  }

  chooseDurations(gesture) {
    const meter = this.score.meter;
    const gestureLength = gesture.length;
    return durationSequences[meter][gestureLength == 3 ? 0 : 1];
  }

  tonicize() {
    this.notes.forEach((note) => {
      note.pitch += this.score.tonic;
    });
  }

  glue() {
    this.notes.forEach((note, index) => {
      if (index > 0) {
        if (note.pitch === this.notes[index - 1].pitch) {
          this.notes.splice(index - 1, 1);
        }
      }
    });
  }

  createNotes() {
    this.notes = [];
    this.gestures.forEach((gesture) => {
      let durations = this.chooseDurations(gesture);
      gesture.forEach((pitch, index) => {
        let note = new Note(pitch, durations[index]);
        this.notes.push(note);
      });
    });
  }
}

export { Melody };
