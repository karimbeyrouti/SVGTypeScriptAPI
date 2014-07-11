import Event = require("./Event");

class HTTPStatusEvent extends Event
{

	public static HTTP_STATUS:string = "HTTPStatusEvent_HTTP_STATUS";

	public status:number;

	constructor(type:string, status:number = null)
	{
		super(type);

		this.status = status;

	}
}

export = HTTPStatusEvent;