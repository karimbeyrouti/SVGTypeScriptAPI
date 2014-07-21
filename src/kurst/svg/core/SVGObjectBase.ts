import Event            = require("../../events/Event");
import EventDispatcher  = require("../../events/EventDispatcher");
import SVGGradientBase	= require("./SVGGradientBase");
import Point            = require("../../geom/Point");

class SVGObjectBase extends EventDispatcher
{

	//---------------------------------------------------------------------------------------------------------

	public parentSVGObject 	: SVGObjectBase;
	public children 		: Array<SVGObjectBase> = new Array<SVGObjectBase>();
	public element 			: SVGElement;
	public registration 	: Point = new Point();

	//---------------------------------------------------------------------------------------------------------

	private _x : number = 0;
	private _y : number = 0;
	private _rotation : number = 0;

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 * @param elementName
	 */
	public initElement ( elementName : string ) : void
	{
		this.element = this.createSVGElement( elementName );
	}
	/**
	 * @param elementName
	 * @returns {Selection}
	 */
	public createSVGElement ( elementName : string ) : SVGElement
	{
		return <SVGElement> document.createElementNS( 'http://www.w3.org/2000/svg' , elementName );
	}
	/**
	 *
	 */
	public updateTransform () : void
	{
		this.element.setAttribute( "transform" , "translate(" + this._x + "," + this._y + ")" + " rotate(" + this._rotation + "," + this.registration.x + ", " + this.registration.y + ")" );
	}
	/**
	 *
	 */
	public draw () : void
	{

	}
	/**
	 *
	 * @param colour
	 */
	public fill ( colour : string ) : void
	{
		if ( this.element )
		{
			this.element.setAttribute( 'fill' , colour );
		}
	}

	/**
	 *
	 */
	public remove () : void
	{
		if ( this.element.parentNode )
		{

			var n : SVGObjectBase;
			var l : number = this.parentSVGObject.children.length;

			for ( var c : number = 0 ; c < l ; c ++ )
			{
				n = this.parentSVGObject.children[c];

				if ( n == this )
				{
					this.parentSVGObject.children.splice(c , 1 );
					//console.log( 'remove' , c , this.parentSVGObject.children , this.parentSVGObject.children.length );
				}
			}

			this.parentSVGObject = null;
			this.element.parentNode.removeChild( this.element );
		}
	}
	/**
	 *
	 * @param obj
	 * @returns {boolean}
	 */
	public isChild( obj : SVGObjectBase ) : boolean
	{
		var l : number = this.children.length;
		var o : SVGObjectBase;
		for ( var c : number = 0 ;c < l ;c ++ )
		{
			o = this.children[c];

			if ( o === obj )
			{
				return true;
			}
		}

		return false;
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set color ( val : string )
	{
		this.fill( val );
	}
	public get color () : string
	{
		return this.element.getAttribute( 'fill' );
	}
	/**
	 *
	 * @param colour
	 */
	public set gradient ( grad : SVGGradientBase )
	{
		if ( this.element )
		{
			this.fill( 'url(#' + grad.id + ')' );
		}
	}
	/**
	 *
	 * @returns {number}
	 */
	public get parentNode () : Node
	{
		return this.element.parentNode
	}
	/**
	 *
	 */
	public get fillOpacity () : number
	{
		return  parseFloat( this.element.getAttribute( 'fill-opacity' ) );
	}
	public set fillOpacity ( val : number )
	{
		this.element.setAttribute( 'fill-opacity' , String( val ) );
	}
	/**
	 *
	 */
	public get strokeOpacity () : number
	{
		return  parseFloat( this.element.getAttribute( 'stroke-opacity' ) );
	}
	public set strokeOpacity ( val : number )
	{
		this.element.setAttribute( 'stroke-opacity' , String( val ) );
	}
	/**
	 *
	 * @param val
	 */
	public set stroke ( val : any )
	{
		this.element.setAttribute( 'stroke' , String( val ) );
	}
	public get stroke () : any
	{
		return this.element.getAttribute( 'stroke' );
	}
	/**
	 *
	 * @param val
	 */
	public set strokewidth ( val : number )
	{
		this.element.setAttribute( 'stroke-width' , String( val ) );
	}
	public get strokewidth () : number
	{
		return parseFloat( this.element.getAttribute( 'stroke-width' ) );
	}
	/**
	 *
	 * @param val
	 */
	public set x ( val : any )
	{
		this._x = val;
		this.updateTransform();
	}
	public get x () : any
	{
		return this._x;
	}
	/**
	 *
	 * @param val
	 */
	public set y ( val : any )
	{
		this._y = val;
		this.updateTransform();
	}
	public get y () : any
	{
		return this._y;
	}
	/**
	 *
	 * @param val
	 */
	public set rotation ( val : any )
	{
		this._rotation = val;
		this.updateTransform();
	}
	public get rotation () : any
	{
		return this._rotation;
	}
	/**
	 *
	 * @returns {number}
	 */
	public get width () : number
	{
		return this.element.getBoundingClientRect().width;
	}
	public get height () : number
	{
		return this.element.getBoundingClientRect().height;
	}

	//---------------------------------------------------------------------------------------------------------

}

export = SVGObjectBase;
