import SVGObjectBase        = require("./../core/SVGObjectBase");
import SVGGradientBase      = require("./../core/SVGGradientBase");
import SVGLinearGradient    = require("./SVGLinearGradient");

class SVGGradientStop extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private gradient_ref : SVGGradientBase;

	//---------------------------------------------------------------------------------------------------------

	constructor ( gradient ? : SVGGradientBase , offset ? : string , color ? : string , opacity ? : number )
	{
		super();

		this.initElement( 'svg:stop' );

		if ( gradient )
		{
			this.gradient_ref = gradient;
			this.gradient_ref.appendStop( this );
		}

		this.setData( offset , color , opacity );

	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param offset
	 * @param color
	 * @param opacity
	 */
	public setData ( offset ? : string , color ? : string , opacity ? : number ) : void
	{
		if ( offset )
		{
			this.element.setAttribute( 'offset' , offset );
		}

		if ( color )
		{
			this.element.setAttribute( 'stop-color' , color );
		}

		if ( opacity )
		{
			this.element.setAttribute( 'stop-opacity' , String( opacity ) );
		}
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set alpha ( val : number )
	{
		this.element.setAttribute( 'stop-opacity' , String( val ) );
	}
	public get alpha () : number
	{
		return parseFloat( this.element.getAttribute( 'stop-opacity' ) );
	}
	/**
	 *
	 * @param val
	 */
	public set color ( val : string )
	{
		this.element.setAttribute( 'stop-color' , val );
	}
	public get color () : string
	{
		return this.element.getAttribute( 'stop-color' );
	}
	/**
	 *
	 * @param val
	 */
	public set offset ( val : string )
	{
		this.element.setAttribute( 'offset' , val );
	}
	public get offset () : string
	{
		return this.element.getAttribute( 'offset' );
	}


}

export = SVGGradientStop;