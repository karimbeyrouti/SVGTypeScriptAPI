import SVGObjectBase    = require("./../core/SVGObjectBase");
import SVGGradientBase	= require("./../core/SVGGradientBase");
import SVGGradientStop  = require("./SVGGradientStop");

class SVGLinearGradient extends SVGGradientBase
{

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'svg:linearGradient' );
	}

	//---------------------------------------------------------------------------------------------------------

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

}

export = SVGLinearGradient;