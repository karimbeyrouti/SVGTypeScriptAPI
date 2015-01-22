import EventDispatcher  = require("./kurst/events/EventDispatcher");
import Event            = require("./kurst/events/Event");
import SVGCanvas        = require("./kurst/svg/display/SVGCanvas");
import SVGRectangle     = require("./kurst/svg/display/SVGRectangle");
import SVGCircle        = require("./kurst/svg/display/SVGCircle");
import SVGImage         = require("./kurst/svg/display/SVGImage");
import SVGPolygon       = require("./kurst/svg/display/SVGPolygon");
import SVGText          = require("./kurst/svg/display/SVGText");
import SVGGroup         = require("./kurst/svg/display/SVGGroup");
import SVGPath          = require("./kurst/svg/display/SVGPath");
import SVGArc           = require("./kurst/svg/display/SVGArc");
import Color            = require("./kurst/geom/Color");
import SVGBlurFilter	= require("./kurst/svg/filters/SVGBlurFilter");
import SVGLoader		= require("./kurst/svg/loader/SVGLoader");
import SVGGradientStop      	= require("./kurst/svg/gradients/SVGGradientStop");
import SVGLinearGradient    	= require("./kurst/svg/gradients/SVGLinearGradient");
import SVGRadialGradient		= require("./kurst/svg/gradients/SVGRadialGradient");
import SVGGradientSpreadMethod	= require("./kurst/svg/gradients/SVGGradientSpreadMethod");
import RequestAnimationFrame    = require("./kurst/utils/RequestAnimationFrame");

import AudioContextManager    	= require("./kurst/media/AudioContextManager");
import UserMediaManager    		= require("./kurst/media/UserMediaManager");
import UserMediaManagerEvent    		= require("./kurst/events/UserMediaManagerEvent");

class SVGFFTTest extends EventDispatcher
{

	//------------------------------------------------------------------------------------------------------------------------------

	private container 			: HTMLDivElement;
	private svg 				: SVGCanvas;
	private raf 				: RequestAnimationFrame;
	private rects 				: Array<SVGRectangle> = new Array<SVGRectangle>();
	private userMediaManager 	: UserMediaManager;
	private audioContextManager : AudioContextManager;
	private numBars				: number = 256;
	private background			: SVGRectangle;

	//------------------------------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();

		// Request Animation
		this.raf = new RequestAnimationFrame( this.raframe , this );
		this.container = document.createElement( 'div' );

		// SVG Canvas
		this.svg = new SVGCanvas( this.container );
		this.svg.width = 800;
		this.svg.height = 600;

		this.background = new SVGRectangle();
		this.background.fill( '#000000');
		this.svg.append( this.background );

		this.userMediaManager  = new UserMediaManager();
		this.userMediaManager.getMicrophoneStream();
		this.userMediaManager.addEventListener( UserMediaManagerEvent.MIC_INITIALIZED , ( e : UserMediaManagerEvent ) => this.onMicInitialized( e ) );
		//this.userMediaManager.mediaEventStream.listen( (String message) => onMicrophoneInitialized(message) );

		for ( var c : number = 0 ; c < this.numBars ; c ++ )
		{
			var rect = new SVGRectangle();
				rect.fill( '#ffffff' );
				rect.width  =  ( window.innerWidth - this.numBars ) / this.numBars;
				rect.height = 10;
				rect.x      = ( rect.width + 3 ) * c ;

			this.svg.append( rect );
			this.rects.push( rect );

		}

		document.body.appendChild( this.container );
		//this.raf.start();

		window.addEventListener( 'resize' , () => this.onResize() );
		this.onResize();
	}

	private onMicInitialized( e : UserMediaManagerEvent ) : void
	{
		this.audioContextManager = new AudioContextManager();
		this.audioContextManager.createInputFromStream( e.stream );
		this.audioContextManager.createAnalyser( 2048 );
		this.raf.start();
	}
	/**
	 *
	 */
	private raframe () : void
	{

		this.audioContextManager.updateFrequencyData();

		for (var i : number = 0; i < this.numBars; ++i)
		{
			var magnitude : number = this.audioContextManager.getBin( i , this.numBars , true );
			var rect   	: SVGRectangle = this.rects[ i ];

				rect.height         =  ( window.innerHeight) * magnitude;
				rect.y              = ( this.background.height / 2 ) - ( rect.height / 2 );

		}

	}

	//------------------------------------------------------------------------------------------------------------------------------

	/**
	 *
	 */
	private onResize () : void
	{
		this.background.width = this.svg.width = window.innerWidth;
		this.background.height = this.svg.height = window.innerHeight;

		for ( var c : number = 0 ; c < this.rects.length ; c ++ )
		{
			var rect : SVGRectangle = this.rects[c];
			rect.width  =  ( window.innerWidth) / this.numBars;
			rect.x      = ( rect.width + 3 ) * c ;
		}
	}

}

export = SVGFFTTest;