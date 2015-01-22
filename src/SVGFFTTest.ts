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
	private numBars				: number = 128;
	private background			: SVGRectangle;

	//------------------------------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();

		// Request Animation
		this.raf = new RequestAnimationFrame( this.raframe , this );

		// SVG Canvas
		this.container = document.createElement( 'div' );
		this.svg = new SVGCanvas( this.container );
		this.svg.width = 800;
		this.svg.height = 600;

		// Create background
		this.background = new SVGRectangle();
		this.background.fill( '#000000');
		this.svg.append( this.background );

		// Get user media / Mic
		this.userMediaManager  = new UserMediaManager();
		this.userMediaManager.getMicrophoneStream();
		this.userMediaManager.addEventListener( UserMediaManagerEvent.MIC_INITIALIZED , ( e : UserMediaManagerEvent ) => this.onMicInitialized( e ) );

		// Create FFT Rects
		for ( var c : number = 0 ; c < this.numBars ; c ++ )
		{
			var rect = new SVGRectangle();
				rect.fill( '#ffffff' );
				rect.height = 10;
				rect.width  =  ( window.innerWidth) / this.numBars;
				rect.x      = ( rect.width * c ) + ( c * 3 );
				rect.y      = ( this.background.height / 2 ) - ( rect.height / 2 );

			this.svg.append( rect );
			this.rects.push( rect );

		}

		// Add SVG container to the document
		document.body.appendChild( this.container );

		// resize handler
		window.addEventListener( 'resize' , () => this.onResize() );
		this.onResize();
	}
	/**
	 * Callback for microphone intialised
	 * @param e
	 */
	private onMicInitialized( e : UserMediaManagerEvent ) : void
	{
		this.audioContextManager = new AudioContextManager();
		this.audioContextManager.createInputFromStream( e.stream );
		this.audioContextManager.createAnalyser( 2048 );
		this.raf.start();
	}
	/**
	 * Request Animation FRame
	 */
	private raframe () : void
	{
		this.audioContextManager.updateFrequencyData();

		for (var i : number = 0; i < this.numBars; ++i)
		{
			var magnitude : number 		= this.audioContextManager.getBin( i , this.numBars , true );

			var rect   	: SVGRectangle 	= this.rects[ i ];
				rect.height         	=  ( window.innerHeight) * magnitude;
				rect.y              	= ( this.background.height / 2 ) - ( rect.height / 2 );

		}

	}
	/**
	 * Resize Event Handler
	 */
	private onResize () : void
	{
		this.background.width 	= this.svg.width = window.innerWidth;
		this.background.height 	= this.svg.height = window.innerHeight;

		for ( var c : number = 0 ; c < this.rects.length ; c ++ )
		{
			var rect : SVGRectangle = this.rects[c];
				rect.width  =  ( window.innerWidth) / this.numBars;
				rect.x      = ( rect.width * c ) + ( c * 3 );
		}
	}


}

export = SVGFFTTest;