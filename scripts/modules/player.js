// The player can of course play notes, melodies, chords, progressions, etc... but also schedules a melody (sequence of notes with MIDI pitch numbers and beat durations) by giving each note a start and end time relative to a GO point

const player = {
    piano: null,
    melody: null,
    showAnswer: document.querySelector('#show-answer-checkbox'),
    bpm: document.querySelector('#tempo-field'),
    bpmToMilliseconds() {
        if (this.melody.score.meter === 'simple') {
            this.beatLength = 60 / +this.bpm.value;
        }
        if (this.melody.score.meter === 'compound') {
            this.beatLength = 20 / +this.bpm.value;
        }
    },
    schedule() {
        this.bpmToMilliseconds();
        let start = 0;
        //TODO: Use .reduce here... simpler
        this.melody.notes.forEach(note => {
            note.realDuration = note.duration * this.beatLength;
            note.startTime = start;
            note.endTime = start + note.realDuration;
            start = note.endTime;
        });
    },
    playNote: function(note, now) {
        const key = this.piano.keys[note.pitch];

        if (this.showAnswer.checked) {
            this.lightNote(note, key);
        }

        key.playPitch(now + note.startTime);
        key.silencePitch(now + note.endTime);
    },
    playMelody: function() {
        const now = this.piano.audioCtx.currentTime;
        this.schedule();
        this.melody.notes.forEach(note => this.playNote(note, now));
    },
    lightNote: function(note, key) {
        const startTime = note.startTime * 1000;
        const endTime = note.endTime * 1000;

        let startTimer = setTimeout(function() {
            key.pressedColor();
            clearTimeout(startTimer);
        }, startTime);

        let endTimer = setTimeout(function() {
            key.liftedColor();
            clearTimeout(endTimer);
        }, endTime);
    }
}

export { player }