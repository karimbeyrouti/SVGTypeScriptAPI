import SVGDisplayObjectBase            = require("./../core/SVGDisplayObjectBase");

class SVGGroup extends SVGDisplayObjectBase
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
	public append ( obj : SVGDisplayObjectBase ) : void
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

