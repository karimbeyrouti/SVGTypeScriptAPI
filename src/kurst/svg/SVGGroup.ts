import SVGObjectBase            = require("./SVGObjectBase");

class SVGGroup extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'g' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param d3Object
	 */
	public append ( d3Object : SVGObjectBase ) : void
	{
		this.element.appendChild( d3Object.element );
	}


}

export = SVGGroup;

