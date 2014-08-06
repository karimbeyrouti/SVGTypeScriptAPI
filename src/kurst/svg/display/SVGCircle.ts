import SVGDisplayObjectBase            = require("./../core/SVGDisplayObjectBase");

class SVGCircle extends SVGDisplayObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'circle' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set r ( val : number )
	{
		this.element.setAttribute( 'r' , String( val ) );
	}
	public get r () : number
	{
		return parseFloat( this.element.getAttribute( 'r' ) );
	}
	/**
	 *
	 * @param val
	 */
	public set width ( val : any )
	{
		this.element.setAttribute( 'width' , String( val ) );
	}
	public get width () : any
	{
		return this.element.getAttribute( 'width' );
	}
	/**
	 *
	 * @param val
	 */
	public set height ( val : any )
	{
		this.element.setAttribute( 'height' , String( val ) );
	}
	public get height () : any
	{
		return this.element.getAttribute( 'height' );
	}
	/**
	 *
	 * @param val
	 */
	public set cy ( val : number )
	{
		this.element.setAttribute( 'cy' , String( val ) );
	}
	public get cy () : number
	{
		return parseFloat( this.element.getAttribute( 'cy' ) );
	}
	/**
	 *
	 * @param val
	 */
	public set cx ( val : number )
	{
		this.element.setAttribute( 'cx' , String( val ) );
	}
	public get cx () : number
	{
		return parseFloat( this.element.getAttribute( 'cx' ) );
	}

}

export = SVGCircle;
