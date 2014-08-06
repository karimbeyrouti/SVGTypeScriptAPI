import SVGFilterBase            = require("./../core/SVGFilterBase");

class SVGBlurFilter extends SVGFilterBase
{

	//---------------------------------------------------------------------------------------------------------

	private feGaussianBlur : SVGFEGaussianBlurElement;
	private _blurX : number = 0;
	private _blurY : number = 0;
	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();

		this.feGaussianBlur = <SVGFEGaussianBlurElement> this.createSVGElement( 'feGaussianBlur' );
		this.feGaussianBlur.setStdDeviation( this._blurX , this._blurY );
		this.appendFilter( this.feGaussianBlur );
	}

	//---------------------------------------------------------------------------------------------------------


	/**
	 *
	 */
	public get blurX () : number
	{
		return  this._blurX;
	}
	public set blurX ( val : number )
	{
		this._blurX = val;
		this.feGaussianBlur.setStdDeviation( this._blurX , this._blurY );
	}
	/**
	 *
	 */
	public get blurY () : number
	{
		return  this._blurY;
	}
	public set blurY ( val : number )
	{
		this._blurY = val;
		this.feGaussianBlur.setStdDeviation( this._blurX , this._blurY );
	}
}

export = SVGBlurFilter;
