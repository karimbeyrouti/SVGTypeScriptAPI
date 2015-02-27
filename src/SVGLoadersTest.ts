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

class SVGLoadersTest extends EventDispatcher
{

	//------------------------------------------------------------------------------------------------------------------------------

	private container 			: HTMLDivElement;
	private svg 				: SVGCanvas;
	private raf 				: RequestAnimationFrame;
	private background			: SVGRectangle;

	//------------------------------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
        console.log( 'hello TEST');
	}
	/**
	 * Request Animation FRame
	 */
	private raframe () : void
	{

	}
	/**
	 * Resize Event Handler
	 */
	private onResize () : void
	{

	}


}

export = SVGLoadersTest;