abstract class BaseScene extends egret.DisplayObjectContainer{
	
	public constructor() {
		super();
		//this.touchEnabled = false;
	}

	public abstract onLoad();
	public abstract onUnLoad();
}