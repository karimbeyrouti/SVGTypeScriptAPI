import SVGObjectBase    = require("./SVGObjectBase");
import SVGGradientStop  = require("./../gradients/SVGGradientStop");

class SVGGradientBase extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private stops : Array<SVGGradientStop> = new Array<SVGGradientStop>();

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
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
	public set spreadMethod ( val : any )
	{
		this.element.setAttribute( 'spreadMethod' , String( val ) );
	}
	public get spreadMethod () : any
	{
		return this.element.getAttribute( 'spreadMethod' );
	}

	//---------------------------------------------------------------------------------------------------------


}

export = SVGGradientBase;