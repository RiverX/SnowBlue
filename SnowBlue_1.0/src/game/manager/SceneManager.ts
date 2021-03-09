class SceneManager {
	private _scenes: Array<BaseScene>;
	private _currScene: any;

	private static _instance: SceneManager;

	public constructor() {
	}
	public static get instance(): SceneManager {
		if (this._instance == null) {
			this._instance = new SceneManager();
		}
		return this._instance;
	}
	public init() {
		this._scenes = [];
		this._currScene = null;
	}
	private getScene<T extends BaseScene>(type: new () => T): T {
		for (let index = 0; index < this._scenes.length; index++) {
			let element = this._scenes[index];
			if (element instanceof type) {
				return element;
			}
		}
		return null;
	}

	public runScene<T extends BaseScene>(type: new () => T, ...args: any[]) {
		let scene: any = this.getScene<T>(type);
		if (scene != null) {
			if (this._currScene != null) {
				this._currScene.onUnLoad();
				game.GameConfig.stage.removeChild(this._currScene);
				this._currScene = null;
			}
			game.GameConfig.stage.addChild(scene);
			scene.onLoad(args);
			this._currScene = scene;
		}
	}

	/**
	 * 清空处理
	 */
	public clear(): void {
		this._scenes.forEach(element => {
			element.onUnLoad();
		});
		this._currScene = null;
		this._scenes = [];
	}

	/**
	 * 注册Scene
	 */
	public registerScene<T extends BaseScene>(type: new () => T) {
		this._scenes.push(new type());
	}

	/**
	 * 获取当前Scene
	 */
	public getCurrScene(): any {
		return this._currScene;
	}

}