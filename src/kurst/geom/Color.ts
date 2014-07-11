
class Color
{
	//------------------------------------------------------------------

	public static random() : string
	{
		return "#"+((1<<24)*Math.random()|0).toString(16);
	}

	//------------------------------------------------------------------

	public r : number = 1;
	public g : number = 1;
	public b : number = 1;

	//------------------------------------------------------------------

	constructor( r ? : number , g ? : number , b ? : number )
	{
		if ( r != null && g != null && b != null )
		{
			this.setRGB( r, g, b );
		}
	}

	//------------------------------------------------------------------

	/**
	 *
	 * @param value
	 * @returns {Color}
	 */
	public set ( value : any ) : Color
	{

		if ( value instanceof Color )
		{

			this.copy( value );

		}
		else if ( typeof value === 'number' )
		{

			this.setHex( value );

		}
		else if ( typeof value === 'string' )
		{

			this.setStyle( value );

		}

		return this;

	}
	/**
	 *
	 * @param hex
	 * @returns {Color}
	 */
	public setHex ( hex ) : Color
	{

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	}
	/**
	 *
	 * @param r
	 * @param g
	 * @param b
	 * @returns {Color}
	 */
	public setRGB ( r, g, b ) : Color
	{

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	}
	/**
	 *
	 * @param h
	 * @param s
	 * @param l
	 * @returns {Color}
	 */
	public setHSL( h, s, l )  : Color
	{

		// h,s,l ranges are in 0.0 - 1.0

		if ( s === 0 )
		{

			this.r = this.g = this.b = l;

		}
		else
		{

			var hue2rgb = function ( p, q, t )
			{

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			};

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	}
	/**
	 *
	 * @param style
	 * @returns {Color}
	 */
	public setStyle ( style : any ) : Color
	{

		// rgb(255,0,0)

		if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) )
		{

			var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );

			this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
			this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
			this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

			return this;

		}

		// rgb(100%,0%,0%)

		if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) )
		{

			var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );

			this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
			this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
			this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

			return this;

		}

		// #ff0000

		if ( /^\#([0-9a-f]{6})$/i.test( style ) )
		{

			var color = /^\#([0-9a-f]{6})$/i.exec( style );

			this.setHex( parseInt( color[ 1 ], 16 ) );

			return this;

		}

		// #f00

		if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) )
		{

			var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );

			this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );

			return this;

		}

	}
	/**
	 *
	 * @param color
	 * @returns {Color}
	 */
	public copy ( color : Color ) : Color
	{

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	}
	/**
	 *
	 * @param color
	 * @returns {Color}
	 */
	public copyGammaToLinear( color : Color ) : Color
	{

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;

	}
	/**
	 *
	 * @param color
	 * @returns {Color}
	 */
	public copyLinearToGamma ( color : Color ) : Color
	{

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;

	}
	/**
	 *
	 * @returns {Color}
	 */
	public convertGammaToLinear () : Color
	{

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	}
	/**
	 *
	 * @returns {Color}
	 */
	public convertLinearToGamma () : Color
	{

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	}
	/**
	 *
	 * @returns {number}
	 */
	public getHex (): number
	{

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	}
	/**
	 *
	 * @returns {string}
	 */
	public getHexString () : string
	{

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	}
	/**
	 *
	 * @param optionalTarget
	 * @returns {any|{h: number, s: number, l: number}}
	 */
	public getHSL( optionalTarget ? ) : any
	{

		// h,s,l ranges are in 0.0 - 1.0

		var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

		var r = this.r, g = this.g, b = this.b;

		var max = Math.max( r, g, b );
		var min = Math.min( r, g, b );

		var hue, saturation;
		var lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			var delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		hsl.h = hue;
		hsl.s = saturation;
		hsl.l = lightness;

		return hsl;

	}
	/**
	 *
	 * @returns {string}
	 */
	public getStyle () : string
	{

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	}
	/**
	 *
	 * @param h
	 * @param s
	 * @param l
	 * @returns {Color}
	 */
	public offsetHSL( h, s, l ) : Color
	{

		var hsl = this.getHSL();
			hsl.h += h; hsl.s += s; hsl.l += l;

		this.setHSL( hsl.h, hsl.s, hsl.l );

		return this;

	}
	/**
	 *
	 * @param color
	 * @returns {Color}
	 */
	public add ( color : Color ) : Color
	{

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	}
	/**
	 *
	 * @param color1
	 * @param color2
	 * @returns {Color}
	 */
	public addColors( color1 : Color , color2 : Color ) : Color
	{

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	}
	/**
	 *
	 * @param s
	 * @returns {Color}
	 */
	public addScalar( s : number ) : Color
	{

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	}
	/**
	 *
	 * @param color
	 * @returns {Color}
	 */
	public multiply( color : Color ) : Color
	{

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	}
	/**
	 *
	 * @param s
	 * @returns {Color}
	 */
	public multiplyScalar( s : number ) : Color
	{

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	}
	/**
	 *
	 * @param color
	 * @param alpha
	 * @returns {Color}
	 */
	public lerp ( color : Color , alpha : number ) : Color
	{

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	}
	/**
	 *
	 * @param c
	 * @returns {boolean}
	 */
	public equals ( c : Color ) : boolean
	{

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	}
	/**
	 *
	 * @returns {Color}
	 */
	public clone () : Color
	{

		return new Color().setRGB( this.r, this.g, this.b );

	}
}

export = Color;