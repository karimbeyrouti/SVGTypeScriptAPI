import Event                = require("../../kurst/events/Event");
import EventDispatcher        = require("../../kurst/events/EventDispatcher");
import SVGObjectBase        = require("./SVGObjectBase");

class SVGCanvas extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private container : HTMLDivElement;
	private defs : SVGElement;
	private svg : SVGElement;

	//---------------------------------------------------------------------------------------------------------

	constructor ( container : HTMLDivElement )
	{
		super();

		this.initElement( 'svg' );

		this.container = container;
		this.svg = this.element;
		this.defs = this.createSVGElement( 'svg:defs' );

		this.container.appendChild( this.svg );
		this.svg.appendChild( this.defs );
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
	public append ( d3Object : SVGObjectBase ) : void
	{
		d3Object.draw();
		this.svg.appendChild( d3Object.element );
	}

	/**
	 *
	 * @param d3Object
	 */
	public appendDef ( d3Object : SVGObjectBase ) : void
	{
		this.defs.appendChild( d3Object.element );
	}

	/**
	 *
	 * @param val
	 */
	public set width ( val : any )
	{
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
		this.svg.setAttribute( 'height' , String( val ) );
	}

	public get height () : any
	{
		return this.svg.getAttribute( 'height' );
	}
}

export = SVGCanvas;