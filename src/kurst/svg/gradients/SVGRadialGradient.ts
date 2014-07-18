import SVGObjectBase    = require("./../core/SVGObjectBase");
import SVGGradientBase	= require("./../core/SVGGradientBase");
import SVGGradientStop  = require("./SVGGradientStop");

class SVGLinearGradient extends SVGGradientBase
{

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'svg:radialGradient' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set cx ( val : any )
	{
		this.element.setAttribute( 'cx' , String( val ) );
	}
	public get cx () : any
	{
		return this.element.getAttribute( 'cx' );
	}
	/**
	 *
	 * @param val
	 */
	public set cy ( val : any )
	{
		this.element.setAttribute( 'cy' , String( val ) );
	}
	public get cy () : any
	{
		return this.element.getAttribute( 'cy' );
	}
	/**
	 *
	 * @param val
	 */
	public set fx ( val : any )
	{
		this.element.setAttribute( 'fx' , String( val ) );
	}
	public get fx () : any
	{
		return this.element.getAttribute( 'fx' );
	}
	/**
	 *
	 * @param val
	 */
	public set fy ( val : any )
	{
		this.element.setAttribute( 'fy' , String( val ) );
	}
	public get fy () : any
	{
		return this.element.getAttribute( 'fy' );
	}
	/**
	 *
	 * @param val
	 */
	public set r ( val : any )
	{
		this.element.setAttribute( 'r' , String( val ) );
	}
	public get r () : any
	{
		return this.element.getAttribute( 'r' );
	}
}

export = SVGLinearGradient;
