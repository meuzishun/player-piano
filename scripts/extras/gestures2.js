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
      [0, -1, -3, -5],
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
      [0, -1, 0],
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
      [0, -5, 0],
    ],
    // leaps from one pillar pitch to another, consecutively
    arpeggiation2: [
      [-5, 0, 4],
      [0, 4, 7],
      [4, 7, 12],
      [12, 7, 4],
      [7, 4, 0],
      [4, 0, -5],
    ],
    // leaps from one pillar pitch to another, skipping a pillar pitch but filling it in after (zig-zags)
    arpeggiation3: [
      [-5, 4, 0],
      [4, -5, 0],
      [0, 4, -5],
      [0, -5, 4][(0, 7, 4)],
      [7, 0, 4],
      [4, 7, 0],
      [4, 0, 7],
      [4, 12, 7],
      [12, 4, 7],
      [7, 12, 4],
      [7, 4, 12],
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
      [0, -3, -5],
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
      [4, -3, -5],
    ],
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
      [0, -2, -4, -5],
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
      [0, -1, 0],
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
      [0, -5, 0],
    ],
    // leaps from one pillar pitch to another, consecutively
    arpeggiation2: [
      [-5, 0, 3],
      [0, 3, 7],
      [3, 7, 12],
      [12, 7, 3],
      [7, 3, 0],
      [3, 0, -5],
    ],
    // leaps from one pillar pitch to another, skipping a pillar pitch but filling it in after (zig-zags)
    arpeggiation3: [
      [-5, 3, 0],
      [3, -5, 0],
      [0, 3, -5],
      [0, -5, 3][(0, 7, 3)],
      [7, 0, 3],
      [3, 7, 0],
      [3, 0, 7],
      [3, 12, 7],
      [12, 3, 7],
      [7, 12, 3],
      [7, 3, 12],
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
      [0, -4, -5],
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
      [3, -4, -5],
    ],
  },
};

let possiblePitchSequences = [];

const arrayMatch = function (arr1, arr2) {
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
};

const addPossibleSequence = function (mode, type) {
  let newSequences = totalPitchSequences[mode][type];
  newSequences.forEach((sequence) => possiblePitchSequences.push(sequence));
};

const removePossibleSequence = function (mode, type) {
  let sequencesToRemove = totalPitchSequences[mode][type];
  sequencesToRemove.forEach((sequence) => {
    let index = possiblePitchSequences.indexOf(sequence);
    if (index > -1) {
      possiblePitchSequences.splice(index, 1);
    }
  });
};

const chooseRandomSequence = function () {
  const total = possiblePitchSequences.length;
  const randomIndex = Math.floor(Math.random() * total);
  return possiblePitchSequences[randomIndex];
};

const playRandomGesture = function () {
  const randomSequence = chooseRandomSequence();
  const gesture = new Gesture(randomSequence);
  gesture.play();
};

// const addPossibleGestures = function(mode, type) {
//     console.log(`Possible gestures are: `);
//     possibleGestures.forEach(item => console.log(item));

//     let newGests = totalGestures[mode][type];
//     console.log(`Adding gestures: `);
//     newGests.forEach(item => console.log(item));
//     newGests.forEach(gest => possibleGestures.push(gest));

//     console.log(`Possible gestures are now: `);
//     possibleGestures.forEach(item => console.log(item));
// }

/*
//! Still have an issue here: if major:neighboring and minor:neighboring have both been selected, and one is deselected, gestures common to both lists will disappear
const removePossibleGestures = function(mode, type) {
    // console.log(`Possible gestures are: `);
    // possibleGestures.forEach(item => console.log(item));
    // console.log('===========================');
    
    let newPossibleGestures = [];
    let cutGests = totalGestures[mode][type];
    console.log(`Gestures to cut: `);
    cutGests.forEach(item => console.log(item));
    console.log('===========================');
    
    // let newGestureList = possibleGestures.filter(gesture => {
    //     // console.log(`Starting with ${gesture}...`);
    //     for (item of cutGests) {
    //         // console.log(`Comparing ${gesture} to ${item}`);
    //         if (arrayMatch(gesture, item) === true) {
    //             // console.log(`We gotta a match!`);
    //             // console.log('---');
    //             return false;
    //         } else {
    //             // console.log('no match...');
    //             // console.log('---');
    //         }
    //     }
    //     return true;
    // });

    cutGests.forEach(gestureToCut => {
        let index = possibleGestures.indexOf(gestureToCut);
        if (index > -1) {
            possibleGestures.splice(index, 1);
        }
    });

    // console.log(`New gesture list is: `);
    // newGestureList.forEach(item => console.log(item));
    // console.log(`Possible gestures are now: `);
    // possibleGestures = [];
    // possibleGestures = [...newGestureList];
    // possibleGestures = [...newPossibleGestures];
    // console.log(`Possible gesture list is now: `);
    // possibleGestures.forEach(item => console.log(item));
}
*/

/*
const major = [-5, -3, -1, 0, 2, 4, 5, 7, 9, 11, 12];
const minor = [-5, [-4, -3], [-2, -1], 0, 2, 3, 5, 7, [8, 9], [10, 11], 12];
const nodes = {
    low_sol: 0,
    tonic: 3,
    mediant: 5,
    dominant: 7,
    high_tonic: 10
};

function createGesture(scale, startingNode, endingNode) {
    let gesture = [];
    for (let i = nodes[startingNode], l = nodes[endingNode]; i <= l; i++) {
        // if (scale[i].length === 2) {
        //     console.log('option!');
        //     if () {}
        // }
        gesture.push(scale[i]);
    }
    return gesture;
}
*/

// let test1 = createGesture(minor, 'low_sol', 'tonic');
// console.log(nodes['mediant']);
