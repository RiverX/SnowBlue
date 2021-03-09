class GameScene extends BaseScene {

	private lastLogicTime: number = 0;
	public pastAllTime: number = 0;


	public constructor() {
		super();
	}

	public onLoad(...args: any[]) {
		

		this.startFrameUpdate();
	}
	private startFrameUpdate() {
		this.pastAllTime = 0;
		this.lastLogicTime = new Date().getTime();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onGameUpdate, this);

		//this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLineOnStage, this);
	}
	private onGameUpdate(): boolean {
		let elapsedTicks = new Date().getTime();
		if (this.lastLogicTime == elapsedTicks) {
			return false;
		}
		let pastTime: number = elapsedTicks - this.lastLogicTime;
		this.pastAllTime = this.pastAllTime + pastTime;
		this.lastLogicTime = elapsedTicks;
		this.onLogicUpdate(pastTime / 1000);
		return true;
	}
	private onLogicUpdate(pre: number) {
		//console.log("====" + pre);

        /*this.pos1.y = this.ball1.y
        this.pos1.y -= this.vy;
        this.ball1.y = this.pos1.y;*/

        /*let angle = 100;
        let temp = angle * (Math.PI / 180);
        let speed = this.vy;
        this.ball2.x -= speed * Math.cos(temp);
        this.ball2.y -= speed * Math.sin(temp);*/
	}
	public onUnLoad() {
		this.removeChildren();
	}
}