import Event                = require("../../events/Event");
import EventDispatcher      = require("../../events/EventDispatcher");
import SVGDisplayObjectBase = require("./SVGDisplayObjectBase");

class DisplayObjectManager extends EventDispatcher
{

	//---------------------------------------------------------------------------------------------------------

	private objects              : Array<SVGDisplayObjectBase>   = new Array<SVGDisplayObjectBase>();
	private _objectsLen         : number                        = 0;
	private counter             : number                        = 0;
	private objectsDictionary   : Object                        = new Object();
	private tmp                 : SVGDisplayObjectBase;

	//---------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param obj
	 */
	public flagAsDirty( obj  : SVGDisplayObjectBase ) : void
	{
		if ( this.objectsDictionary[obj.__ID] != true )
		{
			this.objectsDictionary[obj.__ID] = true;
			this.objects.push( obj );
			this._objectsLen = this.objects.length;
		}
	}

	//---------------------------------------------------------------------------------------------------------

	/**
	 *
	 * @param obj
	 */
	private removeElement ( obj : SVGDisplayObjectBase ) : void
	{
		var objIndex : number = this.isObjectAdded( obj );

		if ( objIndex != -1 )
		{
			this.objects.splice( objIndex , 1 );
		}
	}
	/**
	 *
	 * @param obj
	 * @returns {number}
	 */
	private isObjectAdded( obj : SVGDisplayObjectBase ) : number
	{
		for ( var c : number = 0 ; c < this.objects.length ; c ++ )
		{
			if ( this.objects[c] == obj )
			{
				return c;
			}
		}
		return -1;
	}
	/**
	 *
	 * @private
	 */
	public update() : void
	{
		if ( this._objectsLen == 0 ) return;

		for ( this.counter = 0 ; this.counter < this._objectsLen ; this.counter ++ )
		{
			this.tmp = this.objects[ this.counter ];
			this.tmp.updateTransform();
			this.objectsDictionary[ this.tmp.__ID ] = false;
		}

		this.objects.splice( 0 , this.objects.length );
		this._objectsLen = 0;
	}
}

export = DisplayObjectManager;
