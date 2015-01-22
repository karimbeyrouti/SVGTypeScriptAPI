///<reference path="../../libs/waa.d.ts" />
///<reference path="../../libs/usermedia.d.ts" />

import EventDispatcher          = require("../events/EventDispatcher");
import UserMediaManagerEvent    = require("../events/UserMediaManagerEvent");

class UserMediaManager extends EventDispatcher {

    //--------------------------------------------------------------------------

    public stream : MediaStream;

    //--------------------------------------------------------------------------

    constructor()
    {
        super();
    }

    //--------------------------------------------------------------------------

    /**
     *
     */
    public getMicrophoneStream() : void
    {
        if (!navigator.getUserMedia)
        {
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        }
        navigator.getUserMedia( { "audio": true, "video": false } , (stream:MediaStream) => this.streamInitialized(stream), ( e ) => this.streamInitializeError( e ) );
    }

    //--------------------------------------------------------------------------

    /**
     *
     * @param stream
     */
    public streamInitialized( stream : MediaStream ) : void
    {
        this.stream                     = stream;

        var e : UserMediaManagerEvent   = new UserMediaManagerEvent( UserMediaManagerEvent.MIC_INITIALIZED );
            e.stream                    = stream;
        this.dispatchEvent( e )
    }

    /**
     *
     * @param error
     */
    public streamInitializeError( error ) : void
    {
        this.dispatchEvent( new UserMediaManagerEvent( UserMediaManagerEvent.MIC_INITIALIZED_ERROR ))
    }

}
export = UserMediaManager;