import SVGPath                    = require("./SVGPath");
import Point                    = require("../../geom/Point");

/**
 * Notes:
 *
 *  http://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path
 *  http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
 *
 */

class SVGArc extends SVGPath
{


	//---------------------------------------------------------------------------------------------------------

	private startPoint : Point = new Point();
	private endPoint : Point = new Point();
	private _radius : number = 10;
	private arcSweep : number = 0;
	private _startAngle : number = 0;
	private _endAngle : number = 359.99;

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();

		this.fillOpacity = 0;
		this.stroke = '#000000';
		this.strokewidth = 10;

		this.drawOnCommand = false;
		this.addDrawCommand( SVGPath.moveto , this.startPoint.x , this.startPoint.y );
		this.drawOnCommand = true;
		this.addDrawCommand( SVGPath.arc , this._radius , this._radius , 0 , this.arcSweep , 0 , this.endPoint.x , this.endPoint.y );

	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param centerX
	 * @param centerY
	 * @param radius
	 * @param angleInDegrees
	 * @param point
	 * @returns {Point}
	 */
	private polarToCartesian ( centerX : number , centerY : number , radius : number , angleInDegrees : number , point ? : Point ) : Point
	{
		var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

		if ( point )
		{
			point.x = centerX + (radius * Math.cos( angleInRadians ));
			point.y = centerY + (radius * Math.sin( angleInRadians ));

			return point;
		}

		return new Point( centerX + (radius * Math.cos( angleInRadians )) , centerY + (radius * Math.sin( angleInRadians )) );
	}
	/**
	 *
	 * @param x
	 * @param y
	 * @param radius
	 * @param startAngle
	 * @param endAngle
	 */
	private updateArc ( x : number , y : number , radius : number , startAngle : number , endAngle : number )
	{

		this.polarToCartesian( x , y , radius , endAngle , this.startPoint );
		this.polarToCartesian( x , y , radius , startAngle , this.endPoint );
		this.arcSweep = endAngle - startAngle <= 180 ? 0 : 1;

		this.commands[0].params[0] = this.startPoint.x;
		this.commands[0].params[1] = this.startPoint.y;

		this.commands[1].params[0] = radius;
		this.commands[1].params[1] = radius;
		this.commands[1].params[2] = 0;
		this.commands[1].params[3] = this.arcSweep;
		this.commands[1].params[4] = 0;
		this.commands[1].params[5] = this.endPoint.x;
		this.commands[1].params[6] = this.endPoint.y;

	}
	/**
	 *
	 */
	public draw () : void
	{
		this.updateArc( this.x , this.y , this._radius , this.startAngle , this.endAngle );
		super.draw();
	}
	/**
	 *
	 */
	public updateTransform () : void
	{
		this.draw();
		this.element.setAttribute( "transform" , "rotate(" + this.rotation + "," + (this.x + this.registration.x ) + ", " + (this.y + this.registration.y ) + ")" );
	}
	/**
	 *
	 * @param val
	 */
	public set startAngle ( val : number )
	{
		this._startAngle = val;
		this.draw();
	}
	public get startAngle () : number
	{
		return this._startAngle;
	}
	/**
	 *
	 * @param val
	 */
	public set endAngle ( val : number )
	{
		this._endAngle = val;
		this.draw();
	}
	public get endAngle () : number
	{
		return this._endAngle;
	}
	/**
	 *
	 * @param val
	 */
	public set radius ( val : number )
	{
		this._radius = val;
		this.draw();
	}
	public get radius () : number
	{
		return this._radius;
	}

}

export = SVGArc;
