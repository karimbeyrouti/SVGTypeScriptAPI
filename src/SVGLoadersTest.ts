import EventDispatcher  = require("./kurst/events/EventDispatcher");
import Event            = require("./kurst/events/Event");
import SVGCanvas        = require("./kurst/svg/display/SVGCanvas");
import SVGRectangle     = require("./kurst/svg/display/SVGRectangle");
import SVGGroup         = require("./kurst/svg/display/SVGGroup");
import SVGLoader		= require("./kurst/svg/loader/SVGLoader");

class SVGLoadersTest extends EventDispatcher
{

	//------------------------------------------------------------------------------------------------------------------------------

	private container 			: HTMLDivElement;
	private svg 				: SVGCanvas;
	private background			: SVGRectangle;
    private loadersNames        : Array<string> = new Array<string>(    'audio.svg' , 'ball-triangle.svg' , 'bars.svg' , 'circles.svg' , 'grid.svg', 'hearts.svg' , 'oval.svg' , 'puff.svg' , 'rings.svg' , 'spinning-circles.svg' , 'tail-spin.svg' , 'three-dots.svg' );
    private loadersScales       : Array<number> = new Array<number>(    .4          , .5                  , .25        , .25           , .25        , .25          , 1         , 1          , 1           , .75                    , 1               , .4);
    private row                 : number = 0 ;
    private col                 : number = 0 ;
    private group               : SVGGroup;

	//------------------------------------------------------------------------------------------------------------------------------

	constructor ()
	{
		super();

        this.container = document.createElement( 'div' );

        // Init mouse / resize handlers
        document.body.appendChild( this.container );
        window.addEventListener( 'resize' , () => this.onResize() );

        // SVG Canvas
        this.svg = new SVGCanvas( this.container );
        this.svg.width = 800;
        this.svg.height = 600;

        // Create background
        this.background = new SVGRectangle();
        this.background.fill( '#000000');
        this.svg.append( this.background );

		this.group = new SVGGroup();
		this.svg.append( this.group );

        var svgLoad : SVGLoader;
        for ( var c : number = 0 ; c <  this.loadersNames.length ; c ++ )
        {
            svgLoad = new SVGLoader();
            svgLoad.load( 'assets/loaders/' + this.loadersNames[c]);
            svgLoad.addEventListener( Event.COMPLETE , ( e : Event ) => this.svgLoaded(e ));
        }

        this.onResize();

    }
    /**
     *
     * @param e
     */
    private svgLoaded( e : Event ) : void
    {

        var loader : SVGLoader = <SVGLoader> e.target;

        if ( this.col == 3 )
        {
            this.col = 0;
            this.row ++;
        }

        loader.element.id       = loader.url;
        loader.element.scaleX   = loader.element.scaleY = this.getScale( loader.url );
        loader.element.x        = this.col * 80;
        loader.element.y        = this.row * 80;

        this.group.append( loader.element );
        this.col ++;
	    this.onResize();
    }
	/**
	 *
	 * @param url
	 * @returns {number}
	 */
    private getScale( url : string ) : number
    {
        var fullPath : string;fullPath

        for ( var c : number = 0 ; c < this.loadersNames.length ; c ++ )
        {
            fullPath  ='assets/loaders/' + this.loadersNames[c];
            if (fullPath == url )
            {
                return this.loadersScales[c];
            }
        }


        return 1;
    }
	/**
	 * Resize Event Handler
	 */
	private onResize () : void
	{
        this.background.width 	= this.svg.width = window.innerWidth;
        this.background.height 	= this.svg.height = window.innerHeight;

		this.group.x = ( window.innerWidth - this.group.width ) / 2;
		this.group.y = ( window.innerHeight - this.group.height ) / 2;
	}
}

export = SVGLoadersTest;