/*

function transposeNote(midi, interval) {
    return midi + interval;
}

function transposeSequence(sequence, interval) {
    return sequence.map(note => transposeNote(note, interval));
}

function transposeChord(chord, interval) {
    return chord.map(note => transposeNote(note, interval));
}

function transposeChordProgression(progression, interval) {
    return progression.map(chord => transposeChord(chord, interval));
}

let majorScale = [0, 2, 4, 5, 7, 9, 11, 12];
let naturalMinorScale = [0, 2, 3, 5, 7, 8, 10, 12];
let harmonicMinorScale = [0, 2, 3, 5, 7, 8, 11, 12];
let melodicMinorScale = [0, 2, 3, 5, 7, 9, 11, 12];

function createEnvironment(scale) {
    lowerTetra = scale.slice(-4, -1).map(pitch => pitch -12).concat(scale);
    return lowerTetra;
}

function splitIntoRegions(environment) {
    return {
        lowerTetra: environment.slice(0, 4),
        firstThree: environment.slice(3, 6),
        restOfPenta: environment.slice(5, 8),
        upperTetra: environment.slice(7, 12)
    };
}

// const gestures = {
//     major: {
//         firstThree = {
//             passing: [
//                 [0, 2, 4],
//                 [4, 2, 0]
//             ],
//             neighboring: [
//                 [0, 2, 0],
//                 [4, 2, 4],
//             ],
//             arpeggiation: [
//                 [0, 4, 0],
//                 [4, 0, 4]
//             ],
//             // appoggiatura: []
//         },
//         restOfPenta = {
//             passing: [
//                 [4, 5, 7],
//                 [7, 5, 4]
//             ],
//             neighboring: [
//                 [4, 5, 4],
//                 [7, 5, 7]
//             ],
//             arpeggiation: [
//                 [4, 7, 4],
//                 [7, 4, 7]
//             ],
//             // appoggiatura: []
//         },
//         lowerTetra = {
//             passing: [
//                 [-5, -3, -1, 0],
//                 [0, -1, -3, -5]
//             ],
//             neighboring: [
//                 [-5, -3, -5],
//                 [0, -1, 0]
//             ],
//             arpeggiation: [
//                 [-5, 0, -5],
//                 [0, -5, 0]
//             ],
//             // appoggiatura: []
//         },
//         upperTetra = {
//             passing: [
//                 [7, 9, 11, 12],
//                 [12, 11, 9, 7]
//             ],
//             neighboring: [
//                 [7, 9, 7],
//                 [12, 11, 12]
//             ],
//             arpeggiation: [
//                 [7, 12, 7],
//                 [12, 7, 12]
//             ],
//             // appoggiatura: []
//         }
//     },
//     minor: {
//         firstThree = {
//             passing: [
//                 [0, 2, 3],
//                 [3, 2, 0]
//             ],
//             neighboring: [
//                 [0, 2, 0],
//                 [3, 2, 3],
//             ],
//             arpeggiation: [
//                 [0, 3, 0],
//                 [3, 0, 3]
//             ],
//             // appoggiatura: []
//         },
//         restOfPenta = {
//             passing: [
//                 [3, 5, 7],
//                 [7, 5, 3]
//             ],
//             neighboring: [
//                 [3, 5, 3],
//                 [7, 5, 7]
//             ],
//             arpeggiation: [
//                 [3, 7, 3],
//                 [7, 3, 7]
//             ],
//             // appoggiatura: []
//         },
//         lowerTetra = {
//             passing: [
//                 [-5, -3, -1, 0],
//                 [0, -2, -4, -5]
//             ],
//             neighboring: [
//                 [-5, -4, -5],
//                 [0, -1, 0]
//             ],
//             arpeggiation: [
//                 [-5, 0, -5],
//                 [0, -5, 0]
//             ],
//             // appoggiatura: []
//         },
//         upperTetra = {
//             passing: [
//                 [7, 9, 11, 12],
//                 [12, 10, 8, 7]
//             ],
//             neighboring: [
//                 [7, 8, 7],
//                 [12, 11, 12]
//             ],
//             arpeggiation: [
//                 [7, 12, 7],
//                 [12, 7, 12]
//             ],
//             // appoggiatura: []
//         }
//     }
// }


let minor2nd = [0, 1];
let major2nd = [0, 2];
let minor3rd = [0, 3];
let major3rd = [0, 4];
let perfect4th = [0, 5];
let tritone = [0, 6];
let perfect5th = [0, 7];
let minor6th = [0, 8];
let major6th = [0, 9];
let minor7th = [0, 10];
let major7th = [0, 11];
let perfect8ve = [0, 12];

let majorTriad = [0, 4, 7];
let minorTriad = [0, 3, 7];
let diminishedTriad = [0, 3, 6];
let augmentedTriad = [0, 4, 8];

let tonic = 60;

let C_majorScale = transposeSequence(majorScale, tonic);

let C_majorTriad = transposeChord(majorTriad, tonic);

let beethoven = [76, 75, 76, 75, 76, 71, 74, 72, [69, 45], 52, 57, 60, 64, 69, [71, 40], 52, 56, 64, 68, 71, [72, 45], 52, 57, 64, 76, 75, 76, 75, 76, 71, 74, 72, [69, 45], 52, 57, 60, 64, 69, [71, 40], 52, 56, 64, 72, 71, [69, 45], 52, 57];

// const simon = setTimeout(() => {
//     piano.play.sequence(beethoven, 300);
//     clearTimeout(simon);
// }, 10000);

// function zipperArrays() {
    // let longest;
    // for (let i = 0, l = arguments.length; i < l; i++) {
    //     longest = 
    // }
    // console.log(arguments);
    // let argumentsArray = [];
    // for (arg of arguments) {
        // console.log(arg);
        // argumentsArray.push(arg);
    // }
    // console.log(argumentsArray);

    // let i = argumentsArray.length;
    // let j;
    // for (j = 0; j <)
// }

// zipperArrays([1, 2, 3], ['a', 'b', 'c']);

let pitches = [60, 62, 64, 65, 67, 69, 71, 72];
let bars = [1, 1, 1, 1, 1, 2, 2, 2]
let beats = [1, 2, 2.5, 3.5, 4];
let durations = [1, 0.5];

function zipper_arrays() {
    const argsAsArrays = Object.values(arguments);
    const lengths = argsAsArrays.map(array => array.length);
    const longest = Math.max(...lengths);

    let zippedArrays = [];
    for (let i = 0; i < longest; i++) {
        let newComb = [];
        argsAsArrays.forEach(array => newComb.push(array[i % array.length]));
        zippedArrays.push(newComb);
    }

    return zippedArrays;
}

let notes = zipper_arrays(C_majorScale, durations, bars, beats);
// console.log(notes);

// player.play.sequence(notes);

let bar1pitches = [60, 63, 67, 71];
let bar1durations = [1.5, .5, 1, 2];
let bar1rhythm = [1, 2.5, 3, 4];
let bar1bar = [1];

let bar1 = zipper_arrays(bar1pitches, bar1durations, bar1bar, bar1rhythm);

// console.log(bar1);

*/


// const majorScale = [0, 2, 4, 5, 7, 9, 11, 12];

// const minorScale = [0, 2, 3, 5, 7, 8, 10, 12];

// function scaleDegree(mode, degree, tonic) {
//     return mode[degree - 1] + tonic;
// }

// console.log(scaleDegree(majorScale, 3, 62));



// establish major scale
// establist ascending melodic minor scale
// add descending version to the end (gonna take some though with melodic minor)
// extend start and ends with tetrachords
// create gestures based on reading through these new long arrays at various points (base on melodic minor since it is the one that changes)

// let majorScale = [0, 2, 4, 5, 7, 9, 11, 12];
// let melodicMinorScale = [...majorScale];
// melodicMinorScale.splice(2, 1, 3);

// let majorScaleReverse = [...majorScale].reverse();
// majorScale.splice(majorScale.length - 1, 1, ...majorScaleReverse);

// console.log(majorScale);
// console.log(majorScaleReverse);

// console.log(melodicMinorScale);

const major = [-5, -3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0, -1, -3, -5];
const minor = [-5, -3, -1, 0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0, -2, -4, -5];
const nodes = [0, 3, 5, 7, 10, 13, 15, 17, 20];

const passingGesture = function(environment, startingNode) {
    return environment.slice(nodes[startingNode], nodes[startingNode + 1] + 1);
}

const neighboringGesture = function(environment, startingNode) {
    return [
        environment[nodes[startingNode + 1]], environment[nodes[startingNode + 1] - 1], environment[nodes[startingNode + 1]]
    ];
}

const arpeggiationGesture1 = function(environment, startingNode) {
    return [
        environment[nodes[startingNode]], environment[nodes[startingNode + 1]], environment[nodes[startingNode]]
    ];
}

const arpeggiationGesture2 = function(environment, startingNode) {
    return [
        environment[nodes[startingNode]], environment[nodes[startingNode + 1]], environment[nodes[startingNode + 2]]
    ];
}

const arpeggiationGesture3 = function(environment, startingNode) {
    return [
        environment[nodes[startingNode]], environment[nodes[startingNode + 2]], environment[nodes[startingNode + 1]]
    ];
}

const appoggiaturaGesture = function(environment, startingNode) {
    return [
        environment[nodes[startingNode]], environment[nodes[startingNode + 1] + 1], environment[nodes[startingNode + 1]]
    ]
}

let possibleGestures = [];

function populate(func, mode, num) {
    for (let i = 0; i < num; i++) {
        possibleGestures.push(func(mode, i));
    }
}

populate(arpeggiationGesture3, major, 7);

console.log(possibleGestures);
// let result = passingGesture(minor, 7);
// let result = neighboringGesture(minor, 5);
// let result = arpeggiationGesture(major, 2);

// possibleGestures.push(passingGesture(minor, 0));
// possibleGestures.push(passingGesture(minor, 1));
// possibleGestures.push(passingGesture(minor, 2));
// possibleGestures.push(passingGesture(minor, 3));
// possibleGestures.push(passingGesture(minor, 4));
// possibleGestures.push(passingGesture(minor, 5));
// possibleGestures.push(passingGesture(minor, 6));
// possibleGestures.push(passingGesture(minor, 7));

// possibleGestures.push(neighboringGesture(major, 0));
// possibleGestures.push(neighboringGesture(major, 1));
// possibleGestures.push(neighboringGesture(major, 2));
// possibleGestures.push(neighboringGesture(major, 3));
// possibleGestures.push(neighboringGesture(major, 4));
// possibleGestures.push(neighboringGesture(major, 5));
// possibleGestures.push(neighboringGesture(major, 6));
// possibleGestures.push(neighboringGesture(major, 7));

// possibleGestures.push(arpeggiationGesture(minor, 0));
// possibleGestures.push(arpeggiationGesture(minor, 1));
// possibleGestures.push(arpeggiationGesture(minor, 2));
// possibleGestures.push(arpeggiationGesture(minor, 3));
// possibleGestures.push(arpeggiationGesture(minor, 4));
// possibleGestures.push(arpeggiationGesture(minor, 5));
// possibleGestures.push(arpeggiationGesture(minor, 6));
// possibleGestures.push(arpeggiationGesture(minor, 7));




// function pillarPitches(scale) {
//     let arr = [];
//     for (let i = 0, l = scale.length; i < l; i++) {
//         if (nodes.includes(i)) {
//             arr.push(scale[i]);
//         }
//     }
//     return arr;
// }



// function passingUpperTetra(scale) {
//     const passingUpperTetra = {
//         ascending: scale.slice(7, 11),
//         descending: scale.slice(10, 14)
//     }
//     return passingUpperTetra;
// }

// function neighboringUpperTetra(scale) {
//     const neighboringUpperTetra = {
//         ascending: [scale[10], scale[9], scale[10]],
//         descending: [scale[13], scale[12], scale[13]]
//     }
//     return neighboringUpperTetra;
// }

// console.log(passingUpperTetra(majorScale));
// console.log(passingUpperTetra(melodicMinorScale));
// console.log(neighboringUpperTetra(majorScale));
// console.log(neighboringUpperTetra(melodicMinorScale));