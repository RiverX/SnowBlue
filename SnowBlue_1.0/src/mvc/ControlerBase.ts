namespace game {
	export abstract class ControlerBase {
		/**
		 * 类名称
		 */
		public TAG: string;
		public base_view: any;
		private _layerIndex: number;
		private _images: Array<eui.Image>;

		/**
		 * seekWidgetByImage 找到改界面用到的所有资源
		 */
		public releaseImages: Array<string> = []; //该界面用到的所有资源
		public manualRelaseImages: Array<string> = [];//手动列表

		/**
		 * 控制器控制的view中哪些资源不释放
		 */
		public filterList: Array<string> = [];
		
		/**
		 * 该功能使用图集，释放的时候标记图集即可
		 */
		public sheets: Array<string> = [];

		public enabledClickRectClose: boolean = true;

		public isPanelShow: boolean = false;

		public constructor() {
		}


		/**
		 * 显示到界面
		 * 子类需要实现这个函数
		 * 在此函数内调用 this.show(view,game.LayerManager.L_MAIN,true);
		*/
		public abstract showPanel(): void;
		/**
		 * view添加到显示层完毕后自动调用
		 * 保证view层内所有显示对象初始化完成可调用
		*/
		protected abstract createdCallBack(): void;
		/**
		 * 注意 所有的在该方法中执行所有的
		 * 1 移除事件操作 
		 * 2 临时数据清理
		 * 3 this.view=null
		 */
		protected abstract destroy(): void;

		private _identity<T>(args: T): T {
			return args;
		}

		/***
		 * 注册点击事件 可以带参数
		 * @param data 传递的数据 比如说按钮的id tag 之类的
		 * @param fun 回调函数 
		 * @param btn 添加事件的对象
		 * @param isPlaySound:是否播放音效
		 */
		public REG_TAP(fun: Function, btn: any, target: any, showAnimation: boolean = true, sound: string = '', isPlaySound: boolean = true): void {
			function onClick(e) {
				if (showAnimation) {
					let orginalScale = btn.scaleX;
					this.btnAnimation(btn, 0.95, orginalScale);
				}

				fun.apply(target, [e]);
				
				if (isPlaySound) {
					let soundName = "62_bt_tongyonganniu"
					if (sound.length > 0) {
						soundName = sound;
					}
					//SoundControl.playSound(soundName);
				}
			}

			if (btn) {
				if (btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
					btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, onClick, target);
				}
				btn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, target);
			}
		}

		/***
		 * 移除事件
		 * @param data 传递的数据 比如说按钮的id tag 之类的
		 * @param fun 回调函数 
		 * @param btn 添加事件的对象
		 */
		public UN_REG_TAP(fun: Function, btn: any, target: any): void {
			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, target);
		}

		private btnAnimation(button: any, scale: number, initScale: number) {
			egret.Tween
				.get(button)
				.to({ scaleX: scale, scaleY: scale }, 50)
				.to({ scaleX: initScale, scaleY: initScale }, 50);
		}

		public setWidgetVisible(visible) {
			if (this.base_view) {
				(this.base_view as eui.Component).$setVisible(visible);
			}
		}




		protected addEvent(_eventStr: any, _fun: Function, target?: any): void {
			let key: string = _eventStr.toString();
			if (target) {
				game.EventManager.getInstance().addEventListener(key, _fun, target);
			} else {
				game.EventManager.getInstance().addEventListener(key, _fun, this);
			}
		}

		protected removeEvent(_eventStr: any, _fun: Function, targe: any): void {
			let key: string = _eventStr.toString();
			game.EventManager.getInstance().removeEventListener(key, _fun, targe);
		}

		/**
		 * _view 显示对象
		 * _layindex 显示层级 例如  game.PanelManager.L_MAIN
		 * bClean 是否清理当前层所有显示对象，默认不清理
		*/
		protected show(
			_view: game.ViewBase,
			_layindex: number = 2,
			bClean: boolean = false,
			parent: eui.Group = null
		): void {
			if (this.base_view != null) {
				throw Error(' this view always opened on the screen');
			}
			this.TAG = this.getTag();
			this.releaseImages = [];
			this.manualRelaseImages = [];
			this._images = [];
			this.base_view = _view;
			this._layerIndex = _layindex;
			this.base_view.setCreateFun(() => {
				let clsName = egret.getQualifiedClassName(this);
				let i = clsName.lastIndexOf('.') + 1;

				clsName = clsName.slice(i, clsName.length);
				this.createdCallBack();
				game.EventManager.getInstance().dispatchEventWith(clsName);
			}, this);
			let p;

			if (parent) {
				p = parent;
			} else {
				p = game.LayerManager.getInstance().getPanel(_layindex);
			}
			if (bClean) {
				while (p.numChildren) {
					p.removeChildAt(0);
				}
			}

			let clearLayout: boolean = false;
			if (clearLayout) {
				(this.base_view as ViewBase).includeInLayout = false;
				this.base_view.x = (game.GameConfig.GameWidth - this.base_view.width) / 2;
				this.base_view.y = (game.GameConfig.GameHeight - this.base_view.height) / 2;
			}

			this.onAwake();

			p.addChild(this.base_view);
			ViewManager.Instance.register(_layindex, this);

			this.seekWidgetByImage(this.base_view, this.releaseImages);
			// if (this.sheets.length > 0) {
			// 	this.releaseImages = this.releaseImages.concat(this.sheets);
			// }

			// if (Utils.isTest()) {
			// 	if (this.releaseImages.length > 0)
			// 		console.log(this.releaseImages);
			// }

			this.updateResCache(true);
			this.detectedGameClue();
			this.isPanelShow = true;
			this.initComplete();
		}

		public initComplete(): void { }
		private onAwake(): void {
			let btnClose: eui.Button = this.base_view.close_btn;
			let btnLeftClose: eui.Button = this.base_view.btnLeftClose;

			//right top close button
			if (btnClose != null) {
				btnClose.$setVisible(false);

				if (btnClose.$visible) {
					let widgetArr: Array<string> = [];//WidgetsManager.Instance.closeList;
					let flag: boolean = widgetArr.indexOf(this.base_view.skinName) != -1;
					if (flag) {
						this.REG_TAP(
							() => {
								ViewManager.Instance.closeAllWidget();
							},
							btnClose,
							this
						);
					} else {
						this.REG_TAP(
							() => {
								this.close();
							},
							btnClose,
							this
						);
					}
				}
			}

			//let top close button
			if (btnLeftClose != null) {
				btnLeftClose.$setVisible(true);
				this.REG_TAP(
					() => {
						this.close();
					},
					btnLeftClose,
					this
				);
			}

			let child = this.base_view.getChildAt(0);

			if (child && child instanceof eui.Rect) {
				child.percentWidth = 100;
				child.alpha = 0.5;
				if (this.enabledClickRectClose == true) {
					child.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
				}
			}
		}
		public updateResCache(flag): void {
			let arr = this.releaseImages;
			for (let i in arr) {
				let name = arr[i];
				let index = this.filterList.indexOf(name);

				if (index == -1) {
					GCManager.Instance.updateRes(name, flag, this.TAG);
				}
			}
		}
		//手动释放列表
		public releaseManuAssets(): void {
			let arr = this.manualRelaseImages;
			for (let i in arr) {
				let name = arr[i];
				let index = this.filterList.indexOf(name);

				if (index == -1) {
					GCManager.Instance.updateRes(name, false, this.TAG);
				}
			}
		}

		private onDestroy(): void {
			let close_btn: eui.Button = this.base_view.close_btn;
			let key;

			if (close_btn != null) {
				close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
			}
		}



		public seekWidgetByImage(container: any, list: Array<string>) {
			if (container && container.$children) {
				let children = container.$children;

				for (let i = 0; i < children.length; i++) {
					let child = children[i];

					if (child instanceof eui.Image) {
						let bm = child as eui.Image;
						this._images.push(bm);
						if (typeof bm.source == 'string') {
							let name = bm.source;

							if (name.length > 0) {
								var item = RES["config"].getResource(name)

								if (item != null) {
									if (list.indexOf(name) == -1) {
										list.push(name);
									}
								}
							}
						}
					} else if (child instanceof eui.List) {
					} else {
						this.seekWidgetByImage(child, list);
					}
				}
			}
		}
		/**
		* 讲界面中所有的image 设置成null
		*/
		private resetSourceNull(): void {
			for (let i = 0; i < this._images.length; i++) {
				let image = this._images[i];
				image.source = null;
			}
			this._images = [];
		}
		/**
		 *  关闭这个界面
		 */
		public close(): void {
			if (this.base_view != null) {
				if (Utils.filterControlerList(this.TAG)) {
					// if (this.isContainList) {
					this.updateResCache(false);
					// }
				}
				this.resetSourceNull();
				this.releaseManuAssets();
				if (this.base_view.parent != null) {
					ViewManager.Instance.remove(this._layerIndex, this);
					this.isPanelShow = false;
					/*let status = game.GameData.getInstance().guideStatus;
					if (status == false && this._isShowAnimation) {
						let t = egret.Tween.get(this.base_view);
						t.to({ alpha: 0 }, 300, egret.Ease.quadOut).call(() => {
							egret.Tween.removeTweens(this.base_view);
							this.doRemove();
						});
					} else {
						this.doRemove();
					}*/
				} else {
					// while (this.base_view.numChildren > 0) {
					// 	this.base_view.removeChildAt(0);
					// }
					this.base_view = null;
				}
				this.detectedGameClue();
			}
			this.releaseImages = [];
			this.filterList = [];
			this.manualRelaseImages = [];
			this._images = [];
			this.enabledClickRectClose = true;
		}
		private detectedGameClue(): void {
			/*let flag = LayerManager.getInstance().isShowGameClue();
			let gameClubBtn = MainCityController.Instance.gameClubBtn;
			if (gameClubBtn) {
				if (flag) {
					gameClubBtn.show();;
				} else {
					gameClubBtn.hide();
				}
			}*/
		}
		private getTag(): string {
			let clsName: string = Object.getPrototypeOf(this).__class__;
			let index = clsName.lastIndexOf('.');

			if (index != -1) {
				clsName = clsName.substr(index + 1, clsName.length);
			}

			return clsName;
		}



	}
}