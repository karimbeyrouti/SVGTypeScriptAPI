import SVGObjectBase            = require("./SVGObjectBase");

class Filter extends SVGObjectBase
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

export = Filter;
