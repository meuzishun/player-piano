const player = {
    tempo: null,
    tonic: null,
    meter: null,
    beatLength: null,

    setTempo: function() {
        this.tempo = Number(piano.display.controls.tempoInput.value);
    },

    setTonic: function() {
        // this.tonic = Number(piano.display.controls.tonicInput.value);
        const tonicOctave = Number(document.querySelector('#tonic-octave').value);
        const tonicLetter = Number(document.querySelector('#tonic-letter').value);
        this.tonic = ((tonicOctave + 1) * 12) + tonicLetter;
        console.log(this.tonic);
    },

    calcBeatLength: function() {
        this.beatLength = 60 / this.tempo;
    },

    totalPitchSequences: {
        major: {
            // stepwise motion from one pillar pitch to the next
            passing: [
                [-5, -3, -1, 0],
                [0, 2, 4],
                [4, 5, 7],
                [7, 9, 11, 12],
                [12, 11, 9, 7],
                [7, 5, 4],
                [4, 2, 0],
                [0, -1, -3, -5]
            ],
            // stepwise motion away from one pillar pitch and back
            neighboring: [
                [-5, -3, -5],
                [0, 2, 0],
                [4, 5, 4],
                [7, 9, 7],
                [12, 11, 12],
                [7, 5, 7],
                [4, 2, 4],
                [0, -1, 0]
            ],
            // leaps from one pillar pitch to the next closest pillar pitch and back
            arpeggiation1: [
                [-5, 0, -5],
                [0, 4, 0],
                [4, 7, 4],
                [7, 12, 7],
                [12, 7, 12],
                [7, 4, 7],
                [4, 0, 4],
                [0, -5, 0]
            ],
            // leaps from one pillar pitch to another, consecutively
            arpeggiation2: [
                [-5, 0, 4],
                [0, 4, 7],
                [4, 7, 12],
                [12, 7, 4],
                [7, 4, 0],
                [4, 0, -5]
            ],
            // leaps from one pillar pitch to another, skipping a pillar pitch but filling it in after (zig-zags)
            arpeggiation3: [
                [-5, 4, 0],
                [4, -5, 0],
                [0, 4, -5],
                [0, -5, 4]
                [0, 7, 4],
                [7, 0, 4],
                [4, 7, 0],
                [4, 0, 7],
                [4, 12, 7],
                [12, 4, 7],
                [7, 12, 4],
                [7, 4, 12]
            ],
            // leaps from one pillar pitch to the next closest but missing by one step then correcting
            appoggiatura1: [
                [-5, -1, 0],
                [-5, 2, 0],
                [0, 5, 4],
                [4, 9, 7],
                [7, 11, 12],
                [12, 9, 7],
                [12, 5, 7],
                [7, 2, 4],
                [4, -1, 0],
                [0, -3, -5]
            ],
            // leaps from one pillar pitch to another (2 away) but missing by one step then correcting
            appoggiatura2: [
                [-5, 2, 4],
                [-5, 5, 4],
                [0, 5, 7],
                [0, 9, 7],
                [4, 11, 12],
                [12, 5, 4],
                [12, 2, 4],
                [7, 2, 0],
                [7, -1, 0],
                [4, -3, -5]
            ]
        },
        minor: {
            // stepwise motion from one pillar pitch to the next
            passing: [
                [-5, -3, -1, 0],
                [0, 2, 3],
                [3, 5, 7],
                [7, 9, 11, 12],
                [12, 10, 8, 7],
                [7, 5, 3],
                [3, 2, 0],
                [0, -2, -4, -5]
            ],
            // stepwise motion away from one pillar pitch and back
            neighboring: [
                [-5, -4, -5],
                [0, 2, 0],
                [3, 5, 3],
                [7, 8, 7],
                [12, 11, 12],
                [7, 5, 7],
                [3, 2, 3],
                [0, -1, 0]
            ],
            // leaps from one pillar pitch to the next closest pillar pitch and back
            arpeggiation1: [
                [-5, 0, -5],
                [0, 3, 0],
                [3, 7, 3],
                [7, 12, 7],
                [12, 7, 12],
                [7, 3, 7],
                [3, 0, 3],
                [0, -5, 0]
            ],
            // leaps from one pillar pitch to another, consecutively
            arpeggiation2: [
                [-5, 0, 3],
                [0, 3, 7],
                [3, 7, 12],
                [12, 7, 3],
                [7, 3, 0],
                [3, 0, -5]
            ],
            // leaps from one pillar pitch to another, skipping a pillar pitch but filling it in after (zig-zags)
            arpeggiation3: [
                [-5, 3, 0],
                [3, -5, 0],
                [0, 3, -5],
                [0, -5, 3]
                [0, 7, 3],
                [7, 0, 3],
                [3, 7, 0],
                [3, 0, 7],
                [3, 12, 7],
                [12, 3, 7],
                [7, 12, 3],
                [7, 3, 12]
            ],
            // leaps from one pillar pitch to the next closest but missing by one step then correcting
            appoggiatura1: [
                [-5, -1, 0],
                [-5, 2, 0],
                [0, 5, 3],
                [3, 8, 7],
                [7, 11, 12],
                [12, 8, 7],
                [12, 5, 7],
                [7, 2, 3],
                [3, -1, 0],
                [0, -4, -5]
            ],
            // leaps from one pillar pitch to another (2 away) but missing by one step then correcting
            appoggiatura2: [
                [-5, 2, 3],
                [-5, 5, 3],
                [0, 5, 7],
                [0, 8, 7],
                [3, 11, 12],
                [12, 5, 3],
                [12, 2, 3],
                [7, 2, 0],
                [7, -1, 0],
                [3, -4, -5]
            ]
        }
    },

    possiblePitchSequences: [],

    currentGesture: null,

    userGuess: [],

    addPossibleSequence: function(mode, type) {
        let newSequences = this.totalPitchSequences[mode][type];
        newSequences.forEach(sequence => this.possiblePitchSequences.push(sequence));
    },
    
    removePossibleSequence: function(mode, type) {
        let sequencesToRemove = this.totalPitchSequences[mode][type];
        sequencesToRemove.forEach(sequence => {
            let index = this.possiblePitchSequences.indexOf(sequence);
            if (index > -1) {
                this.possiblePitchSequences.splice(index, 1);
            }
        });
    },

    findGestureDuration: function() {
        return this.currentGesture.durationSequence.reduce((a, b) => a + b) * 1000 * this.beatLength;
    },

    chooseRandomSequence: function() {
        const total = this.possiblePitchSequences.length;
        const randomIndex = Math.floor(Math.random() * total);
        return this.possiblePitchSequences[randomIndex];
    },

    transposeSequence: function(sequence) {
        let transposed = sequence.map(pitch => pitch + player.tonic);
        return transposed;
    },

    hideFeedback: function() {
        for (const answer of piano.display.feedback.answers) {
            for (const i of answer.children) {
                i.classList.add('hidden');
            }
            answer.classList.add('hidden');
            // const answers = part.children;
            // for (const answer of answers) {
            //     answer.classList.add('hidden');
            // }
            // part.classList.add('hidden');
        }
    },

    unhideFeedback: function(num) {

        for (let i = 0, l = num; i < l; i++) {
            piano.display.feedback.answers[i].classList.remove('hidden');
        }
    },
    
    playRandomGesture: function() {
        this.setTempo();
        this.setTonic();
        this.calcBeatLength();
        const randomSequence = this.chooseRandomSequence();
        const sequenceLength = randomSequence.length;
        this.hideFeedback();
        this.unhideFeedback(sequenceLength);
        const transposedSequence = this.transposeSequence(randomSequence);
        this.currentGesture = new Gesture(transposedSequence);
        // console.log(this.currentGesture);
        let duration = this.findGestureDuration();
        this.currentGesture.play();
        const playBtnTimer = setTimeout(function() {
            control.playToggle();
            control.recordToggle();
            clearTimeout(playBtnTimer);
        }, duration);
    }
}

class Sequence {
    constructor(pitchSequence, beatSequence, durationSequence) {
        this.pitchSequence = pitchSequence;
        this.beatSequence = beatSequence;
        this.durationSequence = durationSequence;
    }
    
    play() {
        const now = piano.audioCtx.currentTime;
        for (let i = 0, l = this.pitchSequence.length; i < l; i++) {
            // let midi = this.pitchSequence[i] + player.tonic;
            let midi = this.pitchSequence[i];
            // let note = new Note(midi);
            let key = piano.keys[`Key-${midi}`];
            let startTime = ((this.beatSequence[i] - 1) * player.beatLength) + now;
            let stopTime = (this.durationSequence[i] * player.beatLength) + startTime;
            // note.play(startTime);
            key.pressedKey(startTime);
            // note.stop(stopTime);
            key.liftedKey(stopTime);
        }
    }
}

class Gesture extends Sequence {
    constructor(pitchSequence) {
        super(pitchSequence);
        this.beatSequence = this.determineBeatSeq();
        this.durationSequence = this.determineDurationSeq();
    }

    determineBeatSeq() {
        return this.pitchSequence.length === 3 ? [1, 2, 3] :
        this.pitchSequence.length === 4 ? [1, 2, 2.5, 3] :
        undefined;
    }

    determineDurationSeq() {
        return this.pitchSequence.length === 3 ? [1, 1, 2] :
        this.pitchSequence.length === 4 ? [1, 0.5, 0.5, 2] :
        undefined;
    }
}

// player.tempo = 72;
// player.tonic = 60;
// player.calcBeatLength();

// player.addPossibleSequence('major', 'neighboring');
// player.addPossibleSequence('major', 'passing');
// player.addPossibleSequence('major', 'arpeggiation1');
// player.addPossibleSequence('major', 'arpeggiation2');
// player.addPossibleSequence('major', 'arpeggiation3');
// player.addPossibleSequence('major', 'appoggiatura1');
// player.addPossibleSequence('major', 'appoggiatura2');

// player.addPossibleSequence('minor', 'neighboring');
// player.addPossibleSequence('minor', 'passing');
// player.addPossibleSequence('minor', 'arpeggiation1');
// player.addPossibleSequence('minor', 'arpeggiation2');
// player.addPossibleSequence('minor', 'arpeggiation3');
// player.addPossibleSequence('minor', 'appoggiatura1');
// player.addPossibleSequence('minor', 'appoggiatura2');


/*
const totalPitchSequences = {
    major: {
        // stepwise motion from one pillar pitch to the next
        passing: [
            [-5, -3, -1, 0],
            [0, 2, 4],
            [4, 5, 7],
            [7, 9, 11, 12],
            [12, 11, 9, 7],
            [7, 5, 4],
            [4, 2, 0],
            [0, -1, -3, -5]
        ],
        // stepwise motion away from one pillar pitch and back
        neighboring: [
            [-5, -3, -5],
            [0, 2, 0],
            [4, 5, 4],
            [7, 9, 7],
            [12, 11, 12],
            [7, 5, 7],
            [4, 2, 4],
            [0, -1, 0]
        ],
        // leaps from one pillar pitch to the next closest pillar pitch and back
        arpeggiation1: [
            [-5, 0, -5],
            [0, 4, 0],
            [4, 7, 4],
            [7, 12, 7],
            [12, 7, 12],
            [7, 4, 7],
            [4, 0, 4],
            [0, -5, 0]
        ],
        // leaps from one pillar pitch to another, consecutively
        arpeggiation2: [
            [-5, 0, 4],
            [0, 4, 7],
            [4, 7, 12],
            [12, 7, 4],
            [7, 4, 0],
            [4, 0, -5]
        ],
        // leaps from one pillar pitch to another, skipping a pillar pitch but filling it in after (zig-zags)
        arpeggiation3: [
            [-5, 4, 0],
            [4, -5, 0],
            [0, 4, -5],
            [0, -5, 4]
            [0, 7, 4],
            [7, 0, 4],
            [4, 7, 0],
            [4, 0, 7],
            [4, 12, 7],
            [12, 4, 7],
            [7, 12, 4],
            [7, 4, 12]
        ],
        // leaps from one pillar pitch to the next closest but missing by one step then correcting
        appoggiatura1: [
            [-5, -1, 0],
            [-5, 2, 0],
            [0, 5, 4],
            [4, 9, 7],
            [7, 11, 12],
            [12, 9, 7],
            [12, 5, 7],
            [7, 2, 4],
            [4, -1, 0],
            [0, -3, -5]
        ],
        // leaps from one pillar pitch to another (2 away) but missing by one step then correcting
        appoggiatura2: [
            [-5, 2, 4],
            [-5, 5, 4],
            [0, 5, 7],
            [0, 9, 7],
            [4, 11, 12],
            [12, 5, 4],
            [12, 2, 4],
            [7, 2, 0],
            [7, -1, 0],
            [4, -3, -5]
        ]
    },
    minor: {
        // stepwise motion from one pillar pitch to the next
        passing: [
            [-5, -3, -1, 0],
            [0, 2, 3],
            [3, 5, 7],
            [7, 9, 11, 12],
            [12, 10, 8, 7],
            [7, 5, 3],
            [3, 2, 0],
            [0, -2, -4, -5]
        ],
        // stepwise motion away from one pillar pitch and back
        neighboring: [
            [-5, -4, -5],
            [0, 2, 0],
            [3, 5, 3],
            [7, 8, 7],
            [12, 11, 12],
            [7, 5, 7],
            [3, 2, 3],
            [0, -1, 0]
        ],
        // leaps from one pillar pitch to the next closest pillar pitch and back
        arpeggiation1: [
            [-5, 0, -5],
            [0, 3, 0],
            [3, 7, 3],
            [7, 12, 7],
            [12, 7, 12],
            [7, 3, 7],
            [3, 0, 3],
            [0, -5, 0]
        ],
        // leaps from one pillar pitch to another, consecutively
        arpeggiation2: [
            [-5, 0, 3],
            [0, 3, 7],
            [3, 7, 12],
            [12, 7, 3],
            [7, 3, 0],
            [3, 0, -5]
        ],
        // leaps from one pillar pitch to another, skipping a pillar pitch but filling it in after (zig-zags)
        arpeggiation3: [
            [-5, 3, 0],
            [3, -5, 0],
            [0, 3, -5],
            [0, -5, 3]
            [0, 7, 3],
            [7, 0, 3],
            [3, 7, 0],
            [3, 0, 7],
            [3, 12, 7],
            [12, 3, 7],
            [7, 12, 3],
            [7, 3, 12]
        ],
        // leaps from one pillar pitch to the next closest but missing by one step then correcting
        appoggiatura1: [
            [-5, -1, 0],
            [-5, 2, 0],
            [0, 5, 3],
            [3, 8, 7],
            [7, 11, 12],
            [12, 8, 7],
            [12, 5, 7],
            [7, 2, 3],
            [3, -1, 0],
            [0, -4, -5]
        ],
        // leaps from one pillar pitch to another (2 away) but missing by one step then correcting
        appoggiatura2: [
            [-5, 2, 3],
            [-5, 5, 3],
            [0, 5, 7],
            [0, 8, 7],
            [3, 11, 12],
            [12, 5, 3],
            [12, 2, 3],
            [7, 2, 0],
            [7, -1, 0],
            [3, -4, -5]
        ]
    }
}

let possiblePitchSequences = [];

const arrayMatch = function(arr1, arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    if (len1 !== len2) {
        return false;
    }
    for (let i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

const addPossibleSequence = function(mode, type) {
    let newSequences = totalPitchSequences[mode][type];
    newSequences.forEach(sequence => possiblePitchSequences.push(sequence));
}

const removePossibleSequence = function(mode, type) {
    let sequencesToRemove = totalPitchSequences[mode][type];
    sequencesToRemove.forEach(sequence => {
        let index = possiblePitchSequences.indexOf(sequence);
        if (index > -1) {
            possiblePitchSequences.splice(index, 1);
        }
    });
}

const chooseRandomSequence = function() {
    const total = possiblePitchSequences.length;
    const randomIndex = Math.floor(Math.random() * total);
    return possiblePitchSequences[randomIndex];
}

const playRandomGesture = function() {
    const randomSequence = chooseRandomSequence();
    const gesture = new Gesture(randomSequence);
    gesture.play();
}
*/





// class Player {
//     constructor(tempo, tonic) {
//         this.tempo = tempo;
//         this.tonic = tonic;
//         this.beatLength = this.calcBeatLength();
//     }

//     calcBeatLength() {
//         return 60 / this.tempo;
//     }
// }


// class Sequence extends Player {
//     constructor(tempo, tonic, pitchSequence, beatSequence, durationSequence) {
//         super(tempo, tonic);
//         this.pitchSequence = pitchSequence;
//         this.beatSequence = beatSequence;
//         this.durationSequence = durationSequence;
//     }
    
//     play() {
//         const now = piano.audioCtx.currentTime;
//         for (let i = 0, l = this.pitchSequence.length; i < l; i++) {
//             let midi = this.pitchSequence[i] + this.tonic;
//             let note = new Note(midi);
//             let startTime = ((this.beatSequence[i] - 1) * this.beatLength) + now;
//             let stopTime = ((this.durationSequence[i]) * this.beatLength) + startTime;
//             note.play(startTime);
//             note.stop(stopTime);
//         }
//     }
// }




// const playNoteInTime = function(midi, beatStart, duration) {
//     const now = piano.audioCtx.currentTime;
//     const startTime = now + (beatStart * player.beatLength);
//     const endTime = startTime + (duration * player.beatLength);

//     let note = new Note(midi);
//     note.play(startTime);
//     note.stop(endTime);
// }

// let testSeq = new Gesture([0, 2, 5]);