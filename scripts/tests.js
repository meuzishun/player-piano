import { Piano } from './modules/pianoClass.js';
// import { score } from './modules/score.js'; // The score looks at the tonic selected and the meter selected and saves the settings for other modules
// import { composer } from './modules/composer.js'; // The composer looks at the gestures selected, the number of gestures needed, and whether or not they should match ends
import { Melody } from './modules/melodyClass.js'; // The melody takes the score, the composer's chosen gestures, and the 'Glued' setting and creates a sequence of Notes with absolute MIDI pitch numbers and durations in beats
import { player } from './modules/player.js'; // The player can of course play notes, melodies, chords, progressions, etc... but also schedules a melody (sequence of notes with MIDI pitch numbers and beat durations) by giving each note a start and end time relative to a GO point
// import { pitchSequences } from './modules/sequences.js'
import { InputData } from './modules/inputData.js';

player.piano = new Piano(88, 21);

const newGestureButton = document.querySelector('.newGesture-btn');
const playButton = document.querySelector('.play-btn');

newGestureButton.addEventListener('click', () => {
    player.melody = new Melody();
    player.playMelody();
});

playButton.addEventListener('click', () => {
    player.playMelody();
});

// composer.gatherGestures();
// console.log(composer.possibleGestures);


// TODO: continue to hook up functionality to interface

// const gestureBoxes = document.querySelectorAll('.gesture-box');
// gestureBoxes.forEach(box => {
//     box.addEventListener('click', (e) => {
//         const {mode, gesture} = e.currentTarget.dataset;
//         const {checked} = e.currentTarget;
//         if (checked) {
//             console.log(`${mode} ${gesture} is selected`);
//         }
//         if (!checked) {
//             console.log(`${mode} ${gesture} is removed`);
//         }
//     });
// });

// console.table(testMelody.notes);


// let testScore2 = new Score(55, 'compound', 108);
// let testMelody2 = new Melody(testScore2, composer.chosenGestures);
// testMelody2.contextualize();
// console.table(testMelody2.notes);




// player.piano = myTestPiano;
// player.melody = testMelody;

// Player?
// const playNote = (note, piano) => {
//     let now = piano.audioCtx.currentTime;
//     let key = piano.keys.find(key => key.midi === note.pitch);
//     key.playPitch(now + note.startTime);
//     key.silencePitch(now + note.endTime);
// }



// const player = {
    
//     gatherGestures: function() {
//         //! something with accepting arguments here
//         let result = [];
//         for (const arg in arguments) {
//             for (const value of arguments[arg]) {
//                 result.push(value);
//             }
//         }
//         this.possibleGestures = result;
//     },
    
//     randomGesture: function() {
//         this.gesture = this.possibleGestures[Math.floor(Math.random() * this.possibleGestures.length)];
//     },
// }

// console.log(player);
// player.gatherGestures(pitchSequences.minor.passing, pitchSequences.minor.appoggiatura1);
// player.randomGesture();
// console.log(player);



// let testMelody = new Melody('simple', player.gesture);
// console.table(testMelody);
// testScore.contextualizeMelody(testMelody.notes);
// console.table(testScore.melody);




// USER_INPUT
// event listeners to pass data to score


// const score = {
//     tonic: 60,
//     meter: 'simple',
//     tempo: 88
// }




/*
class Note {
    constructor(midi, duration) {
        this.midi = midi;
        this.duration = duration;
    }

    init() {
        // calculates startTime and endTime
    }
}
*/

/*
class Melody {
    constructor(score, gesture) {
        this.score = score;
        this.gesture = gesture;
    }

    init() {
        // takes the info from the score and applies it to the gesture outputting a list of Notes for the player
    }
}
*/

/*
const player = {
    piano: null,
    melody: null,
    play: function() {
        // plays the melody using the piano
    }
}
*/












// Player?
// function gatherGestures() {
//     let result = [];
//     for (const arg in arguments) {
//         for (const value of arguments[arg]) {
//             result.push(value);
//         }
//     }
//     return result;
// }




// const randomGesture = (gestures) => gestures[Math.floor(Math.random() * gestures.length)];





// Melody?
// const chooseDurations = (length, meter) => durationSequences[meter][length == 3 ? 0 : 1];


// Melody?
// function buildMelody(gesture, meter) {
//     let durations = chooseDurations(gesture.length, meter);
//     let melody = [];
    
//     for (const index in gesture) {
//         let note = new Note(gesture[index], durations[index]);
//         melody.push(note);
//     }
    
//     return melody;
// }

// class Melody {
//     constructor(meter, gesture) {
//         this.meter = meter;
//         this.gesture = gesture;
//         this.notes = [];
//         this.buildMelody();
//     }

//     chooseDurations() {
//         return durationSequences[this.meter][this.gesture.length == 3 ? 0 : 1];
//     }

//     buildMelody() {
//         this.durations = this.chooseDurations();
//         for (const index in this.gesture) {
//             let note = new Note(this.gesture[index], this.durations[index]);
//             this.notes.push(note);
//         }
//     }
// }



// class Score {
//     constructor(tonic, meter, bpm) {
//         this.tonic = tonic;
//         this.meter = meter;
//         this.bpm = bpm;
//     }

//     bpmToMilliseconds() {
//         return this.meter === 'simple' ?
//         60 / this.bpm :
//         this.meter === 'compound' ?
//         20 / this.bpm : null;
//     }

//     contextualizeMelody(melody) {
//         let begin = 0;
//         for (const note of melody) {
//             note.pitch += this.tonic;
//             note.duration *= this.bpmToMilliseconds();
//             note.startTime = begin;
//             begin = begin + note.duration;
//             note.endTime = note.startTime + note.duration;
//         }
//         this.melody = melody;
//     }
// }




// Score?
// const bpmToMilliseconds = (bpm, meter) => meter === 'simple' ? 60 / bpm : meter === 'compound' ? 20 / bpm : null;

// Score?
// function contextualizeMelody(melody, tonic, bpm, meter) {
//     let begin = 0;
//     for (const note of melody) {
//         note.midiPitch += tonic;
//         note.duration *= bpmToMilliseconds(bpm, meter);
//         note.startTime = begin;
//         begin = begin + note.duration;
//         note.endTime = note.startTime + note.duration;
//     }
//     return melody;
// }



// let testMel = buildMelody(randomGesture(possibleGestures), 'compound');
// console.table(testMel);

// let melodyInContext = contextualizeMelody(testMel, 60, 60, 'compound');
// console.table(melodyInContext);

// Player plays the score



// Score has a tonic, meter, tempo, and plays melodies and progressions
// class Score {
//     constructor(tonic, meter, tempo) {
//         this.tonic = tonic;
//         this.meter = meter;
//         this.tempo = tempo;
//     }
// }

// Melody generates melodies consisting of Notes using Score's tonic, meter, tempo, durations etc.
// class Melody {
//     constructor(gesture, tonic, meter, tempo) {
        
//     }
// }

// Note generates a note with pitch and duration
// class Note {
//     constructor(pitch, duration) {
//         this.pitch = pitch;
//         this.duration = duration;
//     }
// }


// console.table(bullshit);


// function buildMelody(gesture, meter) {
//     let pitches = [...gesture];
//     let length = gesture.length;
//     let durations = chooseDurations(length, meter);
//     let melody = [];

//     for (index in gesture) {
//         melody.push(new Note(pitches[index], durations[index]));
//     }

//     return melody;
// }

// let testMel = buildMelody(pitchSequences.major.passing[1], 'compound');
// console.table(testMel);







/* JUST TO PROVE REFERENCE VS VALUE

function glueConnection(gesture1, gesture2) {
    gesture2.shift(); //! somehow we are chopping off the start of both gestures when they match.  Oh... because they reference the same array?
    // console.log(gesture1);
    // console.log(gesture2);
    return [...gesture1, ...gesture2];
}

function testConnection(gesture1, gesture2) {
    return gesture1[gesture1.length - 1] === gesture2[0];
}

function findConnection(gestures) {
    // let firstGesture = randomGesture(gestures); //! These both reference the same array!
    // let secondGesture = randomGesture(gestures); //! These both reference the same array!
    let firstGesture = [...randomGesture(gestures)];
    let secondGesture = [...randomGesture(gestures)];

    if (testConnection(firstGesture, secondGesture)) {
        // console.log('match');
        // console.log(firstGesture);
        // console.log(secondGesture);
        return glueConnection(firstGesture, secondGesture);
    } else {
        return findConnection(gestures);
    }
}
*/








// let possibleGestures = gatherGestures(gestures.passing, gestures.neighboring);
// let result = findConnection(possibleGestures);
// console.table(result);

// const myTestPiano = {
//     keys: [
//         {
//             midi: 60,
//             pressedKey: function() {
//                 console.log('60 has been pressed');
//             },
//             liftedKey: function() {
//                 console.log('60 has been lifted');
//             },
//             playPitch: function() {
//                 console.log('60 is playing');
//             },
//             silencePitch: function() {
//                 console.log('60 is stopped');
//             }
//         }
//     ]
// };

// const findKeyMidi = (num) => myTestPiano.keys.find(key => key.midi === num);

// let myKey = findKeyMidi(60);

// let startPlay = setTimeout(() => {
//     // myKey.pressedKey();
//     myKey.playPitch();
//     clearTimeout(startPlay);
// }, 3000);

// let stopPlay = setTimeout(() => {
//     // myKey.liftedKey();
//     myKey.silencePitch();
//     clearTimeout(stopPlay);
// }, 6000);

// console.log(myKey);

// import { Key } from './modules/keyClass.js';


// console.log(myTestPiano);

// let myKey = myTestPiano.keys[56];
// let testWait = setTimeout(() => {
//     myKey.pressedKey();
// }, 5000);



// const testPiano1 = {
//     audioCtx: new AudioContext(),
//     starting_key: 60,
//     number_of_keys: 1,
//     keys: [],
// }

// class Piano {
//     constructor(numOfKeys, startKey) {
//         this.audioCtx = new AudioContext();
//         this.container = document.querySelector('.keyboard-container');
//         this.numOfKeys = numOfKeys;
//         this.startKey = startKey;
//         this.keys = [];
//         this.pairs = [];
//     }

//     buildKeys() {
//         const endingKey = this.startKey + this.numOfKeys;
//         for (let i = this.startKey; i < endingKey; i++) {
//             let key = new Key(i, this)
//             this.keys.push(key);
//         }
//     }

//     createContainer() {
//         //TODO: create HTML div for key pairs
//         const pairContainer = document.createElement('div');
//         pairContainer.classList.add('key-container');
//         return pairContainer;
//     }

//     addKeys() {
//         //TODO: add the keys to the HTML
//         this.keys.forEach(key => {
//             console.log(key);
//             let pairContainer;
//             if (key.element.classList.contains('white-key')) {
//                 pairContainer = this.createContainer();
//                 this.pairs.push(pairContainer);
//             }
//             if (key.element.classList.contains('black-key')) {
//                 pairContainer = this.pairs[this.pairs.length - 1];
//             }
//             pairContainer.appendChild(key.element);
//             this.container.appendChild(pairContainer);
//         });
//     }

//     mouseDown(evt) {
//         evt.currentTarget.creator.pressedKey();
//         this.keys.forEach(key => {
//             key.element.addEventListener('mouseenter', this.mouseEnter);
//             key.element.addEventListener('mouseleave', this.mouseLeave);
//         });
//     }
    
//     mouseUp(evt) {
//         evt.currentTarget.creator.liftedKey();
//         this.keys.forEach(key => {
//             key.element.removeEventListener('mouseenter', this.mouseEnter);
//             key.element.removeEventListener('mouseleave', this.mouseLeave);
//         });
//     }
    
//     mouseEnter(evt) {
//         evt.currentTarget.creator.pressedKey();
//     }
    
//     mouseLeave(evt) {
//         evt.currentTarget.creator.liftedKey();
//     }

//     mouseControl() {
//         this.keys.forEach(key => {
//             key.element.addEventListener('mousedown', this.mouseDown);
//             key.element.addEventListener('mouseup', this.mouseUp);
//         });
//     }

//     init() {
//         this.buildKeys();
//         this.addKeys();
//         this.mouseControl();
//         document.querySelector(':root').style.setProperty('--num_of_keyContainers', this.pairs.length);
//         document.querySelector('.piano-container').classList.remove('hidden');
//     }
// }




// let testKey1 = new Key(60, testPiano1);

// let testBtn = document.querySelector('#test-btn');

// let testDiv = document.querySelector('.test-div');

// testDiv.appendChild(testKey1.element);

// function mouseDown(evt) {
//     evt.currentTarget.creator.pressedKey();
//     //TODO: all keys should get these eventlisteners
//     evt.currentTarget.addEventListener('mouseenter', mouseIn);
//     evt.currentTarget.addEventListener('mouseleave', mouseOut);
// }

// function mouseUp(evt) {
//     evt.currentTarget.creator.liftedKey();
//     evt.currentTarget.removeEventListener('mouseenter', mouseIn);
//     evt.currentTarget.removeEventListener('mouseleave', mouseOut);
// }
// function mouseIn(evt) {
//     evt.currentTarget.creator.pressedKey();
// }
// function mouseOut(evt) {
//     evt.currentTarget.creator.liftedKey();
// }

// testKey1.element.addEventListener('mousedown', mouseDown);
// testKey1.element.addEventListener('mouseup', mouseUp);



















// const printKeyCode = function(evt) {
//     console.log(evt.keyCode);
// }
// const printKey = function(evt) {
//     let key = evt.key;
//     let shiftDn = evt.shiftKey;
//     console.log(key, shiftDn);
// }

// const test = function(evt) {
//     let value = evt.currentTarget.value / 100;
//     console.log(value);
//     piano.masterGain.gain.value = value;
// }

// const testA = 60;
// const testB = [55, 63, 65, 71];
// const testQ = [48, 64, 72];

// const noteOrChord = function(input) {
//     return typeof input === 'number' ? 'note' :
//     typeof input === 'object' ? 'chord' : undefined;
// }

// const playNote = function(note) {
//     let tone = new Note(note);
//     tone.play();
// }

// const playChord = function(chord) {
//     chord.forEach(note => {
//         playNote(note);
//     });
// }

// const playSomething = function(input) {
//     if (noteOrChord(input) === 'note') {
//         playNote(input);
//     }
//     if (noteOrChord(input) === 'chord') {
//         playChord(input);
//     }
// }


/*
========================================================
*/



// const computerKeyboardInput = {
    
//     startingContainer: null,

//     setStartingContainer: function() {
//         this.startingContainer = this.startingKey.element.parentElement;
//     },
    
//     startingKey: null,

//     setStartingKey: function(midi) {
//         this.startingKey = piano.keys[`Key-${midi}`];
//     },

//     keyCodePairs: [
//         ['q', '2'],
//         ['w', '3'],
//         ['e', '4'],
//         ['r', '5'],
//         ['t', '6'],
//         ['y', '7'],
//         ['u', '8'],
//         ['i', '9'],
//         ['o', '0'],
//         ['p', '-'],
//         ['[', '='],
//         [']']
//     ],

//     keyContainerSubset: [],

//     activePianoKeys: [],

//     clearLabels: function() {
//         for (let key in piano.keys) {
//             let elem = piano.keys[key].element;
//             elem.innerHTML = '';
//             if (elem.hasAttribute('data-key-label')) {
//                 elem.removeAttribute('data-key-label');
//             }
//         }
//     },

//     containerPopulate: function() {
//         computerKeyboardInput.keyContainerSubset = [];
//         let currentPair = computerKeyboardInput.startingContainer;
//         let l = computerKeyboardInput.keyCodePairs.length;
//         for (let i = 0; i < l; i++) {
//             computerKeyboardInput.keyContainerSubset.push(currentPair);
//             currentPair = currentPair.nextSibling;
//         }
//     },

//     addLabels: function() {
//         computerKeyboardInput.keyCodePairs.forEach((pair, i) => {
//             pair.forEach((char, j) => {
//                 let key = computerKeyboardInput.keyContainerSubset[i].childNodes[j];
//                 if (key) {
//                     const label = document.createElement('div');
//                     label.innerText = char;
//                     key.appendChild(label);
//                     key.dataset.keyLabel = char;
//                     computerKeyboardInput.activePianoKeys.push(key);
//                 }
//             });
//         });
//     },

//     setKeyLabels: function(midiStart) {
//         computerKeyboardInput.setStartingKey(midiStart);
//         computerKeyboardInput.setStartingContainer();
//         computerKeyboardInput.clearLabels();
//         computerKeyboardInput.containerPopulate();
//         computerKeyboardInput.addLabels();
//     },

//     moveStartingContainer: function(arrow, shiftDn) {
//         computerKeyboardInput.clearLabels();
//         if (arrow === "ArrowLeft") {
//             if (shiftDn) {
//                 for (let i = 0; i < 6; i++) {
//                     computerKeyboardInput.startingContainer = computerKeyboardInput.startingContainer.previousSibling;        
//                 }
//             }
//             computerKeyboardInput.startingContainer = computerKeyboardInput.startingContainer.previousSibling;
//         }
//         if (arrow === "ArrowRight") {
//             if (shiftDn) {
//                 for (let i = 0; i < 6; i++) {
//                     computerKeyboardInput.startingContainer = computerKeyboardInput.startingContainer.nextSibling;        
//                 }
//             }
//             computerKeyboardInput.startingContainer = computerKeyboardInput.startingContainer.nextSibling;
//         }
//         computerKeyboardInput.containerPopulate();
//         computerKeyboardInput.addLabels();
//     },

//     on: function() {
//         computerKeyboardInput.setKeyLabels(60);
//         // document.addEventListener('keydown', printKey);
//         document.addEventListener('keydown', computerKeyboardInput.playTone);
//         document.addEventListener('keyup', computerKeyboardInput.stopTone);
//     },
    
//     off: function() {
//         computerKeyboardInput.clearLabels();
//         // document.removeEventListener('keydown', printKey);
//         document.removeEventListener('keydown', computerKeyboardInput.playTone);
//         document.removeEventListener('keyup', computerKeyboardInput.stopTone);
//     },

//     playTone: function(evt) {
//         let char = evt.key;
//         if (char === "ArrowLeft" || char === "ArrowRight") {
//             // console.log(char);
//             let shiftDn = evt.shiftKey;
//             computerKeyboardInput.moveStartingContainer(char, shiftDn);
//         }
//         if (evt.repeat) { return }
//         let elem = computerKeyboardInput.activePianoKeys.find(key => key.dataset.keyLabel === char);
//         if (elem) {
//             let midi = elem.dataset.midi;
//             let key = piano.keys[`Key-${midi}`];
//             // console.log(key);
//             key.pressedKey();
//         }
//     },

//     stopTone: function(evt) {
//         let char = evt.key;
//         // console.log(char);
//         let elem = computerKeyboardInput.activePianoKeys.find(key => key.dataset.keyLabel === char);
//         if (elem) {
//             let midi = elem.dataset.midi;
//             let key = piano.keys[`Key-${midi}`];
//             // console.log(key);
//             key.liftedKey();
//         }
//     }
// }



// document.body.addEventListener('keypress', printKeyCode);
// document.body.addEventListener('keypress', printKey);



// remove all innerHTML from keys
// const clearLabels = function() {
//     for (let key in piano.keys) {
//         piano.keys[key].element.innerHTML = '';
//     }
// }

// find each key container needed
// const containerPopulate = function(start) {
//     computerKeyboardInput.keyContainerSubset = [];
//     const firstPair = piano.keys[`Key-${start}`].element.parentElement;
//     let currentPair = firstPair;
//     let l = computerKeyboardInput.keyCodePairs.length;
//     for (let i = 0; i < l; i++) {
//         computerKeyboardInput.keyContainerSubset.push(currentPair);
//         currentPair = currentPair.nextSibling;
//     }
// }

// loop through each container and add content to each key found
// const addLabels = function() {
//     computerKeyboardInput.keyCodePairs.forEach((pair, i) => {
//         pair.forEach((char, j) => {
//             if (computerKeyboardInput.keyContainerSubset[i].childNodes[j]) {
//                 const label = document.createElement('div');
//                 label.innerText = char;
//                 computerKeyboardInput.keyContainerSubset[i].childNodes[j].appendChild(label);
//             }
//         });
//     });
// }

// const setKeyLabels = function(midiStart) {
//     clearLabels();
//     containerPopulate(midiStart);
//     addLabels();
// }



