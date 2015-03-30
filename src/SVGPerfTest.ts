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

class SVGPerfTest extends EventDispatcher
{

	//------------------------------------------------------------------------------------------------------------------------------

	private container 			: HTMLDivElement;
	private svg 				: SVGCanvas;
	private raf 				: RequestAnimationFrame;
	private rects 				: Array<SVGRectangle> = new Array<SVGRectangle>();
	private numBars             : number = 256;
	private t                   : number = 0;
	private defferDraw          : boolean = true;
	private info                : HTMLDivElement;

	//------------------------------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();

		this.info  = document.createElement( 'div');
		document.body.appendChild( this.info );

		// Request Animation
		this.raf = new RequestAnimationFrame( this.raframe , this );

		// SVG Canvas
		this.container = document.createElement( 'div' );
		this.svg = new SVGCanvas( this.container );
		this.svg.width = 800;
		this.svg.height = 600;


		// Create FFT Rects
		for ( var c : number = 0 ; c < this.numBars ; c ++ )
		{
			var rect = new SVGRectangle();
				rect.fill( "#"+((1<<24)*Math.random()|0).toString(16) );
				rect.height = 200;
				rect.width  =  200;//( window.innerWidth) / this.numBars;
				rect.x      = window.innerWidth / 2;
				rect.y      = window.innerHeight / 2;
				rect.rotation = c * 5;
				rect.defferDraw = this.defferDraw;
			this.svg.append( rect );
			this.rects.push( rect );

		}


		// Add SVG container to the document
		document.body.appendChild( this.container );

		// resize handler
		window.addEventListener( 'resize' , () => this.onResize() );
		this.onResize();

		this.raf.start();

		document.addEventListener( 'mousedown' , () => this.onMouseDown() );



	}
	/**
	 * Request Animation FRame
	 */
	private raframe () : void
	{

		var st : number = Date.now();
		var w : number = window.innerWidth / 2;
		var h : number = window.innerHeight / 2;

		for ( var c : number = 0 ; c < this.rects.length ; c ++ )
		{
			this.t += 0.025;

			var rect : SVGRectangle = this.rects[c];
				rect.rotation += .25;
				rect.scaleX = rect.scaleY = Math.sin( this.t );
				rect.x      = w +  Math.sin( this.t ) * 90;
				rect.y      = h +  Math.sin( this.t ) * 90;

		}

		//if ( this.defferDraw )
		//{
			this.svg.draw();// if we deffer SVG drawing - then we need to render the changes on the SVGCanvas
		//}

		this.info.innerHTML = Date.now() - st + ' Ms<br/>Deffered Draw: ' + this.defferDraw;

	}
	/**
	 * Resize Event Handler
	 */
	private onResize () : void
	{
		this.svg.width = window.innerWidth;
		this.svg.height = window.innerHeight;

		for ( var c : number = 0 ; c < this.rects.length ; c ++ )
		{
			var rect : SVGRectangle = this.rects[c];
				rect.x      = window.innerWidth / 2;
				rect.y      = window.innerHeight / 2;

		}

	}
	/**
	 *
	 */
	private onMouseDown () : void
	{
		this.defferDraw = !this.defferDraw;

		for ( var c : number = 0 ; c < this.rects.length ; c ++ )
		{
			var rect : SVGRectangle = this.rects[c];
				rect.defferDraw = this.defferDraw;

		}
	}

}

export = SVGPerfTest;