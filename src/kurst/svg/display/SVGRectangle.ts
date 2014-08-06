import SVGDisplayObjectBase            = require("./../core/SVGDisplayObjectBase");

class SVGRectangle extends SVGDisplayObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private _widthP : number;   // Percent width
	private _heightP : number;   // Percent height

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'rect' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set widthp ( val : number )
	{
		this._widthP = val;
		this.width = String( val ) + '%';
	}
	public get widthp () : number
	{
		return this._widthP;
	}
	/**
	 *
	 * @param val
	 */
	public set heightp ( val : number )
	{
		this._heightP = val;
		this.height = String( val ) + '%';
	}
	public get heightp () : number
	{
		return this._heightP;
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
	public set ry ( val : number )
	{
		this.element.setAttribute( 'ry' , String( val ) );
	}
	public get ry () : number
	{
		return parseFloat( this.element.getAttribute( 'ry' ) );
	}
	/**
	 *
	 * @param val
	 */
	public set rx ( val : number )
	{
		this.element.setAttribute( 'rx' , String( val ) );
	}
	public get rx () : number
	{
		return parseFloat( this.element.getAttribute( 'rx' ) );
	}

}

export = SVGRectangle;
