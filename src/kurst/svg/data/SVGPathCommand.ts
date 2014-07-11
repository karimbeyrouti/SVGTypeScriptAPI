class SVGPathCommand
{

	//---------------------------------------------------------------------------------------------------------

	public code : string;
	public params : Array<number> = new Array<number>();

	//---------------------------------------------------------------------------------------------------------

	constructor ( code : string , args : Array<number> = null )
	{
		this.code = code;
		this.params = args;
	}

	//---------------------------------------------------------------------------------------------------------


}

export = SVGPathCommand;