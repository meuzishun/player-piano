const interface = {
    activateMouse: function() {
        piano.display.keyElements.forEach(function(key) {
            key.addEventListener('mousedown', control.pressedPianoKey);
        });
        piano.display.keyboard.addEventListener('mousedown', interface.heldMouse);
        document.body.addEventListener('mouseup', interface.releasedMouse);
        piano.display.controls.powerBtn.addEventListener('click', control.powerToggle);
        piano.display.controls.volumeSldr.addEventListener('change', control.volumeChange);
        piano.display.controls.playBtn.addEventListener('click', control.playToggle);
        piano.display.controls.recordBtn.addEventListener('click', control.recordToggle);
        piano.display.controls.keyboardBtn.addEventListener('click', control.keyboardToggle);
    },

    heldMouse: function() {
        piano.display.keyElements.forEach(function(key) {
            key.addEventListener('mouseenter', control.pressedPianoKey);
            key.addEventListener('mouseleave', control.liftedPianoKey);
        });
    },
    
    releasedMouse: function() {
        piano.display.keyElements.forEach(function(key) {
            key.removeEventListener('mouseenter', control.pressedPianoKey);
            key.removeEventListener('mouseleave', control.liftedPianoKey);
        });
    }
}

piano.display.controls.gestureBoxes.forEach(box => {
    box.addEventListener('input', (e) => {
        // console.log(e);
        // console.log(e.currentTarget);
        // console.log(e.currentTarget.checked);
        // player.possiblePitchSequences.push()
        console.clear();
        player.possiblePitchSequences = [];
        piano.display.controls.gestureBoxes.forEach(box => {
            if (box.checked) {
                // console.log(box.dataset.mode, box.dataset.gesture);
                // player.possiblePitchSequences.push(box);
                // console.log(player.totalPitchSequences[box.dataset.mode][box.dataset.gesture]);
                player.possiblePitchSequences.push(...player.totalPitchSequences[box.dataset.mode][box.dataset.gesture]);
                console.log(player.possiblePitchSequences);
            };
        });
    });
});

const computerKeyboardInput = {
    startingContainer: null,
    setStartingContainer: function() {
        this.startingContainer = this.startingKey.element.parentElement;
    },
    
    startingKey: null,
    setStartingKey: function(midi) {
        this.startingKey = piano.keys[`Key-${midi}`];
    },

    keyCodePairs: [
        ['q', '2'],
        ['w', '3'],
        ['e', '4'],
        ['r', '5'],
        ['t', '6'],
        ['y', '7'],
        ['u', '8'],
        ['i', '9'],
        ['o', '0'],
        ['p', '-'],
        ['[', '='],
        [']']
    ],

    keyContainerSubset: [],

    activePianoKeys: [],

    clearLabels: function() {
        for (let key in piano.keys) {
            let elem = piano.keys[key].element;
            elem.innerHTML = '';
            if (elem.hasAttribute('data-key-label')) {
                elem.removeAttribute('data-key-label');
            }
        }
    },

    containerPopulate: function() {
        this.keyContainerSubset = [];
        let currentPair = this.startingContainer;
        let l = this.keyCodePairs.length;
        for (let i = 0; i < l; i++) {
            this.keyContainerSubset.push(currentPair);
            currentPair = currentPair.nextSibling;
        }
    },

    addLabels: function() {
        this.keyCodePairs.forEach((pair, i) => {
            pair.forEach((char, j) => {
                let key = this.keyContainerSubset[i].childNodes[j];
                if (key) {
                    const label = document.createElement('div');
                    label.innerText = char;
                    key.appendChild(label);
                    key.dataset.keyLabel = char;
                    this.activePianoKeys.push(key);
                }
            });
        });
    },

    setKeyLabels: function(midiStart) {
        this.setStartingKey(midiStart);
        this.setStartingContainer();
        this.clearLabels();
        this.containerPopulate();
        this.addLabels();
    },

    moveStartingContainer: function(arrow, shiftDn) {
        this.clearLabels();
        if (arrow === "ArrowLeft") {
            if (shiftDn) {
                for (let i = 0; i < 6; i++) {
                    this.startingContainer = this.startingContainer.previousSibling;        
                }
            }
            this.startingContainer = this.startingContainer.previousSibling;
        }
        if (arrow === "ArrowRight") {
            if (shiftDn) {
                for (let i = 0; i < 6; i++) {
                    this.startingContainer = this.startingContainer.nextSibling;        
                }
            }
            this.startingContainer = this.startingContainer.nextSibling;
        }
        this.containerPopulate();
        this.addLabels();
    },

    on: function() {
        this.setKeyLabels(60);
        document.addEventListener('keydown', control.keyboardPressed);
        document.addEventListener('keyup', control.keyboardLifted);
    },
    
    off: function() {
        this.clearLabels();
        document.removeEventListener('keydown', control.keyboardPressed);
        document.removeEventListener('keyup', control.keyboardLifted);
    }
}

const user = {
    input: [],
    clearInput: function() {
        this.input = [];
        player.hideFeedback();
    },
    checkInput: function() {
        this.input.forEach((midi, i) => {
            if (midi === player.currentGesture.pitchSequence[i]) {
                console.log(`Answer ${i + 1} is correct!`);
                piano.display.feedback.answers[i].querySelector('.correct').classList.remove('hidden');
            } else {
                console.log(`Answer ${i + 1} is wrong...`);
                piano.display.feedback.answers[i].querySelector('.wrong').classList.remove('hidden');
            };
        });
        if (this.input.length === player.currentGesture.pitchSequence.length) {
            const timeToRelish = setTimeout(function() {
                control.recordToggle();
                user.clearInput();
                clearTimeout(timeToRelish);
            }, 1500);
        }
    },
    inputListener: false,
}