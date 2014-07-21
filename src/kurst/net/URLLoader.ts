import EventDispatcher 		= require("../events/EventDispatcher");
import Event 				= require("../events/Event");
import IOErrorEvent 		= require("../events/IOErrorEvent");
import ProgressEvent	 	= require("../events/ProgressEvent");
import HTTPStatusEvent	 	= require("../events/HTTPStatusEvent");
import URLLoaderDataFormat 	= require("./URLLoaderDataFormat");
import URLRequest 			= require("./URLRequest");
import URLRequestMethod		= require("./URLRequestMethod");
import URLVariables			= require("./URLVariables");

/**
 * The URLLoader is used to load a single file, as part of a resource.
 *
 * While URLLoader can be used directly, e.g. to create a third-party asset
 * management system, it's recommended to use any of the classes Loader3D, AssetLoader
 * and AssetLibrary instead in most cases.
 *
 * @see AssetLoader
 * @see kurst.library.AssetLibrary
 */
class URLLoader extends EventDispatcher
{
	private _XHR:XMLHttpRequest;
	private _bytesLoaded:number = 0;
	private _bytesTotal:number = 0;
	private _dataFormat:string = URLLoaderDataFormat.TEXT;
	private _loadError:boolean = false;

	private _request:URLRequest;
	private _data:any;

	private _loadStartEvent:Event;
	private _loadErrorEvent:IOErrorEvent;
	private _loadCompleteEvent:Event;
	private _progressEvent:ProgressEvent;

	/**
	 * Creates a new URLLoader object.
	 */
	constructor()
	{
		super();
	}

	/**
	 *
	 */
	public get url():string
	{

		return this._request? this._request.url : '';
	}

	/**
	 *
	 */
	public get data():any
	{
		return this._data;
	}
	/**
	 *
	 */
	public set data( d : any )
	{
		this._data = d;
	}

	/**
	 *
	 * kurst.net.URLLoaderDataFormat.BINARY
	 * kurst.net.URLLoaderDataFormat.TEXT
	 * kurst.net.URLLoaderDataFormat.VARIABLES
	 *
	 * @param format
	 */
	public set dataFormat(format:string)
	{
		this._dataFormat = format;
	}

	public get dataFormat():string
	{
		return this._dataFormat;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get bytesLoaded():number
	{
		return this._bytesLoaded;
	}

	/**
	 *
	 * @returns {number}
	 */
	public get bytesTotal():number
	{
		return this._bytesTotal;
	}

	/**
	 * Load a resource from a file.
	 *
	 * @param request The URLRequest object containing the URL of the object to be loaded.
	 */
	public load(request:URLRequest):void
	{
		this._request = request;

		this.initXHR();

		if (request.method === URLRequestMethod.POST)
			this.postRequest(request);
		else
			this.getRequest(request);
	}

	/**
	 *
	 */
	public close():void
	{
		this._XHR.abort();
		this.disposeXHR();
	}

	/**
	 *
	 */
	public dispose():void
	{
		if (this._XHR)
			this._XHR.abort();

		this.disposeXHR();

		this._data = null;
		this._dataFormat = null;
		this._bytesLoaded = null;
		this._bytesTotal = null;
	}

	/**
	 *
	 * @param xhr
	 * @param responseType
	 */
	private setResponseType(xhr:XMLHttpRequest, responseType:string):void
	{
		switch (responseType) {
			case URLLoaderDataFormat.ARRAY_BUFFER:
			case URLLoaderDataFormat.BLOB:
			case URLLoaderDataFormat.TEXT:
				xhr.responseType = responseType;
				break;

			case URLLoaderDataFormat.VARIABLES:
				xhr.responseType = URLLoaderDataFormat.TEXT;
				break;

			case URLLoaderDataFormat.BINARY:
				xhr.responseType = '';
				break;

			default:
		}
	}

	/**
	 *
	 * @param request {kurst.net.URLRequest}
	 */
	private getRequest(request:URLRequest):void
	{
		try {
			this._XHR.open(request.method, request.url, request.async);
			this.setResponseType(this._XHR, this._dataFormat);
			this._XHR.send(); // No data to send
		} catch (e /* <XMLHttpRequestException> */) {
			this.handleXmlHttpRequestException(e);
		}
	}

	/**
	 *
	 * @param request {kurst.net.URLRequest}
	 */
	private postRequest(request:URLRequest):void
	{
		this._loadError = false;

		this._XHR.open(request.method, request.url, request.async);

		if (request.data != null) {
			if (request.data instanceof URLVariables) {
				var urlVars:URLVariables = <URLVariables> request.data;

				try {
					this._XHR.responseType = 'text';
					this._XHR.send(urlVars.formData);
				} catch (e /* <XMLHttpRequestException> */) {
					this.handleXmlHttpRequestException(e);
				}
			} else {
				this.setResponseType(this._XHR, this._dataFormat);

				if (request.data)
					this._XHR.send(request.data); // TODO: Test
				else
					this._XHR.send(); // no data to send
			}
		} else {
			this._XHR.send(); // No data to send
		}

	}

	/**
	 *
	 * @param error {XMLHttpRequestException}
	 */
	private handleXmlHttpRequestException(error:any /* <XMLHttpRequestException> */):void
	{
		switch (error.code) {

		/******************************************************************************************************************************************************************************************************
		 *
		 *  XMLHttpRequestException { message: "NETWORK_ERR: XMLHttpRequest Exception 101", name: "NETWORK_ERR", code: 101, stack: "Error: A network error occurred in synchronous req…",NETWORK_ERR: 101… }
		 *  code: 101 , message: "NETWORK_ERR: XMLHttpRequest Exception 101" ,  name: "NETWORK_ERR"
		 *
		 ******************************************************************************************************************************************************************************************************/

			case 101:
				// Note: onLoadError event throws IO_ERROR event - this case is already Covered
				break;
		}
	}

	/**
	 *
	 */
	private initXHR()
	{
		if (!this._XHR) {
			this._XHR = new XMLHttpRequest();

			this._XHR.onloadstart = (event) => this.onLoadStart(event);                 // loadstart	        - When the request starts.
			this._XHR.onprogress = (event) => this.onProgress(event);	                // progress	            - While loading and sending data.
			this._XHR.onabort = (event) => this.onAbort(event);	                        // abort	            - When the request has been aborted, either by invoking the abort() method or navigating away from the page.
			this._XHR.onerror = (event) => this.onLoadError(event);                     // error	            - When the request has failed.
			this._XHR.onload = (event) => this.onLoadComplete(event);                   // load	                - When the request has successfully completed.
			this._XHR.ontimeout = (event) => this.onTimeOut(event);                     // timeout	            - When the author specified timeout has passed before the request could complete.
			this._XHR.onloadend = (event) => this.onLoadEnd(event);                     // loadend	            - When the request has completed, regardless of whether or not it was successful.
			this._XHR.onreadystatechange = (event) => this.onReadyStateChange(event);   // onreadystatechange   - When XHR state changes
		}
	}

	/**
	 *
	 */
	private disposeXHR()
	{
		if (this._XHR !== null) {
			this._XHR.onloadstart = null;
			this._XHR.onprogress = null;
			this._XHR.onabort = null;
			this._XHR.onerror = null;
			this._XHR.onload = null;
			this._XHR.ontimeout = null;
			this._XHR.onloadend = null;
			this._XHR = null;
		}
	}

	/**
	 *
	 * @param source
	 */
	public decodeURLVariables(source:string):Object
	{
		var result:Object = new Object();

		source = source.split("+").join(" ");

		var tokens, re = /[?&]?([^=]+)=([^&]*)/g;

		while (tokens = re.exec(source))
			result[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);

		return result;
	}

	// XMLHttpRequest - Event Handlers

	/**
	 * When XHR state changes
	 * @param event
	 */
	private onReadyStateChange(event)
	{
		if (this._XHR.readyState == 4) {
			if (this._XHR.status == 404) {
				this._loadError = true;

				if (!this._loadErrorEvent)
					this._loadErrorEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR);

				this.dispatchEvent(this._loadErrorEvent);
			}

			this.dispatchEvent(new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, this._XHR.status));
		}
	}

	/**
	 * When the request has completed, regardless of whether or not it was successful.
	 * @param event
	 */
	private onLoadEnd(event)
	{
		if (this._loadError === true)
			return;
	}

	/**
	 * When the author specified timeout has passed before the request could complete.
	 * @param event
	 */
	private onTimeOut(event)
	{
		//TODO: Timeout not currently implemented ( also not part of AS3 API )
	}

	/**
	 * When the request has been aborted, either by invoking the abort() method or navigating away from the page.
	 * @param event
	 */
	private onAbort(event)
	{
		// TODO: investigate whether this needs to be an IOError
	}

	/**
	 * While loading and sending data.
	 * @param event
	 */
	private onProgress(event)
	{
		if (!this._progressEvent)
			this._progressEvent = new ProgressEvent(ProgressEvent.PROGRESS);

		this._progressEvent.bytesTotal = event.total;
		this._progressEvent.bytesLoaded = event.loaded;

		this.dispatchEvent(this._progressEvent);
	}

	/**
	 * When the request starts.
	 * @param event
	 */
	private onLoadStart(event)
	{
		if (!this._loadStartEvent)
			this._loadStartEvent = new Event(Event.OPEN);

		this.dispatchEvent(this._loadStartEvent);
	}

	/**
	 * When the request has successfully completed.
	 * @param event
	 */
	private onLoadComplete(event)
	{
		if (this._loadError === true)
			return;

		switch (this._dataFormat) {
			case URLLoaderDataFormat.TEXT:
				this._data = this._XHR.responseText;
				break;

			case URLLoaderDataFormat.VARIABLES:
				this._data = this.decodeURLVariables(this._XHR.responseText);
				break;

			case URLLoaderDataFormat.BLOB:
			case URLLoaderDataFormat.ARRAY_BUFFER:
			case URLLoaderDataFormat.BINARY:
				this._data = this._XHR.response;
				break;

			default:
				this._data = this._XHR.responseText;
				break;
		}

		if (!this._loadCompleteEvent)
			this._loadCompleteEvent = new Event(Event.COMPLETE);

		this.dispatchEvent(this._loadCompleteEvent);
	}

	/**
	 * When the request has failed. ( due to network issues ).
	 * @param event
	 */
	private onLoadError(event)
	{
		this._loadError = true;

		if (!this._loadErrorEvent)
			this._loadErrorEvent = new IOErrorEvent(IOErrorEvent.IO_ERROR);

		this.dispatchEvent(this._loadErrorEvent);
	}
}

export = URLLoader;