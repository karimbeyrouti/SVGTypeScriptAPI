import SVGDisplayObjectBase            = require("./../core/SVGDisplayObjectBase");
import Point            = require("../../geom/Point");

class SVGPolygon extends SVGDisplayObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	private points : Array<Point> = new Array<Point>();

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'polygon' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param val
	 */
	public set stroke ( val : any )
	{
		this.element.setAttribute( 'stroke' , String( val ) );
	}
	public get stroke () : any
	{
		return this.element.getAttribute( 'stroke' );
	}
	/**
	 *
	 * @param val
	 */
	public set strokewidth ( val : number )
	{
		this.element.setAttribute( 'stroke-width' , String( val ) );
	}
	public get strokewidth () : number
	{
		return parseFloat( this.element.getAttribute( 'stroke-width' ) );
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

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param x
	 * @param y
	 */
	public addPoint ( x : number , y : number ) : void
	{
		this.points.push( new Point( x , y ) );
		this.updatePoly();
	}
	/**
	 *
	 */
	public updatePoly () : void
	{
		var pString : string = '';
		var l : number = this.points.length;
		var p : Point;

		for ( var c : number = 0 ; c < l ; c++ )
		{
			p = this.points[c];
			pString += p.x + ',' + p.y + ' ';
		}

		this.element.setAttribute( 'points' , pString );

	}

}

export = SVGPolygon;
