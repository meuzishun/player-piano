control = {
    
    powerToggle: function() {
        if (piano.display.controls.powerBtn.firstChild.classList.contains('on')) {
            piano.display.controls.powerBtn.firstChild.classList.remove('on');
            piano.audioCtx.suspend();
        } else {
            piano.display.controls.powerBtn.firstChild.classList.add('on');
            piano.audioCtx.resume();
        }
    },

    volumeChange: function(evt) {
        //TODO: just kinda fudging it here... should find the correct equation
        let volume = evt.currentTarget.value / 100;
        let value = Math.pow(volume, 2);
        piano.masterGain.gain.value = value;
    },

    playToggle: function() {
        if (piano.display.controls.playBtn.firstChild.classList.contains('play')) {
            piano.display.controls.playBtn.firstChild.classList.remove('play');
        } else {
            piano.display.controls.playBtn.firstChild.classList.add('play');
            player.playRandomGesture();
        }
    },
    
    recordToggle: function() {
        if (piano.display.controls.recordBtn.firstChild.classList.contains('record')) {
            piano.display.controls.recordBtn.firstChild.classList.remove('record');
            user.inputListener = false;
        } else {
            piano.display.controls.recordBtn.firstChild.classList.add('record');
            user.inputListener = true;
        }
    },

    keyboardToggle: function() {
        if (piano.display.controls.keyboardBtn.firstChild.classList.contains('hot')) {
            piano.display.controls.keyboardBtn.firstChild.classList.remove('hot');
            computerKeyboardInput.off();
        } else {
            piano.display.controls.keyboardBtn.firstChild.classList.add('hot');
            computerKeyboardInput.on();
        }
    },

    pressedPianoKey: function(evt) {
        const keyElem = evt.currentTarget;
        const now = piano.audioCtx.currentTime;
        keyElem.addEventListener('mouseup', control.liftedPianoKey);
        // const midi = keyElem.dataset.midi;
        // const keyObj = piano.keys[`Key-${midi}`];
        const keyObj = keyElem.creator;
        // console.log(keyObj);
        // console.log(keyObj.sample.duration);
        keyObj.pressedKey(now);
    },
    
    liftedPianoKey: function(evt) {
        const keyElem = evt.currentTarget;
        const now = piano.audioCtx.currentTime;
        // console.log(keyElem.creator);
        // const midi = keyElem.dataset.midi;
        // const keyObj = piano.keys[`Key-${midi}`];
        const keyObj = keyElem.creator;
        keyObj.liftedKey(now);
        keyElem.removeEventListener('mouseup', control.liftedPianoKey);
    },

    keyboardPressed: function(evt) {
        let char = evt.key;
        if (char === "ArrowLeft" || char === "ArrowRight") {
            let shiftDn = evt.shiftKey;
            computerKeyboardInput.moveStartingContainer(char, shiftDn);
        }
        if (evt.repeat) { return }
        let elem = computerKeyboardInput.activePianoKeys.find(key => key.dataset.keyLabel === char);
        if (elem) {
            // let midi = elem.dataset.midi;
            // let key = piano.keys[`Key-${midi}`];
            let now = piano.audioCtx.currentTime;
            let key = elem.creator;
            key.pressedKey(now);
        }
    },

    keyboardLifted: function(evt) {
        let char = evt.key;
        let elem = computerKeyboardInput.activePianoKeys.find(key => key.dataset.keyLabel === char);
        if (elem) {
            // let midi = elem.dataset.midi;
            // let key = piano.keys[`Key-${midi}`];
            let now = piano.audioCtx.currentTime;
            let key = elem.creator;
            key.liftedKey(now);
        }
    }
}