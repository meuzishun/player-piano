const piano = {
    audioCtx: new AudioContext(),
    masterGain: null,
    keys: [],

    buildPiano: function(startingMidi, numOfKeys) {
        let endingMidi = startingMidi + numOfKeys;
        for (let midi = startingMidi; midi < endingMidi; midi++) {
            const key = new Key(midi);
            
            let keyContainer;
            if (key.element.classList.contains('white-key')) {
                keyContainer = document.createElement('div');
                keyContainer.classList.add('key-container');
                piano.display.keyContainers.push(keyContainer);
            }
            if (key.element.classList.contains('black-key')) {
                keyContainer = piano.display.keyContainers[piano.display.keyContainers.length - 1];
            }
            
            keyContainer.appendChild(key.element);
            piano.display.keyboard.appendChild(keyContainer);
            piano.keys.push(key);
            piano.display.keyElements.push(key.element);
        }
        piano.display.keyboard.addEventListener('mousedown', function() {
            piano.keys.forEach(key => {
                key.element.addEventListener('mouseenter', key.pressedKey);
                key.element.addEventListener('mouseleave', key.liftedKey);
            });
            document.body.addEventListener('mouseup', function() {
                piano.keys.forEach(key => {
                    key.element.removeEventListener('mouseenter', key.pressedKey);
                    key.element.removeEventListener('mouseleave', key.liftedKey);
                });
            });
        });
        piano.display.CSS_access.style.setProperty('--num_of_keyContainers', piano.display.keyContainers.length);
        piano.showApp();
    },

    display: {
        CSS_access: document.querySelector(':root'),
        loadingMessage: document.querySelector('.loading-container'),
        container: document.querySelector('.piano-container'),
        controls: {
            container: document.querySelector('.piano-controls'),
            powerBtn: document.querySelector('.power-btn'),
            volumeSldr: document.querySelector('.volume-slider'),
            playBtn: document.querySelector('.play-btn'),
            recordBtn: document.querySelector('.record-btn')
        },
        keyboard: document.querySelector('.keyboard-container'),
        keyContainers: [],
        keyElements: []
    },

    showApp: function() {
        piano.display.loadingMessage.classList.add('hidden');
        piano.display.container.classList.remove('hidden');
    },
}

class Key {
    constructor(midi) {
        this.midi = midi;
        this.pitchClass = this.setPitchClass();
        this.color = this.setKeyColor();
        this.element = this.buildElement();
        this.sample = this.loadSample();
        this.note = null;
    }

    setPitchClass() {
        return this.midi % 12;
    }

    setKeyColor() {
        const WhPCs = [0, 2, 4, 5, 7, 9, 11];
        return WhPCs.includes(this.pitchClass) ? 'white' : 'black';
    }
    
    buildElement() {
        let element = document.createElement('div');
        element.classList.add('key', `${this.color}-key`);
        element.dataset.midi = this.midi;
        element.dataset.pitchClass = this.pitchClass;
        element.creator = this;
        element.addEventListener('mousedown', this.pressedKey);
        return element;
    }

    loadSample() {
        let pitch = this.midi;
        fetch(`../audio/${this.midi}.wav`).then(function(response) {
            return response.arrayBuffer();
        }).then(function(arrayBuffer) {
            return piano.audioCtx.decodeAudioData(arrayBuffer);
        }).then(function(audioBuffer) {
            audioBuffer.pitch = pitch;
            let key = piano.keys.find(key => key.midi == pitch);
            key.sample = audioBuffer;
        }).catch(function(err) {
            console.log(`Something went wrong - ${err}`);
        });
    }

    pressedKey() {
        this.creator.pressedColor();
        this.creator.playPitch();
        this.addEventListener('mouseup', this.creator.liftedKey);
    }

    liftedKey() {
        this.creator.liftedColor();
        this.creator.silencePitch();
        this.removeEventListener('mouseup', this.creator.liftedKey)
    }

    pressedColor() {
        this.element.classList.add(`${this.color}-key-pressed`);
    }
    
    liftedColor() {
        this.element.classList.remove(`${this.color}-key-pressed`);
    }

    playPitch() {
        this.note = new Note(this.sample);
        const now = piano.audioCtx.currentTime;
        this.note.play(now);
    }
    
    silencePitch() {
        const now = piano.audioCtx.currentTime;
        this.note.stop(now);
        this.note = null;
    }
}

class Note {
    constructor(buffer) {
        this.sample = piano.audioCtx.createBufferSource();
        this.sample.buffer = buffer;
        
        this.volume = piano.audioCtx.createGain();
        this.volume.gain.value = 0;
        
        this.sample.connect(this.volume).connect(piano.audioCtx.destination);
    };
    
    play(startTime) {
        this.sample.start(startTime);
        this.volume.gain.setTargetAtTime(1, startTime, 0.01);
    };

    stop(endTime) {
        this.volume.gain.setTargetAtTime(0, endTime, 0.1);
        this.sample.stop(endTime + 0.5);
    };
}