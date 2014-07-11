import Event = require("./Event");

class IOErrorEvent extends Event
{

	public static IO_ERROR:string = "ioError";

	constructor(type:string)
	{
		super(type);

	}
}

export = IOErrorEvent;