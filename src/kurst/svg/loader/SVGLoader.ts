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
import SVGDisplayObjectBase = require("./../core/SVGDisplayObjectBase");

class SVGLoader extends EventDispatcher {

	//--------------------------------------------------------------------------

	private loader              : URLLoader;
    private _url                : string;

	//--------------------------------------------------------------------------

	public element				: SVGGroup;
	public children				: Array<SVGDisplayObjectBase> = new Array<SVGDisplayObjectBase>();

	//--------------------------------------------------------------------------

	constructor( )
	{
		super();

		this.loader                 = new URLLoader();
		this.loader.dataFormat 		= URLLoaderDataFormat.TEXT;
		this.loader.addEventListener( Event.COMPLETE , ( e : Event ) => this.onLoaded( e ) );
		this.loader.addEventListener( IOErrorEvent.IO_ERROR , ( e : IOErrorEvent) => this.onIOError( e ));

		this.element				= new SVGGroup();

	}

	//--------------------------------------------------------------------------

	/**
	 *
	 * @param uri
	 */
	public load( uri : string ) : void
	{
		this.loader.load( new URLRequest( uri ) );
        this._url = uri;
	}

    /**
     *
     * @returns {string}
     */
    public get url () : string
    {
        return this._url;
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

		this.parseSVGHtmlElement( XMLdoc.documentElement.childNodes );
		this.dispatchEvent( new Event( Event.COMPLETE));

	}

	// Private

	/**
	 *
	 * @param htmlElement
	 */
	private parseSVGHtmlElement( nodeList : NodeList , parentGroup ? : SVGGroup ) : void
	{
		var length 			: number 	= nodeList.length;
		var svgObject		: SVGDisplayObjectBase;
		var parent			: SVGGroup = ( parentGroup== null ) ? this.element : parentGroup;
		var isNestedGroup	: boolean = !( parentGroup == null );
		var addToElements	: boolean = false;

		for(var c : number = 0; c < length ; c++)
		{
			var node : Node = nodeList.item( c ).cloneNode( true );
			addToElements = false;

			switch ( node.nodeName )
			{
				case 'g' :

					svgObject = new SVGGroup();

					if ( node.childNodes.length > 0 )
						this.parseSVGHtmlElement( node.childNodes , <SVGGroup> svgObject );

					svgObject.element = <SVGElement> node;
					parent.append( svgObject );
					addToElements = !isNestedGroup;
					break;

				case 'rect':

					svgObject = new SVGRectangle();
					svgObject.element = <SVGElement> node;
					parent.append( svgObject );
					addToElements = true;
					break;

				case 'circle':

					svgObject = new SVGCircle();
					svgObject.element = <SVGElement> node;
					parent.append( svgObject );
					addToElements = true;
					break;

				case 'polygon':

					svgObject = new SVGPolygon();
					svgObject.element = <SVGElement> node;
					parent.append( svgObject );
					addToElements = true;
					break;

				case 'path':
					svgObject = new SVGPath();
					svgObject.element = <SVGElement> node;
					parent.append( svgObject );
					addToElements = true;
					break;

				case 'text':

					svgObject = new SVGText();
					svgObject.element = <SVGElement> node;
					parent.append( svgObject );
					addToElements = true;
					break;

				case '#text':// Ignore #text nodes
					addToElements = false;
					break;

				default :// Gradients / Animations / Definitions / ... etc;

					addToElements = false;
					parent.element.appendChild(node);
					break;
			}

			if ( addToElements && ! isNestedGroup )
			{
				this.children.push( svgObject );
			}

		}

	}
}

export = SVGLoader;