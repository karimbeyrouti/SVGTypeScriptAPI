///<reference path="../../libs/waa.d.ts" />
///<reference path="../../libs/usermedia.d.ts" />

import EventDispatcher          = require("../events/EventDispatcher");
import UserMediaManagerEvent    = require("../events/UserMediaManagerEvent");

class AudioContextManager extends EventDispatcher {

    //--------------------------------------------------------------------------

    public audioContext     : AudioContext = new AudioContext();
    public audioInput       : MediaStreamAudioSourceNode;
    public inputPoint       : GainNode;
    public analyserNode     : AnalyserNode;

    //--------------------------------------------------------------------------

    private freqByteData    : Uint8Array;
    private multiplier      : number;
    private offset          : number;
    private mag             : number;

    //--------------------------------------------------------------------------

    constructor()
    {
        super();
        this.inputPoint = this.audioContext.createGain();
    }

    //--------------------------------------------------------------------------

    /**
     *
     * @param stream
     */
    public createInputFromStream( stream : MediaStream ) : MediaStreamAudioSourceNode
    {
        this.audioInput = this.audioContext.createMediaStreamSource( stream );
        this.audioInput.connect( this.inputPoint );

        return this.audioInput;
    }
    /**
     *
     * @param fftSize
     * @returns {AnalyserNode}
     */
    public createAnalyser( fftSize : number = 2048 ) : AnalyserNode
    {
        this.analyserNode           = this.audioContext.createAnalyser();
        this.analyserNode.fftSize   = fftSize;
        this.freqByteData           =  new Uint8Array(this.analyserNode.frequencyBinCount)

        this.inputPoint.connect( this.analyserNode );
        return this.analyserNode;
    }
    /**
     * Update frequency data
     */
    public updateFrequencyData() : void
    {
        this.analyserNode.getByteFrequencyData( this.freqByteData );
    }
    /**
     *
     * @param bin - FFT bin
     * @param numBars - number of bins
     * @param groupAverage - Average bin group
     * @returns {number}
     */
    public getBin( bin : number , numBars : number , groupAverage : boolean = true ) : number
    {
        this.multiplier = this.analyserNode.frequencyBinCount / numBars;
        this.offset     = Math.floor( bin * this.multiplier );
        this.mag        = 0;

        if ( groupAverage  )
        {
            for (var j = 0; j< this.multiplier; j++)
            {
                this.mag += this.freqByteData[this.offset + j];
            }
            this.mag = ( this.mag / this.multiplier )
        }
        else
        {
            this.mag += this.freqByteData[this.offset];
        }

        /*
         subtract analyser.minDecibels from every value of the Float32Array to get positive numbers
         and multiply with (analyser.maxDecibels - analyser.minDecibels) to get a similar representation as with
         getByteFrequencyData, just with more resolution.
         */

        //( this.mag - this.analyserNode.minDecibels ) *   (analyser.maxDecibels - analyser.minDecibels)
        return this.mag / 255;// ( this.analyserNode.minDecibels  - this.analyserNode.maxDecibels );
        //return this.mag / ( this.analyserNode.minDecibels  - this.analyserNode.maxDecibels );

    }

    //--------------------------------------------------------------------------


}
export = AudioContextManager;