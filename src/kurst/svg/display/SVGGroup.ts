import SVGObjectBase            = require("./../core/SVGObjectBase");

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
	public append ( obj : SVGObjectBase ) : void
	{
		if ( ! this.isChild( obj ))
		{
			this.children.push( obj );
			obj.parentSVGObject = this;
			this.element.appendChild( obj.element );
		}
		else
		{
			this.element.appendChild( obj.element ); // move to front
		}

	}


}

export = SVGGroup;

