import SVGDisplayObjectBase            = require("./../core/SVGDisplayObjectBase");

class SVGText extends SVGDisplayObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'text' );
		this.element.setAttribute( "pointer-events" , "all" )
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set font ( val : string )
	{
		this.element.setAttribute( 'font-family' , val );
	}
	public get font () : string
	{
		return this.element.getAttribute( 'font-family' );
	}
	/**
	 *
	 * @param val
	 */
	public set fontsize ( val : string )
	{
		this.element.setAttribute( 'font-size' , val );
	}
	public get fontsize () : string
	{
		return this.element.getAttribute( 'font-size' );
	}
	/**
	 *
	 * @param val
	 */
	public set text ( val : string )
	{
		this.element.textContent = val;
	}
	public get text () : string
	{
		return this.element.textContent;
	}


}

export = SVGText;
