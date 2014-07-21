import URLRequestMethod 			= require("./URLRequestMethod");
/**
 *
 */
class URLRequest
{

	//public authenticate     : boolean = false;
	//public cacheResponse    : boolean = true;
	//public idleTimeout      : number;
	//public requestHeader    : Array;
	//public userAgent        : string;

	/*
	 * The MIME content type of the content in the the data property.
	 * @type {string}
	 */
	//public contentType      : string = 'application/x-www-form-urlencoded'; //Note: Not used for now.

	/**
	 * Object containing data to be transmited with URL Request ( URL Variables / binary / string )
	 *
	 */
	public data:any;

	/**
	 *
	 * kurst.net.URLRequestMethod.GET
	 * kurst.net.URLRequestMethod.POST
	 *
	 * @type {string}
	 */
	public method:string = URLRequestMethod.GET;

	/**
	 * Use asynchronous XMLHttpRequest
	 * @type {boolean}
	 */
	public async:boolean = true;

	/**
	 *
	 */
	private _url:string;

	/**

	 * @param url
	 */
	constructor(url:string = null)
	{
		this._url = url;
	}

	/**
	 *
	 * @returns {string}
	 */
	public get url():string
	{
		return this._url;
	}

	/**
	 *
	 * @param value
	 */
	public set url(value:string)
	{
		this._url = value;
	}

	/**
	 * dispose
	 */
	public dispose():void
	{
		this.data = null;
		this._url = null;
	}
}

export = URLRequest;