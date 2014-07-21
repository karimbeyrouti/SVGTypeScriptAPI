import EventDispatcher    = require("./kurst/events/EventDispatcher");
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

import SVGLoader		= require("./kurst/svg/loader/SVGLoader");

import SVGGradientStop      	= require("./kurst/svg/gradients/SVGGradientStop");
import SVGLinearGradient    	= require("./kurst/svg/gradients/SVGLinearGradient");
import SVGRadialGradient		= require("./kurst/svg/gradients/SVGRadialGradient");
import SVGGradientSpreadMethod	= require("./kurst/svg/gradients/SVGGradientSpreadMethod");
import RequestAnimationFrame    = require("./kurst/utils/RequestAnimationFrame");

class SVGTest extends EventDispatcher
{

	//------------------------------------------------------------------------------------------------------------------------------

	private container : HTMLDivElement;
	private svg : SVGCanvas;
	private rect : SVGRectangle;
	private img : SVGImage;
	private poly : SVGPolygon;
	private txt : SVGText;
	private group : SVGGroup;
	private gradient : SVGLinearGradient;
	private rgradient : SVGRadialGradient;
	private circle : SVGCircle;
	private path : SVGPath;
	private arcPath : SVGPath;
	private arc : SVGArc;
	private raf : RequestAnimationFrame;
	private svgLoader : SVGLoader;
	private ruby : SVGGroup;

	private arcs : Array<SVGArc> = new Array<SVGArc>();

	//------------------------------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();


		this.raf = new RequestAnimationFrame( this.raframe , this );
		this.container = document.createElement( 'div' );

		document.body.appendChild( this.container );
		document.addEventListener( 'mousedown' , () => this.onMouseDown() );
		window.addEventListener( 'resize' , () => this.onResize() );

		this.svgLoader = new SVGLoader();
		this.svgLoader.load( 'assets/ruby.svg');
		this.svgLoader.addEventListener( Event.COMPLETE , ( e : Event ) => this.svgLoaded(e ));


		this.svg = new SVGCanvas( this.container );
		this.svg.width = 800;
		this.svg.height = 600;

		//*
		// Gradient
		this.gradient = new SVGLinearGradient();
		this.gradient.id = "gradient";
		this.gradient.x1 = "0%";
		this.gradient.y1 = "50%";
		this.gradient.x2 = "100%";
		this.gradient.y2 = "50%";
		this.gradient.spreadMethod = SVGGradientSpreadMethod.PAD;
		this.gradient.addStop( "0%" , "#00ff00" , 1 );
		this.gradient.addStop( "100%" , "#00b700" , 1 );
		this.svg.appendDef( this.gradient );

		//*
		// Gradient
		this.rgradient = new SVGRadialGradient();
		this.rgradient.id = "gradient_rad";
		this.rgradient.spreadMethod = SVGGradientSpreadMethod.PAD;
		this.rgradient.addStop( "0%" , "#00ff00" , 1 );
		this.rgradient.addStop( "100%" , "#00b700" , 1 );
		this.svg.appendDef( this.rgradient );

		// Rectangle
		this.rect = new SVGRectangle();
		this.rect.width = 200;
		this.rect.height = 200;
		this.rect.x = 10;
		this.rect.y = 10;
		this.rect.gradient = this.rgradient;
		this.svg.append( this.rect );

		// Group
		this.group = new SVGGroup();
		this.group.x = 20;
		this.group.y = 20;
		this.svg.append( this.group );


		// Arc Path
		this.arcPath = new SVGPath();
		this.arcPath.addDrawCommand( SVGPath.moveto , 0 , 0 );
		this.arcPath.addDrawCommand( SVGPath.arc , 35 , 35 , 0 , 1 , 1 , 100 , 100 );
		this.arcPath.fill( '#ffffff' );
		this.arcPath.stroke = '#00ff00'
		this.arcPath.strokewidth = 20;
		this.arcPath.x = 190;
		this.group.append( this.arcPath );

		// Image
		this.img = new SVGImage();
		this.img.src = 'assets/icon.png';
		this.img.width = 20;
		this.img.height = 20;
		this.img.x = 0;
		this.img.y = 0;
		this.group.append( this.img );

		// Polygon
		this.poly = new SVGPolygon();
		this.poly.x = 10;
		this.poly.y = 10;
		this.poly.addPoint( 5 , 30 );
		this.poly.addPoint( 15 , 10 );
		this.poly.addPoint( 25 , 30 );
		this.poly.fill( '#00ff00' );
		this.poly.stroke = '#000000';
		this.group.append( this.poly );

		// Text
		this.txt = new SVGText();
		this.txt.y = 80;
		this.txt.text = 'Hello SVG';
		this.txt.font = 'Arial';
		this.txt.color = '#000000';
		this.group.append( this.txt );
		this.txt.registration.x = this.txt.width / 2;
		this.txt.registration.y = this.txt.height / 2;


		// Circle
		this.circle = new SVGCircle();
		this.circle.r = 20;
		this.circle.x = 150;
		this.circle.y = 150;
		this.circle.fillOpacity = .5;
		this.circle.gradient = this.gradient;
		this.group.append( this.circle );

		// Path
		this.path = new SVGPath();
		this.path.x = 115;
		this.path.y = -10;

		// Path
		this.path.gradient = this.gradient;
		this.path.addDrawCommand( SVGPath.moveto , 75 , 0 );
		this.path.addDrawCommand( SVGPath.lineto , 75 , 200 );
		this.path.addDrawCommand( SVGPath.lineto , 255 , 200 );
		this.path.addDrawCommand( SVGPath.close );
		this.group.append( this.path );
		//*/
		this.raf.start();


		var startColor : Color = new Color();
		startColor.set( '#00a8ff' );

		var endColor : Color = new Color();
		endColor.set( '#F6EB0F' );

		var l : number = 20;
		var i : number = 1 / l;

		for ( var c : number = 0 ; c < l ; c++ )
		{

			startColor.lerp( endColor , c * i );
			var a : SVGArc = new SVGArc();
			a.radius = 20 + ( c * 10 );
			a.strokewidth = 11;
			a.startAngle = 0 + ( c * 10 );
			a.endAngle = 30 + ( c * 20 );
			a.x = this.svg.width / 2;
			a.y = this.svg.height / 2;
			a.stroke = '#' + startColor.getHexString();
			this.svg.append( a );

			this.arcs.push( a );

		}

		this.onResize();
	}

	private svgLoaded( e : Event ) : void
	{
		this.svg.append( this.svgLoader.element );
		this.ruby = this.svgLoader.element;
		this.onResize();

		console.log( this.svg );

	}

	private raframe () : void
	{

		var l : number = this.arcs.length;

		for ( var c : number = 0 ; c < l ; c++ )
		{
			this.arcs[c].rotation += 1 + ( c * .2 );
		}


	}

	//------------------------------------------------------------------------------------------------------------------------------

	private onMouseDown () : void
	{

		this.gradient.getStops()[0].color = "#"+((1<<24)*Math.random()|0).toString(16);
		this.gradient.getStops()[1].color = "#"+((1<<24)*Math.random()|0).toString(16);

		if (  this.rect )
		{
			console.log( this.rect.parentSVGObject );

			if ( this.rect.parentSVGObject )
			{
				console.log( this.rect.parentSVGObject.children)
			}

			 if ( this.rect.parentNode )
			 {
				this.rect.remove()
			 }
			 else
			 {
				this.svg.append( this.rect );
				this.svg.append( this.group ); // keep group in front
			 }
		}
	}

	private onResize () : void
	{
		this.svg.width = window.innerWidth;
		this.svg.height = window.innerHeight;

		var l : number = this.arcs.length;
		for ( var c : number = 0 ; c < l ; c++ )
		{
			this.arcs[c].x = this.svg.width / 2;
			this.arcs[c].y = this.svg.height / 2;
		}

		if ( this.ruby )
		{
			this.ruby.x = ( this.svg.width - this.ruby.width ) / 2;
			this.ruby.y = ( this.svg.height - this.ruby.height ) / 2;
		}

	}

}

export = SVGTest;