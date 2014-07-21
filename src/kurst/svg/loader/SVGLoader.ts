import EventDispatcher = require("../../events/EventDispatcher");
import Event = require("../../events/Event");
import IOErrorEvent = require("../../events/IOErrorEvent");
import URLLoader = require("../../net/URLLoader");
import URLLoaderDataFormat = require("../../net/URLLoaderDataFormat");
import URLRequest = require("../../net/URLRequest");
import SVGGroup = require("../display/SVGGroup");
import SVGRectangle = require("../display/SVGRectangle");
import SVGCircle = require("../display/SVGCircle");
import SVGPolygon = require("../display/SVGPolygon");
import SVGPath = require("../display/SVGPath");
import SVGText = require("../display/SVGText");
import SVGObjectBase = require("../core/SVGObjectBase");

class SVGLoader extends EventDispatcher {

	//--------------------------------------------------------------------------

	private loader              : URLLoader;
	private svgElement			: SVGElement;

	//--------------------------------------------------------------------------

	public element				: SVGGroup;
	public elements				: Array<SVGObjectBase> = new Array<SVGObjectBase>();

	//--------------------------------------------------------------------------

	constructor( )
	{
		super();

		this.loader                 = new URLLoader();
		this.loader.dataFormat 		= URLLoaderDataFormat.TEXT;
		this.loader.addEventListener( Event.COMPLETE , ( e : Event ) => this.onLoaded( e ) );
		this.loader.addEventListener( IOErrorEvent.IO_ERROR , ( e : IOErrorEvent) => this.onIOError( e ));

		this.element				= new SVGGroup();
		this.svgElement				= this.element.element;

	}

	//--------------------------------------------------------------------------

	/**
	 *
	 * @param uri
	 */
	public load( uri : string ) : void
	{

		var req = new URLRequest( uri );

		this.loader.load( req );

	}

	// Event Handlers

	/**
	 *
	 * @param e
	 */
	private onIOError( e : Event ) : void
	{
		this.dispatchEvent( new IOErrorEvent( IOErrorEvent.IO_ERROR));
	}
	/**
	 *
	 * @param e
	 */
	private onLoaded( e : Event ) : void
	{

		var parser 		: DOMParser = new DOMParser();
		var XMLdoc 		: XMLDocument = parser.parseFromString(this.loader.data,"text/xml");//.documentElement;

		this.parseSVGHtmlElement( XMLdoc.documentElement );

		this.dispatchEvent( new Event( Event.COMPLETE));

	}

	// Private

	/**
	 *
	 * @param htmlElement
	 */
	private parseSVGHtmlElement( htmlElement : HTMLElement ) : void
	{
		var childNodes 	: NodeList 	= htmlElement.childNodes
		var length 		: number 	= childNodes.length;
		var svgObject	: SVGObjectBase;

		for(var c : number = 0; c < length ; c++)
		{
			var node : Node = childNodes.item( c ).cloneNode( true );

			switch ( node.nodeName )
			{
				case 'g' :

					// TODO : deep clone of group nodes

					svgObject = new SVGGroup();
					svgObject.element = <SVGElement> node;
					this.element.append( svgObject );
					this.elements.push( svgObject );
					break;

				case 'rect':

					svgObject = new SVGRectangle();
					svgObject.element = <SVGElement> node;
					this.element.append( svgObject );
					this.elements.push( svgObject );
					break;

				case 'circle':

					svgObject = new SVGCircle();
					svgObject.element = <SVGElement> node;
					this.element.append( svgObject );
					this.elements.push( svgObject );
					break;

				case 'polygon':

					svgObject = new SVGPolygon();
					svgObject.element = <SVGElement> node;
					this.element.append( svgObject );
					this.elements.push( svgObject );
					break;

				case 'path':

					svgObject = new SVGPath();
					svgObject.element = <SVGElement> node;
					this.element.append( svgObject );
					this.elements.push( svgObject );
					break;

				case 'text':

					svgObject = new SVGText();
					svgObject.element = <SVGElement> node;
					this.element.append( svgObject );
					this.elements.push( svgObject );

					break;

				case '#text':

					// Ignore #text nodes

					break;

				default :

					// Gradients / Animations / Definitions / ... etc;

					this.svgElement.appendChild(node);
					break;
			}

		}
	}
}

export = SVGLoader;