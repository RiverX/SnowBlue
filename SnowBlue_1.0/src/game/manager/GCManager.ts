namespace game {
	export class ReleaseEntity {
		public constructor() { }
		public resourceName: string;
		/**
		 * 最后操作的时间
		 */
		public lastUseTimer: number;
		/**
		 * 是否被正在打开的界面使用
		 */
		public isUse: boolean;
		/**
		 * 被哪一个类所使用的
		 */
		public tags: Array<string> = [];
	}

	export class GCManager extends Singleton {
		private _waitForDispose: Array<ReleaseEntity> = [];
		/**
		* let key = resName + '_' + tag;
		*/
		private _cacheDic: Dictionary<ReleaseEntity>;

		public constructor() {
			super();
		}

		private _releaseTime: number = 1000 * 60 * 2;
		private _releseUesdTime: number = 1000 * 60 * 2;

		public init(): void {
			if (this.isDisposeImmediately()) {
				TimerManager.Instance.doTimer(this._releaseTime, 0, this.__checkRes__, this);
			}
			this._cacheDic = new Dictionary<ReleaseEntity>();
		}

		public static get Instance(): GCManager {
			return this.getInstance<GCManager>();
		}

		private removeFromWaittingList(entity: ReleaseEntity): void {
			let index = this._waitForDispose.indexOf(entity);
			if (index != -1) {
				//Utils.log('remove the element ' + index)
				this._waitForDispose.splice(index, 1);
				// delete this._waitForDispose[index];
			}
		}

		/**
		 * @param source 资源名称
		 * @param isUse ture使用false未使用
		 * @param tag 被使用的controler
		 */
		public updateRes(source: egret.Texture | string, isUse: boolean, tag: string): void {
			let resName;
			if (typeof source == 'string') {
				resName = source;
			} else {
				return;
			}

			if (resName == null) {
				return;
			}

			let entity = this._cacheDic.get(resName);

			if (entity == null) {
				entity = new ReleaseEntity();
				entity.resourceName = resName;
				entity.tags = [];
			}
			entity.lastUseTimer = egret.getTimer();
			entity.isUse = isUse;
			//data tags;
			let index = entity.tags.indexOf(tag);

			if (isUse) {
				if (index < 0) {
					entity.tags.push(tag);
				}
				this.removeFromWaittingList(entity);
			} else {
				if (index > -1) {
					entity.tags.splice(index, 1);
				}
			}
			this._cacheDic.add(resName, entity);
		}

		public __releaseRes__(): void {
			if (this._waitForDispose.length == 0) {
				TimerManager.Instance.remove(this.__releaseRes__, this);
				return;
			}
			// console.log('__releaseRes__');
			for (let n in this._waitForDispose) {
				let entity: ReleaseEntity = this._waitForDispose[n];
				if (RES.hasRes(entity.resourceName)) {
					let isRelease = RES.destroyRes(entity.resourceName);
					if (isRelease) {
						console.log('动态释放资源成功 = ' + entity.resourceName);
					}
				}

				this._cacheDic.remove(entity.resourceName);
				entity = null;
			}

			this._waitForDispose = [];

			/*if (typeof qq != 'undefined') {
				qq.triggerGC();
			}

			if (typeof wx != 'undefined') {
				wx.triggerGC();
			}*/
		}

		public is(obj: any, className: string): boolean {
			return egret.is(obj, className);
		}

		//把一段时间不用的资源清理掉
		private __checkRes__(): void {
			// console.log('__checkRes__');
			var n: any;
			if (this._waitForDispose == null) {
				this._waitForDispose = new Array();
			}

			let keys = this._cacheDic.keys;
			for (let i in keys) {
				let key: string = keys[i];
				let obj: ReleaseEntity = this._cacheDic.get(key);

				if (obj.tags.length > 0) {
					/*if (Utils.isTest()) {
						// console.log(obj.resourceName + '被' + obj.tags.toString() + '使用');
					}*/
				} else {
					if (egret.getTimer() - obj.lastUseTimer > this._releseUesdTime) {
						if (obj.isUse == false) {
							if (this._waitForDispose.indexOf(obj) < 0) {
								this._waitForDispose.push(obj);
								/*if (Utils.isTest()) {
									console.log(obj.resourceName + '等待销毁');
								}*/
							}
						}
					}
				}
			}

			if (this._waitForDispose.length > 0) {
				TimerManager.Instance.doTimer(1000, 0, this.__releaseRes__, this);
			}
		}

		/**
		 * 释放图片资源
		 */
		public disposeImage(source: eui.Image, url: string): void {
			if (source) {
				if (source.parent) {
					source.parent.removeChild(source);
				}
				if (source.$bitmapData) {
					source.$bitmapData.$dispose();
					source.$bitmapData = null;
				}
			}

			source = null;

			if (url) {
				RES.destroyRes(url, false);
			}
		}

		/**
		 * 释放序列帧资源
		 */
		public disposeMovieClip(framImage: FrameImage, url?: string): void {
			if (framImage.parent) {
				framImage.parent.removeChild(framImage);
			}

			if (url != null) {
				let texture = url + '_png';
				RES.destroyRes(texture);
			}

			framImage = null;
		}

		/**
		 * @param effect 显示对象
		 * @param effectName 资源名称
		 * 根据URL(resource/assets/*)释放资源（仅使用于通过url加载的资源）
		 */
		public disposeByUrl(effect, effectName): void {
			if (effect && effect.parent) {
				effect.parent.removeChild(effect);
			}

			let configUrl = Utils.GAME_EFFECT_PATH + effectName + '.json';
			let textureUrl = Utils.GAME_EFFECT_PATH + effectName + '.png';
			RES.destroyRes(configUrl, false);
			RES.destroyRes(textureUrl, false);

			effect = null;
		}

		/**
		 * @see GCManager.disposeEffects
		 * list 资源数组(非图集图片名称集)
		 * 释放序列帧特效
		 */
		public disposeEffects(list: Array<string>): void {
			while (list.length > 0) {
				let resName = list.shift();
				RES.destroyRes(resName, false);
			}
		}

		/**
		 * 释放龙骨资源
		 */
		/*public disposeDragonBones(display: dragonBones.EgretArmatureDisplay = null, dragonBonesName): void {
			if (display) {
				if (display.parent) {
					display.parent.removeChild(display);
				}
				display.dispose();
			}

			dragonBones.EgretFactory.factory.removeDragonBonesData(dragonBonesName);
			dragonBones.EgretFactory.factory.removeTextureAtlasData(dragonBonesName);
			display = null;
		}*/

		/**
		 * 深度释放
		 */
		public deathMode(): void {
			this.clearDragonBones();
			ViewManager.Instance.closeAllWidget();
			//SoundManager.Instance.destroy();
			this.disposeRES();
		}

		private disposeRES(): void {
			RES.destroyRes('heroQuailty_json');
			RES.destroyRes('item_110_sheet_json');
			RES.destroyRes('item70Sheet_json');
			RES.destroyRes('item_equip_json');
			RES.destroyRes('heroCommon_json');
			RES.destroyRes('heroGoldenSheet_json');
			RES.destroyRes('heroNormalCard_json');
			RES.destroyRes('skillSheets_json');
		}

		/**
		 * 清除龙骨特效本来需要
		 */
		public clearDragonBones(): void {
			for (let i in this.armatureDisplayList) {
				let armture = this.armatureDisplayList[i]
				if (armture) {
					if (armture.parent) {
						armture.parent.removeChild(armture);
					}
					armture.dispose();
					armture = null;
					delete this.armatureDisplayList[i];
				}
			}
			// dragonBones.EgretFactory.factory.clear();
			this.armatureDisplayList = [];
		}

		/**
		 * 是否立即释放 PC不释放
		 */
		public isDisposeImmediately(): boolean {
			/*let flag = PlatformUtils.isIPhone() || PlatformUtils.isAndroid()
			return flag;*/
			return false;
		}

		public armatureDisplayList: Array<dragonBones.EgretArmatureDisplay> = [];
	}
}
