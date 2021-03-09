
class FrameImage extends eui.Image {
	private _timer: egret.Timer;
	private _completeCallBack: Function;
	private textures: Array<egret.Texture>;
	private index: number = 0;
	private loopNum: number = 0;
	private bindTarget;

	private default: number = 1000 / 60;
	private tap: number = 1;//跳帧的话，每隔急几帧显示图片

	private useCount: number;
	private _lastTimer: number;

	constructor() {
		super();
		this.touchEnabled = false;
		this.addEventListener(
			egret.Event.REMOVED_FROM_STAGE,
			() => {
				this.destroyTimer();
			},
			this
		);
	}

	public play(
		array: Array<egret.Texture>,
		interval: number,
		loop: number = -1,
		callBack?: Function,
		bindTarget?: any,
		startFrame: number = 0
	) {
		this.textures = array;
		this._completeCallBack = callBack;
		this.bindTarget = bindTarget;
		this.loopNum = loop;

		if (this.textures == null && this.textures.length == 0) {
			throw Error('the source is illegal');
		}
		this.texture = this.textures[this.index];
		this.destroyTimer();
		if (interval / array.length < this.default ){
			this.tap = (array.length / (interval / this.default));
			interval = this.default;
		}

		if (null == this._timer) {
			this._timer = new egret.Timer(interval);//delay 计时器事件间的延迟（以毫秒为单位）。建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
			console.log("加载帧间隔： = " + interval);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.timeHandler, this);
			this._timer.start();
		}
	}
	private countNum: number = 0;
	private timeHandler(e: egret.TimerEvent): void {
		if (this.index >= this.textures.length + this.tap) {
			this.index = 0;
			this.countNum = 0;
			if (this.loopNum > 0) {
				this.loopNum--;
			}
		}
		if (this.loopNum == 0) {
			this.destroyTimer();
			if (this._completeCallBack) {
				this._completeCallBack.apply(this.bindTarget, [this]);
				egret.Tween.get(this).wait(1000).call(() => {
					//this._completeCallBack.apply(this.bindTarget, [this]);
				});
			}
			return;
		}

		if (this.index >= this.textures.length - 1) {
			this.texture = this.textures[this.textures.length - 1];
			//console.log(this.tap + " ======最后帧 = " + Number(this.textures.length - 1) + " 多少个帧 " + this.countNum);
		} else {
			//console.log(this.tap + " ======当前帧 = " + this.index + " 多少个帧 " + this.countNum);
			this.texture = this.textures[this.index];
		}
		this.countNum += this.tap;
		this.index = Math.round(this.countNum);
	}

	public destroyTimer(): void {
		if (this._timer) {
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timeHandler, this);
		}
		this._timer = null;
	}

	public getTimes(): number {
		return this.useCount || 0;
	}

	public getLastTime(): number {
		return this._lastTimer || 0;
	}

	public dispose(): void {
		if (this._timer) {
			this.destroyTimer();
		}
		if (this.parent) {
			this.parent.removeChild(this);
		}
		if (this.textures) {
			while (this.textures.length > 0) {
				let t = this.textures.pop();
				if (t) {
					t.dispose();
					t = null;
				}
			}
		}
		this.textures = null;
		this.$bitmapData = null;
		this.source = null;
	}
}