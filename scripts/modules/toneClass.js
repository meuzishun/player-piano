
class Tone {
    constructor(buffer, piano) {
        this.sample = piano.audioCtx.createBufferSource();
        console.log(this.sample);
        this.sample.buffer = buffer;

        this.volume = piano.audioCtx.createGain();
        this.volume.gain.value = 0;
        
        this.sample.connect(this.volume).connect(piano.masterGain);
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

export { Tone }