import SVGDisplayObjectBase	= require("./../core/SVGDisplayObjectBase");
import SVGPathCommandDef    = require("./../data/SVGPathCommandDef");
import SVGPathCommand       = require("./../data/SVGPathCommand");

class SVGPath extends SVGDisplayObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	public static moveto 			: SVGPathCommandDef = new SVGPathCommandDef( 'M' , 'Move To' );
	public static lineto 			: SVGPathCommandDef = new SVGPathCommandDef( 'L' , 'Line To' );
	public static hlineto			: SVGPathCommandDef = new SVGPathCommandDef( 'H' , 'Horizontal Lineto' );
	public static vlineto 			: SVGPathCommandDef = new SVGPathCommandDef( 'V' , 'Vertical Lineto' );
	public static curveto 			: SVGPathCommandDef = new SVGPathCommandDef( 'C' , 'Curve To' );
	public static smoothcurveto 	: SVGPathCommandDef = new SVGPathCommandDef( 'S' , 'Smooth Curveto' );
	public static quadratic 		: SVGPathCommandDef = new SVGPathCommandDef( 'Q' , 'Quadratic Bézier Curve' );
	public static smoothquadratic 	: SVGPathCommandDef = new SVGPathCommandDef( 'T' , 'Smooth Quadratic Bézier Curve' );
	public static arc 				: SVGPathCommandDef = new SVGPathCommandDef( 'A' , 'Elliptical Arc' );
	public static close 			: SVGPathCommandDef = new SVGPathCommandDef( 'Z' , 'Close Path' );

	//---------------------------------------------------------------------------------------------------------

	public commands : Array<SVGPathCommand> = new Array<SVGPathCommand>();
	public relative : boolean = false;
	public drawOnCommand : boolean = true;

	//---------------------------------------------------------------------------------------------------------


	constructor ()
	{
		super();
		this.initElement( 'path' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param command
	 * @param params
	 */
	public addDrawCommand ( command : SVGPathCommandDef , ...params : Array<number> )
	{
		if ( params )
		{
			this.commands.push( new SVGPathCommand( command.code , params ) );
		}
		else
		{
			this.commands.push( new SVGPathCommand( command.code ) );
		}

		if ( this.drawOnCommand )
		{
			this.draw();
		}
	}
	/**
	 *
	 */
	public clear () : void
	{
		this.commands.length = 0;
		this.draw();
	}
	/**
	 *
	 */
	public draw () : void
	{

		if ( this.commands.length == 0 )
		{
			this.element.removeAttribute( 'd' );
			//this.element.setAttribute('d','');
			return;
		}

		var str : string = '';
		var l : number = this.commands.length
		var cmd : SVGPathCommand;
		var code : string;
		var cmdP : Array<number>;
		var cmdL : number;

		for ( var c : number = 0 ; c < l ; c++ )
		{
			cmd = this.commands[c];
			code = cmd.code;
			code = ( this.relative ) ? code.toLowerCase() : code.toUpperCase();
			cmdP = cmd.params;
			cmdL = cmdP.length;

			str += ( c == 0 ) ? code : ' ' + code;

			for ( var d : number = 0 ; d < cmdL ; d++ )
			{
				str += ' ' + cmdP[d];
			}
		}
		this.element.setAttribute( 'd' , str );
	}

}

export = SVGPath;
