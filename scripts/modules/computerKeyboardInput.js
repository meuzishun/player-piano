// import { score } from '../modules/score.js';

const pressPianoKey = function(evt) {
    if (evt.repeat) {
        return;
    }
    const char = evt.key;
    if (computerKeyboardInput.keyLookup[char]) {
        const key = computerKeyboardInput.keyLookup[char];
        key.pressedKey();
    }
}

const liftPianoKey = function(evt) {
    const char = evt.key;
    if (computerKeyboardInput.keyLookup[char]) {
        const key = computerKeyboardInput.keyLookup[char];
        key.liftedKey();
    }
}

const computerKeyboardInput = {

    keyLookup: {},

    emptyLookup: function() {
        Object.keys(this.keyLookup).forEach(key => delete this.keyLookup[key]);
        console.log(this.keyLookup);
    },    

    connect: function(pianoKeys) {
        this.pianoKeys = pianoKeys.keys;
    },

    findTonic: function() {
        let letterInput = +document.querySelector('#tonic-letter').value;
        let octaveInput = +document.querySelector('#tonic-octave').value;
        this.tonic = (12 * octaveInput) + letterInput + 12;
    },

    findPianoTonicKey: function() {
        this.tonicKey = this.pianoKeys[this.tonic];
    },

    determineTonicContainer: function() {
        this.tonicContainer = this.tonicKey.element.parentElement;
    },

    determineStartingContainer: function() {
        this.startingContainer = this.tonicContainer.previousSibling.previousSibling.previousSibling;
    },

    findAllContainers: function() {
        this.containers = [];
        let currentContainer = this.startingContainer;
        for (let i = 0, l = this.keyCodePairs.length; i < l; i++) {
            this.containers.push(currentContainer);
            currentContainer = currentContainer.nextSibling;
        }
    },

    populateKeyWithText: function() {
        this.containers.forEach((container, i) => {
            let keys = [...container.children];
            let codes = this.keyCodePairs[i];
            keys.forEach((key, j) => {
                let code = codes[j];
                let pianoKey = key.creator;
                if (code !== undefined) {
                    key.innerText = code;
                    this.keyLookup[code] = pianoKey;
                }
            });
        });
    },

    whatKey: function(e) {
        const letter = e.key;
        const all = computerKeyboardInput.keyCodePairs.flat();

        if (all.includes(letter)) {
            console.log(letter);
        }
    },

    clearLabels: function() {
        this.containers.forEach(container => {
            let keys = [...container.children];
            console.log(keys);
            keys.forEach(key => {
                key.innerText = '';
            });
        });
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

    init: function() {
        this.findTonic();
        this.findPianoTonicKey();
        this.determineTonicContainer();
        this.determineStartingContainer();
        this.findAllContainers();
        this.populateKeyWithText();
    },

    reset: function() {
        computerKeyboardInput.clearLabels();
        computerKeyboardInput.emptyLookup();
        computerKeyboardInput.init();
    },

    on: function() {
        this.init();
        document.addEventListener('keydown', pressPianoKey);
        document.addEventListener('keyup', liftPianoKey);
    },
    
    off: function() {
        this.clearLabels();
        this.emptyLookup();
        document.removeEventListener('keydown', pressPianoKey);
        document.removeEventListener('keyup', liftPianoKey);
    }
}

export { computerKeyboardInput }