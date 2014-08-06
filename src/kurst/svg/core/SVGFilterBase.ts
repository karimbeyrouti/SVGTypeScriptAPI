import SVGObjectBase        = require("./SVGObjectBase");
import SVGGradientBase		= require("./SVGGradientBase");

class SVGFilterBase extends SVGObjectBase
{

	//---------------------------------------------------------------------------------------------------------

	public filters 		: Array<SVGElement> = new Array<SVGElement>();

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
		this.initElement( 'filter' );
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param d3Object
	 */
	public appendFilter ( obj : SVGElement ) : void
	{
		if ( ! this.containsFilter( obj ))
		{
			this.filters.push( obj );
			this.element.appendChild( obj );
		}
	}
	/**
	 *
	 * @param obj
	 * @returns {boolean}
	 */
	public containsFilter( obj : SVGElement ) : boolean
	{
		var l : number = this.filters.length;
		var o : SVGElement;
		for ( var c : number = 0 ;c < l ;c ++ )
		{
			o = this.filters[c];

			if ( o === obj )
			{
				return true;
			}
		}

		return false;
	}
	/**
	 *
	 * @param obj
	 */
	public removeFilter( obj : SVGElement ) : void
	{
		if ( this.containsFilter( obj ))
		{
			this.element.removeChild( obj );

			var n : SVGElement;
			var l : number = this.filters.length;

			for ( var c : number = 0 ; c < l ; c ++ )
			{
				n = this.filters[c];

				if ( n == obj )
				{
					this.filters.splice(c , 1 );
				}
			}

		}
	}

}

export = SVGFilterBase;
