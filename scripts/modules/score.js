// The score looks at the tonic selected and the meter selected and saves the settings for other modules

const score = {
    getTonic: function() {
        let letterInput = +document.querySelector('#tonic-letter').value;
        let octaveInput = +document.querySelector('#tonic-octave').value;
        this.tonic = (12 * octaveInput) + letterInput + 12;
    },
    getMeter: function() {
        let meters = [...document.getElementsByName('meter')];
        meters.forEach((meter) => {
            if (meter.checked) {
                this.meter = meter.value;
            }
        });
    },
    init: function() {
        this.getTonic();
        this.getMeter();
    }
}

export { score }