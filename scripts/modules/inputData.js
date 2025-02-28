import { pitchSequences } from '../modules/sequences.js'

class InputData {
    constructor () {
        this.collectTonic();
        this.collectMeter();
        this.collectTempo();
        this.collectNumberOfGestures();
        this.collectMatchedEnds();
        this.collectGlued();
        this.collectBoxes();
    }

    collectTonic() {
        let letterInput = +document.querySelector('#tonic-letter').value;
        let octaveInput = +document.querySelector('#tonic-octave').value;
        this.tonic = (12 * octaveInput) + letterInput + 12;
    }

    collectMeter() {
        this.meter = document.querySelector('#meter').value;
    }

    collectTempo() {
        this.tempo = +document.querySelector('#tempo-field').value;
    }

    collectNumberOfGestures() {
        this.numberOfGestures = +document.querySelector('#gesture-num').value;
    }

    collectMatchedEnds() {
        this.matchedEnds = document.querySelector('#matched-checkbox').checked;
    }

    collectGlued() {
        this.glued = document.querySelector('#glued-checkbox').checked;
    }

    collectBoxes() {
        let gestureBoxes = Array.from(document.querySelectorAll('.gesture-box'));
        let checkedBoxes = gestureBoxes.filter(box => box.checked);
        let arrayOfChoices = checkedBoxes.map(box => pitchSequences[box.dataset.mode][box.dataset.gesture]).flat();
        this.checkedBoxes = arrayOfChoices;
    }
}

export { InputData }