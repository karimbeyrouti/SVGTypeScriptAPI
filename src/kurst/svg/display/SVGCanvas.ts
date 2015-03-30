import Event                	= require("../../events/Event");
import EventDispatcher        	= require("../../events/EventDispatcher");
import SVGDisplayObjectBase     = require("./../core/SVGDisplayObjectBase");
import SVGObjectBase			= require("./../core/SVGObjectBase");
import BitmapData     			= require("./../../display/BitmapData");

class SVGCanvas extends SVGDisplayObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private container       : HTMLDivElement;
	private defs            : SVGElement;
	private svg             : SVGElement;
	private renderToCanvas  : boolean;

	private img             : HTMLImageElement;
	private bitmapData      : BitmapData;
	private xmlSerializer   : XMLSerializer;// = new XMLSerializer
	private context         : CanvasRenderingContext2D;

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param container - HTML container for SVG Canvas
	 * @param renderToCanvas - Render to a canvas. This is experimental and slow
	 */
	constructor ( container : HTMLDivElement , renderToCanvas : boolean = false )
	{
		super();

		this.initElement( 'svg' );

		this.renderToCanvas     = renderToCanvas;
		this.container          = container;
		this.svg                = this.element;
		this.defs               = this.createSVGElement( 'svg:defs' );
		this.svg.appendChild( this.defs );

		if ( renderToCanvas )
		{
			this.xmlSerializer  = new XMLSerializer();
			this.img            = new Image();
			this.bitmapData     = new BitmapData( 800 , 600 , true )
			this.context        = this.bitmapData.context;
			this.container.appendChild( this.bitmapData.canvas );
		}
		else
		{
			this.container.appendChild( this.svg );
		}

	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 */
	public draw() : void
	{
		if ( this.renderToCanvas )
		{
			this.img.src = "data:image/svg+xml;charset=utf-8," + this.xmlSerializer.serializeToString( this.svg );
			this.context.clearRect( 0 , 0 , this.bitmapData.width , this.bitmapData.height );
			this.bitmapData.draw( this.img );
		}

		SVGDisplayObjectBase.displayObjectManager.update();
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 */
	public get alpha () : number
	{
		return  parseFloat( this.svg.getAttribute( 'fill-opacity' ) );
	}
	public set alpha ( val : number )
	{
		this.svg.setAttribute( 'fill-opacity' , String( val ) );
	}
	/**
	 *
	 * @param d3Object
	 */
	public append ( obj : SVGDisplayObjectBase ) : void
	{
		if ( ! this.isChild( obj ))
		{
			this.children.push( obj );
			obj.parentSVGObject = this;
			this.svg.appendChild( obj.element );
		}
		else
		{
			this.element.appendChild( obj.element ); // move to front
		}
	}
	/**
	 *
	 * @param d3Object
	 */
	public appendDef ( obj : SVGObjectBase ) : void
	{
		this.defs.appendChild( obj.element );
	}
	/**
	 *
	 * @param val
	 */
	public set width ( val : any )
	{
		if ( this.renderToCanvas )
		{
			this.bitmapData.width = val;
		}
		this.svg.setAttribute( 'width' , String( val ) );
	}
	public get width () : any
	{
		return this.svg.getAttribute( 'width' );
	}
	/**
	 *
	 * @param val
	 */
	public set height ( val : any )
	{
		if ( this.renderToCanvas )
		{
			this.bitmapData.height = val;
		}
		this.svg.setAttribute( 'height' , String( val ) );
	}
	public get height () : any
	{
		return this.svg.getAttribute( 'height' );
	}
}

export = SVGCanvas;
