/**
 * 弧线运动
 * tween和二次贝塞尔曲线
 * @author chenkai 2018/6/28
 *
 */
class ArcMotion {
	private target: egret.DisplayObject;
	private p0: egret.Point;
	private p1: egret.Point;
	private p2: egret.Point;
	private loop: Boolean = false;
	private delay: number = 1000;

    /**
     * 初始化
     * @param target 需要运动的对象
     * @param p0 起始点
     * @param p1 拐点
     * @param p2 终止点
     * @param delay 移动时间 默认1000
     * @param loop 是否循环  默认false
     */
	public constructor(target: egret.DisplayObject, p0: egret.Point, p1: egret.Point, p2: egret.Point, delay: number = 1000, loop: Boolean = false) {
		this.target = target;
		this.p0 = p0;
		this.p1 = p1;
		this.p2 = p2;
		this.loop = loop;
		this.delay = delay;
	}
	private index:number =0;
	public play() {
		this.index = 0;
		//factor由0向1渐变，会调用set factor，ball的坐标变化
		this.factor = 0;
		let f: number = this.factor;
		egret.Tween.get(this).to({ factor: 1 }, this.delay).call(() => {
			if (this.target && this.target.parent) {
				//this.target.parent.removeChild(this.target);
				console.log(this.index+"轨迹结束： "+this.index);
				this.stop();
			}
		});
	}

	public stop() {
		egret.Tween.removeTweens(this);
	}

	public get factor(): number {
		return 0;
	}

	//起始点P0 = 100，中间点P1 = 300, 终点P2 = 500
	public set factor(value: number) {
		this.index ++;
		//console.log(this.index+"修改的变化数值： "+value);
		

		this.target.x = (1 - value) * (1 - value) * this.p0.x + 2 * value * (1 - value) * this.p1.x + value * value * this.p2.x;
		this.target.y = (1 - value) * (1 - value) * this.p0.y + 2 * value * (1 - value) * this.p1.y + value * value * this.p2.y;
	}




	/**
	 * 自动释放资源
	 * @param name 特效名称
	 * @param createCallBack 创建完成后播放
	 * @param completeCallBack 播放完毕后回调
	 */
	public static async loadAndPlay(
		name: string,
		loop: number = -1,
		createCallBack: Function,
		completeCallBack: Function,
		type: ImageType = ImageType.JPG,
		target,
		framerate: number = 30
	) {
		let jsonPath: string = "resource/assets/sheet/" + name + '.json';
		let texturePath: string = "resource/assets/sheet/" + name + '.png';
		let sheet;
		let texure;
		await RES.getResByUrl(
			jsonPath,
			(s) => {
				sheet = s;
			},
			this,
			RES.ResourceItem.TYPE_SHEET
		);

		await RES.getResByUrl(
			texturePath,
			(s) => {
				texure = s;
			},
			this,
			RES.ResourceItem.TYPE_IMAGE
		);

		let source: Array<egret.Texture> = [];
		for (let k in sheet._textureMap) {
			let tex: egret.Texture = sheet.getTexture(k);
			source.push(tex);
		}
		let effect: FrameImage = new FrameImage();
		if (type == ImageType.JPG) {
			effect.blendMode = egret.BlendMode.ADD;
		} else {
			effect.blendMode = egret.BlendMode.NORMAL;
		}
		effect.play(
			source,
			framerate,
			loop,
			() => {
				effect.dispose();
				RES.destroyRes(jsonPath);
				RES.destroyRes(texturePath);

				effect = null;
				if (completeCallBack) {
					completeCallBack.apply(target);
				}
			},
			target
		);
		if (createCallBack) {
			createCallBack.apply(target, [effect]);
		}
	}




}

