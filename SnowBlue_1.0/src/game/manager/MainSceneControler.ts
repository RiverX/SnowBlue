class MainSceneControler extends game.ViewBase {


	private static instance: MainSceneControler;

	private lastLogicTime: number = 0;
	public pastAllTime: number = 0;

	private bgView: game.MainScenceView;

	private tapBeginTime: number = 0;
	private lastTap: game.HeroView;
	private isTouching: boolean = false;

	public constructor() {
		super();
	}
	public static getInstance(): MainSceneControler {
		if (this.instance == null) {
			this.instance = new MainSceneControler();
		}
		return this.instance;
	}
	protected createChildren() {
		super.createChildren();
		//this.onLoad();
	}
	public onLoad(...args: any[]) {
		this.touchEnabled = true;

		this.creatGameBgView();
		//this.creatGameMenuView();
		//this.creatGameHeroView();
		//this.creatGameMonsterView();

		console.log("GameStart!");
		//this.showGameLayer();
		this.startFrameUpdate();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLineOnStage, this);
	}
	private startFrameUpdate() {
		this.pastAllTime = 0;
		this.lastLogicTime = new Date().getTime();
		this.addEventListener(egret.Event.ENTER_FRAME, this.onGameUpdate, this);
	}
	private addLineOnStage(e) {
		console.log("???????????????????????????????????");
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
	private creatGameBgView() {
		if (this.bgView == null) {
			this.bgView = new game.MainScenceView();
			game.GameConfig.stage.addChild(this.bgView);
			//this.bgView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroTapHandler, this);

			for (let i: number = 1; i < 4; i++) {


				this.bgView["monster_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.monsterTapHandler, this);

				this.bgView["hero_" + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapBeginHandler, this);
				this.bgView["hero_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroTapHandler, this);
				//this.bgView["hero_" + i].addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.tapCancleHandler, this);
			}
		}
		game.GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.tapCancleHandler, this);
	}
	private tapBeginHandler(e: TouchEvent): void {
		let target: any = e.currentTarget;
		this.lastTap = target;

		this.isTouching = true;
	}
	private tapCancleHandler(e: TouchEvent): void {
		//this.lastTap.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
		this.isTouching = false;
		this.tapBeginTime = 0;
	}

	private fireTime: number = 300;
	private heroTapHandler(e: egret.TouchEvent): void {
		let target: game.HeroView = e.currentTarget;
		this.lastTap = target;
		console.log("HeronName = " + target.name);

		this.isTouching = false;
		this.fireTime = 300 + this.tapBeginTime;

		let halfMarathonX: number = 500 * this.tapBeginTime / 100;
		let halfMarathonY: number = 600 * this.tapBeginTime / 100;
		let fullMarathonX: number = 750 * this.tapBeginTime / 100;
		let fullMarathonY: number = 350 * this.tapBeginTime / 100;

		let fu: number = -1;
		Math.random() >= 0.5 ? fu = -1 : fu = 1;
		let p0: egret.Point = new egret.Point(125, 126);
		let p1: egret.Point = new egret.Point(-halfMarathonX, -halfMarathonY);//500,600
		let p2: egret.Point = new egret.Point(-fullMarathonX + -50 + Math.random() * 20 * fu, -fullMarathonY + -50 + Math.random() * 20 * fu);//750,400,分别有个50的基础

		SpriteSheetEffect.Instance.loadAndPlay(
			EFFECT_NAME.arrow_fly,
			1,
			(effect: FrameImage) => {
				target.addChild(effect);
				let arc = new ArcMotion(effect, p0, p1, p2, this.fireTime, true);
				arc.play();
			},
			(effect: FrameImage) => {

				/*egret.Tween.get(effect).wait(10000).call(() => {
					console.log("====" + "播放over");
					if (effect) {
						//effect.parent.removeChild(effect);
					}
				});*/
			},
			ImageType.PNG,
			this,
			this.fireTime
		);

		//battle_win
		/*ArcMotion.loadAndPlay(
			"arrow_fly",
			1,
			(effect: FrameImage) => {
				effect.x = target.width / 2 - effect.width / 2;
				effect.y = target.width / 2 - effect.height / 2;
				flying.addChild(effect);
			},
			(effect: FrameImage) => {
				console.log("====" + "GameOver");
				if (effect) {
					effect.parent.removeChild(effect);
					flying = null;
				}
			},
			ImageType.PNG,
			this,
			18
		);*/
		this.tapBeginTime = 0;
	}

	private monsterTapHandler(e: egret.TouchEvent): void {
		let target: game.HeroView = e.currentTarget;
		//this.lastTap = target;
		console.log("monsterName = " + target.name);

		let p0: egret.Point = new egret.Point(0, 0);
		let p1: egret.Point = new egret.Point(300, 156);
		let p2: egret.Point = new egret.Point(600, 300);

		SpriteSheetEffect.Instance.loadAndPlay(
			EFFECT_NAME.arrow_fly,
			1,
			(effect: FrameImage) => {
				target.addChild(effect);
				let arc = new ArcMotion(effect, p0, p1, p2, 1000, true);
				arc.play();
			},
			(effect: FrameImage) => {
				console.log("====" + "GameOver");
				if (effect) {
					effect.parent.removeChild(effect);
				}
			},
			ImageType.PNG,
			this,
			18
		);
	}

	public showGameLayer() {
		var rect: eui.Rect = new eui.Rect();
		rect.fillColor = 0xff0000;

		rect.width = 1080;
		rect.height = 1920;
		this.addChild(rect);
	}
	private onLogicUpdate(pre: number) {
		if (this.isTouching) {
			this.tapBeginTime += Math.round(pre * 100);
			if (this.tapBeginTime >= 100) {
				this.tapBeginTime = 100;
			}
			//this.etenergySet();
			//console.log("=========this.tapBeginTime = " + this.tapBeginTime);
		} else {
			this.tapBeginTime = 0;
		}
	}
	private isShowCircle: boolean = false;
	/*private etenergySet(_boo: number) {
		if (_boo == 1) {
			this.isShowCircle = true;
			this.bgView.cricle.alpha = 1;
			this.bgView.cricle.x = this.lastTap.x;
			this.bgView.cricle.y = this.lastTap.y - 122;
			let curCircle: number = Math.ceil(this.tapBeginTime / 5 % 100);
			curCircle < 10 ? curCircle = curCircle + 10 : curCircle = curCircle + 0;
			this.bgView.cricle.source = "100" + curCircle + "_png";
			console.log("100" + curCircle + "_png" + " =========this.tapBeginTime = " + this.tapBeginTime);
		} else if (_boo == 0) {
			if (this.isShowCircle == true) {
				egret.Tween.get(this.bgView.cricle).to({ alpha: 0 }, 1000).call(() => {
					this.isShowCircle = false;
				});
			}
		}

	}*/
	public onUnLoad() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
}