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
	 * @param SVGFilterPrimitive
	 */
	public appendFilter ( SVGFilterPrimitive : SVGElement ) : void
	{
		if ( ! this.containsFilter( SVGFilterPrimitive ))
		{
			this.filters.push( SVGFilterPrimitive );
			this.element.appendChild( SVGFilterPrimitive );
		}
	}
	/**
	 *
	 * @param SVGFilterPrimitive
	 */
	public containsFilter( SVGFilterPrimitive : SVGElement ) : boolean
	{
		var l : number = this.filters.length;
		var o : SVGElement;
		for ( var c : number = 0 ;c < l ;c ++ )
		{
			o = this.filters[c];

			if ( o === SVGFilterPrimitive )
			{
				return true;
			}
		}

		return false;
	}
	/**
	 *
	 * @param SVGFilterPrimitive
	 */
	public removeFilter( SVGFilterPrimitive : SVGElement ) : void
	{
		if ( this.containsFilter( SVGFilterPrimitive ))
		{
			this.element.removeChild( SVGFilterPrimitive );

			var n : SVGElement;
			var l : number = this.filters.length;

			for ( var c : number = 0 ; c < l ; c ++ )
			{
				n = this.filters[c];

				if ( n == SVGFilterPrimitive )
				{
					this.filters.splice(c , 1 );
				}
			}

		}
	}

}

export = SVGFilterBase;
