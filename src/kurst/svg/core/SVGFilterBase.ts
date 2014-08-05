import SVGObjectBase            = require("./SVGObjectBase");

class SVGFilterBase extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'filter' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param
	 */
	public append ( obj : SVGElement ) : void
	{
		this.element.appendChild( obj );
	}


}

export = SVGFilterBase;
