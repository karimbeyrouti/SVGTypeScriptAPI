import SVGDisplayObjectBase            = require("./../core/SVGDisplayObjectBase");

class SVGImage extends SVGDisplayObjectBase
{

	constructor ()
	{
		super();
		this.initElement( 'image' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set src ( val : string )
	{
		this.element.setAttributeNS( 'http://www.w3.org/1999/xlink' , 'href' , val );
	}
	public get src () : string
	{
		return this.element.getAttributeNS( 'http://www.w3.org/1999/xlink' , 'href' );
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
	 */
	public get alpha () : number
	{
		return  parseFloat( this.element.getAttribute( 'opacity' ) );
	}
	public set alpha ( val : number )
	{
		this.element.setAttribute( 'opacity' , String( val ) );
	}


}

export = SVGImage;
