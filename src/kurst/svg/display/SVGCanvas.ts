import Event                	= require("../../events/Event");
import EventDispatcher        	= require("../../events/EventDispatcher");
import SVGDisplayObjectBase     = require("./../core/SVGDisplayObjectBase");
import SVGObjectBase			= require("./../core/SVGObjectBase");

class SVGCanvas extends SVGDisplayObjectBase
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
