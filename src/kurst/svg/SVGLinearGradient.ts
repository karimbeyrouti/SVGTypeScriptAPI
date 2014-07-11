import SVGObjectBase    = require("./SVGObjectBase");
import SVGGradientStop  = require("./SVGGradientStop");

class SVGLinearGradient extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private stops : Array<SVGGradientStop> = new Array<SVGGradientStop>();

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'svg:linearGradient' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param stop
	 */
	public appendStop ( stop : SVGGradientStop ) : void
	{
		this.element.appendChild( stop.element );
	}

	/**
	 *
	 * @param offset
	 * @param color
	 * @param opacity
	 */
	public addStop ( offset : string , color : string , opacity : number ) : SVGGradientStop
	{
		this.stops.push( new SVGGradientStop( this , offset , color , opacity ) );
		return this.stops[ this.stops.length - 1 ];
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @returns {Array<SVGGradientStop>}
	 */
	public getStops () : Array<SVGGradientStop>
	{
		return this.stops;
	}

	/**
	 *
	 * @param id
	 * @returns {SVGGradientStop}
	 */
	public getStop ( id : number ) : SVGGradientStop
	{
		if ( id < this.stops.length )
		{
			return this.stops[id];
		}
	}

	/**
	 *
	 * @param val
	 */
	public set alpha ( val : number )
	{
		for ( var c : number = 0 ; c < this.stops.length ; c++ )
		{
			this.stops[c].alpha = val;
		}
	}

	/**
	 *
	 * @param val
	 */
	public set id ( val : any )
	{
		this.element.setAttribute( 'id' , String( val ) );
	}

	public get id () : any
	{
		return this.element.getAttribute( 'id' );
	}

	/**
	 *
	 * @param val
	 */
	public set x1 ( val : any )
	{
		this.element.setAttribute( 'x1' , String( val ) );
	}

	public get x1 () : any
	{
		return this.element.getAttribute( 'x1' );
	}

	/**
	 *
	 * @param val
	 */
	public set y1 ( val : any )
	{
		this.element.setAttribute( 'y1' , String( val ) );
	}

	public get y1 () : any
	{
		return this.element.getAttribute( 'y1' );
	}

	/**
	 *
	 * @param val
	 */
	public set x2 ( val : any )
	{
		this.element.setAttribute( 'x2' , String( val ) );
	}

	public get x2 () : any
	{
		return this.element.getAttribute( 'x2' );
	}

	/**
	 *
	 * @param val
	 */
	public set y2 ( val : any )
	{
		this.element.setAttribute( 'y2' , String( val ) );
	}

	public get y2 () : any
	{
		return this.element.getAttribute( 'y2' );
	}

	/**
	 *
	 * @param val
	 */
	public set spreadMethod ( val : any )
	{
		this.element.setAttribute( 'spreadMethod' , String( val ) );
	}

	public get spreadMethod () : any
	{
		return this.element.getAttribute( 'spreadMethod' );
	}

}

export = SVGLinearGradient;
