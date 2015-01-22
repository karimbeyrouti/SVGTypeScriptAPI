///<reference path="../../libs/waa.d.ts" />
///<reference path="../../libs/usermedia.d.ts" />


import Event = require("./Event");

class UserMediaManagerEvent extends Event
{

	public static MIC_INITIALIZED 			: string = "MIC_INITIALIZED";
	public static MIC_INITIALIZED_ERROR		: string = "MIC_INITIALIZED_ERROR";

	public stream : MediaStream;

	constructor(type:string)
	{
		super(type);
	}
}

export = UserMediaManagerEvent;