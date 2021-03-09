class Utils {
	public constructor() { }
	public static PROLIST: Array<string> = ['ATTACK', 'DEFENSE', 'HP', 'AGILE', 'LEADER'];
	public static PRONAMELIST: Array<string> = ['攻击', '防御', '体力', '敏捷', 'LEADER'];
	public static get GAME_UI_PATH(): string {

		return 'resource/assets/GameUI/';
	}

	public static get GAME_EFFECT_PATH(): string {
		return 'resource/assets/sheet/';
	}

	public static get GAME_DARGON_PATH(): string {
		return 'resource/assets/dragons/';
	}

	/**
	 * 根据路径获取文件名
	 */
	public static getFileNameFromPath(path: string): string {
		let filename = null;
		if (path && path.length > 0) {
			filename = path.split("/").pop();
		}
		return filename;
	}

	public static createImageByName(name: string): eui.Image {
		let image: eui.Image = new eui.Image();
		image.source = name;
		return image;
	}

	public static localTolocal(child1: eui.Group, child2: eui.Group) {
		let p1 = child1.localToGlobal();
		let p2 = child2.localToGlobal();
		let off = p1.subtract(p2);
		let x = Math.abs(off.x);
		let y = Math.abs(off.y);
		return new egret.Point(x, y);
	}

	public static uniqArray(orginal: Array<any>): Array<any> {
		let dic: Dictionary<any> = new Dictionary<any>();

		for (let i in orginal) {
			let v = orginal[i];
			dic.add(v.toString(), v);
		}

		return dic.values;
	}

	/*public static flyText(value: number, x: number, y: number, parent: any): void {
		let tip: string = '';
		let color;
		let sign: string = '';

		if (value > 0) {
			sign = ' +';
			color = Color.GREED;
		} else {
			sign = ' -';
			color = Color.RED;
		}

		value = Math.abs(value);
		tip = '' + (sign + value);

		let textfiled = TextUtils.createTextfield(20, color);

		textfiled.x = x;
		textfiled.text = tip;
		parent.addChild(textfiled);

		let tw = egret.Tween.get(textfiled);
		tw.to({ y: textfiled.y - 100, alpha: 0 }, 1000).call(() => {
			textfiled.parent.removeChild(textfiled);
			textfiled = null;
		});
	}*/

	/**
	 * 将obj转化成对应类型T
	 */
	public static identity<T>(args: T): T {
		return args;
	}

	/**
	 * 注册按钮点击事件
	 */
	public static REG_TAP(fun: Function, btn: any, target: any, data: any = null, sound: string = ''): void {
		function btnAnimation(button: any, scale: number, initScale: number) {
			egret.Tween
				.get(button)
				.to({ scaleX: scale, scaleY: scale }, 50)
				.to({ scaleX: initScale, scaleY: initScale }, 50);
		}

		function onClick(e) {
			let orginalScale = btn.scaleX;

			btnAnimation(btn, 0.95, orginalScale);
			fun.apply(target, [e]);

			if (sound.length == 0) {
				//SoundControl.playSound('62_bt_tongyonganniu');
			} else {
				//SoundControl.playSound(sound);
			}
		}
		if (btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, onClick, target);
		}
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, target);
	}

	public static send(cmd: number, succFunc?: Function, failFunc?: Function, target?: any): void {
		//ClientSocket.getInstance().send(cmd, succFunc, failFunc, target);
	}

	public static sendWitArgs(cmd, data: any, succFunc?: Function, failFunc?: Function, target?: any): void {
		//ClientSocket.getInstance().sendWitArgs(cmd, data, succFunc, failFunc, target);
	}

	/**
	 * 返回一个在min和max之间的随机浮点数
	 */
	public static range(min: number, max: number): number {
		let seed: number = new Date().getTime();
		max = max || 1;
		min = min || 0;
		seed = (seed * 9301 + 49297) % 233280;
		var rnd = seed / 233280.0;
		return min + rnd * (max - min);
	}

	/**
	 * 返回 min（包含）～ max（包含）之间的数字
	 */
	public static random(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public static addEvent(_eventStr: any, _fun: Function, target: any): void {
		let key: string = _eventStr.toString();
		game.EventManager.getInstance().addEventListener(key, _fun, target);
	}

	public static removeEvent(_eventStr: any, _fun: Function, target: any): void {
		let key: string = _eventStr.toString();
		game.EventManager.getInstance().removeEventListener(key, _fun, target);
	}

	public static dispatchEvent(_eventStr: any, data: any = null): void {
		game.EventManager.getInstance().dispatchEventWith(_eventStr, false, data);
	}

	/**显示警告框*/
	public static showAlert(str: string): void {
		//EventManager.getInstance().dispatchEventWith(EventName.OPEN_WARNING_TIPS, false, str);
	}

	public static showItemTips(itemEntity): void {
		//ShowItemControler.Instance.showPanel(itemEntity);
	}

	public static registerTabEvent(btnTab: any, callback?, target?): void {
		btnTab.setSelectCallFun(callback, target);
	}

	/***富文本显示内容 */
	public static setRichTextContent(text: egret.TextField, content: string): void {
		text.textFlow = new egret.HtmlTextParser().parser(content);
	}

	public static replaceAll(content: string, patten, target): string {
		if (content == null || content == '') {
			return content;
		}
		while (content.indexOf(patten) != -1) {
			content = content.replace(patten, target);
		}
		return content;
	}

	public static formatRichText(content: string): string {
		let s: string = content;
		while (s.indexOf('\\n') > -1) {
			s = s.replace('\\n', '\n');
		}

		return s;
	}

	/**
	 * 获取星期
	 */
	public static getWeekDate(): string {
		let now = new Date();
		let day = now.getDay();
		let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		let week = weeks[day];

		return week;
	}

	public static arrayUnique(arr): Array<any> {
		return arr.filter((item, index) => {
			return arr.indexOf(item) === index
		})
	}
	public static split(s: string, rex: string): Array<string> {
		s = s + '';

		let index = s.indexOf(rex);

		if (index == -1 && s.length > 0) {
			return [s];
		} else {
			return s.split(rex);
		}
	}

	/*public static getRes(name): any {
		let config: any;
		if (name == '' || name == null) {
			return null;
		}

		if (ConfigManager.Instance.isConvert) {
			config = ConfigManager.Instance.getConfigByName(name);
		} else {
			config = ZipUtil.getJson(name);
		}
		return config;
	}*/

	/**禁用进度条的动画 */
	public static disableProgress(grossBar: eui.ProgressBar): void {
		grossBar.slideDuration = 0;
	}

	/**交换显示对象的父容器 */
	public static switchParent(child: eui.Group, parent: game.ViewBase, x: number, y: number) {
		if (child && child.parent) {
			child.parent.removeChild(child);
		}
		child.x = x;
		child.y = y;
		parent.addChild(child);
	}

	public static traceObject(obj): void {
		/*if (Utils.isTest()) {
			console.log('===============begin================');

			for (let key in obj) {
				let value = obj[key];
				console.log(key + ' = ' + value);
			}
			console.log('===============end================');
		}*/
	}

	public static getArrayString(arr: Array<any>): string {
		let str: string = '';
		if (arr != null) {
			arr.forEach((ele) => {
				str += ele;
			});
		}
		return str;
	}

	public static removeSelf(self: any): void {
		if (self && self.parent) {
			self.parent.removeChild(self);
			self = null;
		}
	}

	public static removeFrame(_frame: FrameImage): void {
		if (_frame != null) {
			_frame.destroyTimer();
			//GCManager.Instance.disposeMovieClip(_frame);
		}
	}

	/**
	 * 根据组名获取组内资源
	 */
	public static getResByGroups(groups: Array<string>): Array<string> {
		let names: Array<string> = [];
		for (let i in groups) {
			let group = groups[i];
			let arr = RES.getGroupByName(group);
			for (let res in arr) {
				let item = arr[res];
				names.push(item.name);
			}
		}

		return names;
	}

	public static setVisible(component: any, visible: boolean) {
		let v = component.visible;
		if (visible != v) {
			component.$setVisible(visible);
		}
	}

	/**
		* FREEUPDATING, //免费升级
		* HELP, //帮助
		* SPEED, //加速
		* AVAILABLE_UPDATE, //升级
		* FULL_LEVEL, //满级
		* UNKNOWN //无法点击
	*/
	/*public static getItemStatus(index: number): any {
		let itemData: CityData;
		let obj: any = null;
		let control: CityBuildingControler = MainCityController.Instance.getBuildingControler(index);
		if (control) {
			let maxLv: number = control.getCityMaxUpdateLv();
			if (maxLv > 0) {
				itemData = MainCityController.Instance.getBuildingData(index);
				if (control.isUpdating()) {
					//免费
					if (control.isFreeToUpdate()) {
						obj = { id: index, status: BUILDING_STATUS.FREEUPDATING, itemData: itemData };
					} else {
						if (control.isHelp()) {
							//帮助
							obj = { id: index, status: BUILDING_STATUS.HELP, itemData: itemData };
						} else {
							//加速
							obj = { id: index, status: BUILDING_STATUS.SPEED, itemData: itemData };
						}
					}
				} else {
					if (control.checkUpdate()) {
						obj = { id: index, status: BUILDING_STATUS.AVAILABLE_UPDATE, itemData: itemData };
					} else if (control.checkFullLv()) {
						obj = { id: index, status: BUILDING_STATUS.FULL_LEVEL, itemData: itemData };
					} else {
						obj = { id: index, status: BUILDING_STATUS.UNKNOWN, itemData: itemData };
					}
				}
			} else {
				obj = { id: index, status: BUILDING_STATUS.UNKNOWN, itemData: itemData };
			}
		}

		return obj;
	}*/

	public static playAnimation(target: egret.tween.TweenGroup, isLoop: boolean = true): void {
		if (target == null) return;
		if (isLoop) {
			for (let item of target.items) {
				item.props = { loop: true };
			}
		}
		target.play(0);
	}

	/**
	 * id activityrewardtemplate.json 表中的id
	 */
	/*public static buy(id: number, params: any = null): void {
		let flag = BagControler.Instance.checkFull2();
		let idList: Array<number> = [1001, 1002, 1003, 1004, 1005, 1006, 4004]
		if (flag && idList.indexOf(id) == -1) {
			Utils.showAlert('背包空间不足6个，请先清理背包');
			return;
		}
		if (!Utils.isOpenPay()) {
			Utils.showAlert('内测包尚未开启充值');
			return;
		}
		if (GameConfig.isQQHall) {
			QQHallModel.Instance.callCharge(id);
		} else {
			if (params == null) {
				params = { activityId: id }
			}
			Utils.sendWitArgs(KeyCode.CALL_GET_ORDER_ID, params);
		}
	}*/

	public static stopAnimation(target: egret.tween.TweenGroup): void {
		target.stop();
	}
	//tips提示动画
	public static showTipsEffectHandler(mess: string): void {
		//CommEffectControl.showPanel(mess);
	}

	public static getDistance(p1: egret.Point, p2: egret.Point): number {
		return Math.sqrt(Math.pow(p1.y - p2.y, 2) + Math.pow(p1.x - p2.x, 2));
	}

	/*public static isPublish(): boolean {
		return GameConfigtManager.Instance.isPublish();
	}

	public static isTest(): boolean {
		return GameConfigtManager.Instance.isTest();
	}

	public static isOpenPay(): boolean {
		return GameConfigtManager.Instance.isOpenPay();
	}*/

	/**
	 * 获取vip/贵族标识图
	 */
	public static getVipPicByLevel(lv: number): string {
		if (lv == 0) return '';
		let name: string = 'liaotian_bg' + (13 + lv) + '_png';
		return name;
	}


	/**
	 * 字典叠加将dicSource中的元素叠加到dicOriginal
	 */
	public static dictionaryConcat(
		dicOriginal: Dictionary<number>,
		dicSource: Dictionary<number>
	): Dictionary<number> {
		let keys = dicSource.keys;

		for (let i in dicSource.keys) {
			let key = dicSource.keys[i];
			let value = dicSource.get(key);
			let num = dicOriginal.get(key);

			if (num == null) {
				num = value;
			} else {
				num += value;
			}

			dicOriginal.add(key, num);
		}

		return dicOriginal;
	}

	/*public static checkUpdate(): void {
		if (GameConfig.isQQ) {
			if (typeof qq == 'undefined') {
				return;
			}
			let updateManager = qq.getUpdateManager();

			updateManager.onCheckForUpdate(function (res) {
				console.log('onCheckForUpdate====', res)
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					console.log('res.hasUpdate====');
					platform.removeCache();
					updateManager.onUpdateReady(function () {
						qq.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						qq.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						})
					})
				} else {
					qq.exitMiniProgram();
				}
			})
		} else {
			if (typeof wx == 'undefined') {
				return;
			}
			let updateManager = wx.getUpdateManager();

			updateManager.onCheckForUpdate(function (res) {
				console.log('onCheckForUpdate====', res)
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					console.log('res.hasUpdate====');
					platform.removeCache();
					updateManager.onUpdateReady(function () {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						})
					})
				} else {
					wx.exitMiniProgram();
				}
			})
		}

	}*/

	/**
	 * 获取定位
	 */
	/*public static getLocation() {

		if (typeof wx == 'undefined') {
			return;
		}

		if (wx && wx.getLocation) {
			wx.getLocation({
				type: 'wgs84',
				success: (res: any) => {
					let msg = JSON.stringify(res).toString();
					console.log(msg);
					let latitude = res.latitude
					let longitude = res.longitude
					let speed = res.speed
					let accuracy = res.accuracy

					var url = 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=Ab8B6TjmkUrsHtEEdIxiqRDZM5Rt3ZpD&output=json&coordtype=wgs84ll&location=' + latitude + ',' + longitude + '&output=json&pois=1';
					wx.request({
						url: url,
						success(args) {
							console.log(JSON.stringify(args).toString());
							var city = args.data.result.addressComponent.city;
							if (city) {
								//GameConfig.city = city;
							}
						}
					})
				}
			})
		}
	}*/

	/*public static fixClient(): void {
		if (GameConfig.isQQ) {
			if (typeof qq == 'undefined') {
				return;
			}
			qq.showModal({
				title: '清除缓存',
				content: '清除缓存后，需重新进入应用',
				success: function (res) {
					if (res.confirm) {
						qq.showLoading({
							title: '清除缓存中',
						})
						platform.removeCache();
						qq.hideLoading();
						let updateManager = qq.getUpdateManager();

						updateManager.onCheckForUpdate(function (res) {
							console.log('onCheckForUpdate====', res)
							// 请求完新版本信息的回调
							if (res.hasUpdate) {
								console.log('res.hasUpdate====')
								updateManager.onUpdateReady(function () {
									qq.showModal({
										title: '更新提示',
										content: '新版本已经准备好，是否重启应用？',
										success: function (res) {
											if (res.confirm) {
												updateManager.applyUpdate();
											}
										}
									})
								})
								updateManager.onUpdateFailed(function () {
									// 新的版本下载失败
									qq.showModal({
										title: '已经有新版本了哟~',
										content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
									})
								})
							} else {
								qq.exitMiniProgram();
							}
						})
					}
				}
			})
		} else {
			if (typeof wx == 'undefined') {
				return;
			}
			wx.showModal({
				title: '清除缓存',
				content: '清除缓存后，需重新进入应用',
				success: function (res) {
					if (res.confirm) {
						wx.showLoading({
							title: '清除缓存中',
						})
						platform.removeCache();
						wx.hideLoading();
						let updateManager = wx.getUpdateManager();

						updateManager.onCheckForUpdate(function (res) {
							console.log('onCheckForUpdate====', res)
							// 请求完新版本信息的回调
							if (res.hasUpdate) {
								console.log('res.hasUpdate====')
								updateManager.onUpdateReady(function () {
									wx.showModal({
										title: '更新提示',
										content: '新版本已经准备好，是否重启应用？',
										success: function (res) {
											if (res.confirm) {
												updateManager.applyUpdate();
											}
										}
									})
								})
								updateManager.onUpdateFailed(function () {
									// 新的版本下载失败
									wx.showModal({
										title: '已经有新版本了哟~',
										content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
									})
								})
							} else {
								wx.exitMiniProgram();
							}
						})
					}
				}
			})
		}
	}

	public static initGroups(): void {
		RES.getResAsync('path_1_png', (e) => {
			this.path1 = e
		}, this)
		RES.getResAsync('path_2_png', (e) => {
			this.path2 = e
		}, this)
		RES.getResAsync('path_3_png', (e) => {
			this.path3 = e
		}, this)
		RES.getResAsync('path_4_png', (e) => {
			this.path4 = e
		}, this)

	}

	public static playTittleEffect(view): void {
		SpriteSheetEffect.Instance.loadAndPlay(
			EFFECT_NAME.GONGXIHUODE,
			1,
			(effect: FrameImage) => {
				effect.scaleX = 3;
				effect.scaleY = 3;
				effect.y = -110;
				view.titleEffect.bmEffect.alpha = 0;
				view.titleEffect.effectContainer.addChild(effect);
			},
			() => {
				view.titleEffect.bmEffect.alpha = 0.5;
			},
			ImageType.JPG,
			this,
			60
		);
	}*/

	public static path1: egret.Texture;
	public static path2: egret.Texture;
	public static path3: egret.Texture;
	public static path4: egret.Texture;

	public static getTexture(style) {
		let texture = null;
		switch (style) {
			case "path_1_png":
				texture = this.path1;
				break;
			case "path_2_png":
				texture = this.path2;
				break;
			case "path_3_png":
				texture = this.path3;
				break;
			case "path_4_png":
				texture = this.path4;
				break;
		}

		return texture
	}

	/**
	 * 合并两个战斗力
	 */
	public static combimePowers(arr1: Array<number>, arr2: Array<number>): Array<number> {
		let newArray: Array<number> = [];
		for (let i = 0; i < this.PROLIST.length; i++) {
			let key = this.PROLIST[i]
			let num = arr1[key] + arr2[key]
			newArray[key] = num;
		}
		return newArray;
	}

	/**
	 * 打印日志
	 * Utils.isTest() 主开关
	 * @param selfSwitch 分开关
	 */
	/*public static log(str: string, selfSwitch: boolean = true): void {
		if (GameConfig.isQQHall) {
			console.log(str);
			return;
		}
		if (Utils.isTest() && selfSwitch) {
			console.log(str);
		}
	}*/

	/*public static lockGameScene(boo: boolean): void {
		Utils.log('Utils, lockGameScene, boo=' + boo);
		if (boo) {
			CommonCoverController.getInstance().showPanel();
		} else {
			CommonCoverController.getInstance().close();
		}
	}*/

	/**
	 * 已经定订阅消息内容
	 */
	public static subscriptionsSetting: any;

	/*public static getSubscribeMessages(): void {
		if (typeof wx == 'undefined') {
			return;
		}
		wx.getSetting({
			withSubscriptions: true,//是否同时获取用户订阅消息的订阅状态，默认不获取
			success: (res) => {
				// console.log(res)
				if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings) {
					this.subscriptionsSetting = res.subscriptionsSetting.itemSettings;
					// console.log(JSON.stringify(res).toString());
				}
			}
		});
	}*/

	/**
	 * 检查是否订阅消息
	 */
	/*public static checkHasSubscribeMessage(message: string) {
		if (typeof wx == 'undefined') {
			return true;
		}

		if (this.subscriptionsSetting) {
			if (this.subscriptionsSetting[message] == "accept" || this.subscriptionsSetting[message] == "ban") {
				return true;
			}
		} else {
			return false;
		}

		if (this.subscriptionsSetting && this.subscriptionsSetting[message] == "reject") {
			wx.showModal({
				content: message,
				confirmText: "确认",
				cancelText: "取消",
				success: (res) => {
					if (res.confirm) {
						wx.openSetting({
							success: (res) => {
								console.log(res.authSetting)
							},
							fail: (error) => {
								console.log(error)
							}
						})
					} else {
						console.log('用户点击取消')
					}
				}
			});
		}
	}*/

	/***
	 * 订阅消息
	 */
	public static requestSubscribeMessage(message: string, callBack: Function = null): void {
		// if (typeof wx == 'undefined') {
		// 	return;
		// }
		// if (game.GameData.Instance.guideStatus) {
		// 	return;
		// }
		// let flag = this.checkHasSubscribeMessage(message);
		// if (!flag) {
		// 	wx.requestSubscribeMessage({
		// 		tmplIds: [message],
		// 		success: (res) => {
		// 			if (res[message] == 'accept') {
		// 				this.subscriptionsSetting = {};
		// 				this.subscriptionsSetting[message] = "accept";
		// 				Utils.sendWitArgs(game.KeyCode.CALL_SUBSCRIBE_MESSGE, { idList: [message] })
		// 			}
		// 		},
		// 		fail: (res) => { console.info(res) },
		// 	})
		// }
	}

	/**
	 * qq收藏
	 */
	/*public static saveAppToDesktop(callBack: Function = null): void {
		if (typeof qq == 'undefined') {
			return;
		}
		qq.saveAppToDesktop({
			success: (res) => {
				if (callBack) {
					callBack();
				}
			},
			fail: (res) => {
				let tip = JSON.stringify(res)
				Utils.showAlert('收藏失败' + tip);
			}
		});
	}*/

	/*public static addColorSign(callBack: Function): void {
		if (GameConfig.isQQ) {
			if (typeof qq == 'undefined') {
				return;
			}
			qq.addColorSign({
				success: (res) => {
					if (callBack) {
						callBack();
					}
				},
				fail: (res) => {
					let errmsg = JSON.stringify(res).toString()
					console.log("fail" + errmsg);
					Utils.showAlert('添加彩签失败，你拒绝次操作')
				}
			})
		}
	}*/
	/***
	 * // 一次性订阅
		qq.subscribeAppMsg({
		tmplIds: ['123','456','789'],
		subscribe: true,
		success(res) {
			console.log("----subscribeAppMsg----success", res);
		},
		fail(res) {
			console.log("----subscribeAppMsg----fail", res);
		}
		});

		// 长期订阅
		qq.subscribeAppMsg({
		subscribe: true,
		success(res) {
			console.log("----subscribeAppMsg----success", res);
		},
		fail(res) {
			console.log("----subscribeAppMsg----fail", res);
		}
		});
	 * 订阅消息
	 */
	/*public static requestSubscribeGameMessage(message: string, callBack: Function = null): void {
		if (GameConfig.isQQ) {
			if (typeof qq == 'undefined') {
				return;
			}
			console.log('message ' + message)
			qq.subscribeAppMsg({
				// tmplIds: [message],
				subscribe: true,
				success: (res) => {
					Utils.showAlert('订阅成功')
					if (callBack) {
						callBack();
					}
					Utils.sendWitArgs(game.KeyCode.CALL_SUBSCRIBE_MESSGE, { idList: [message] })
				},
				fail: (res) => {
					let errCode = parseInt(res.errCode);
					let subscribeAppMsgCode = res.SubscribeAppMsgCode || res.subscribeAppMsgCode;
					let errmsg = ""
					console.log("fail" + JSON.stringify(res).toString());

					if (subscribeAppMsgCode <= 0) {
						errmsg = '您已经选择了暂不订阅消息'
					}
					switch (errCode) {
						case 10001:
							errmsg = '参数传空了'
							break;
						case 10002:
							errmsg = '网络问题，请求消息列表失败'
							break;
						case 10003:
							errmsg = '网络问题，订阅请求发送失败'
							break;
						case 10004:
							errmsg = '参数类型错误'
							break;
						case 10001:
							errmsg = '参数传空了'
							break;
						case 10005:
							errmsg = '无法展示 UI，一般是小程序这个时候退后台了导致的'
							break;
						case 20001:
							errmsg = '没有模板数据，一般是模板 ID 不存在 或者和模板类型不对应 导致的'
							break;
						case 20002:
							errmsg = '模板消息类型 既有一次性的又有永久的'
							break;
						case 20003:
							errmsg = '模板消息数量超过上限'
							break;
						case 20004:
							errmsg = '用户关闭了主开关，无法进行订阅'
							break;
						case 20005:
							errmsg = '小程序被禁封'
							break;
					}

					if (errmsg.length > 0) {
						Utils.showAlert(errmsg);
					}
				},
			})
		} else {
			if (typeof wx == 'undefined') {
				return;
			}
			wx.requestSubscribeMessage({
				tmplIds: [message],
				success: (res) => {
					let msg = res[message];
					if (res[message] == 'accept') {
						if (this.subscriptionsSetting == null) {
							this.subscriptionsSetting = {};
						}
						this.subscriptionsSetting[message] = "accept";
						Utils.sendWitArgs(game.KeyCode.CALL_SUBSCRIBE_MESSGE, { idList: [message] })
						Utils.showAlert("订阅次数+1");
					} else {
						if (msg == "reject") {
							Utils.showAlert("您已经拒绝订阅该条消息")
						} else if (msg == "ban")
							Utils.showAlert('该条消息已被后台封禁');
					}
				},
				fail: (res) => {
					let errCode = parseInt(res.errCode);
					let errmsg = ""
					console.log("fail" + JSON.stringify(res).toString());
					switch (errCode) {
						case 10001:
							errmsg = '参数传空了'
							break;
						case 10002:
							errmsg = '网络问题，请求消息列表失败'
							break;
						case 10003:
							errmsg = '网络问题，订阅请求发送失败'
							break;
						case 10004:
							errmsg = '参数类型错误'
							break;
						case 10001:
							errmsg = '参数传空了'
							break;
						case 10005:
							errmsg = '无法展示 UI，一般是小程序这个时候退后台了导致的'
							break;
						case 20002:
							errmsg = '模板消息类型 既有一次性的又有永久的'
							break;
						case 20003:
							errmsg = '模板消息数量超过上限'
							break;
						case 20004:
							errmsg = '用户关闭了主开关，无法进行订阅'
							break;
						case 20005:
							errmsg = '小程序被禁封'
							break;
					}

					if (errmsg.length > 0) {
						Utils.showAlert(errmsg);
					}
				},
			})
		}

	}*/

	/***
	 * 订阅消息列表
	 */
	/*public static requestSubscribeMessages(message: Array<string>, callBack: Function = null): void {
		if (typeof wx == 'undefined') {
			return;
		}
		if (game.GameData.Instance.guideStatus) {
			return;
		}
		wx.requestSubscribeMessage({
			tmplIds: message,
			success: (res) => {
				// if (res[message] == 'accept') {
				// 	this.subscriptionsSetting = {};
				// 	this.subscriptionsSetting[message] = "accept";
				// }
				Utils.sendWitArgs(game.KeyCode.CALL_SUBSCRIBE_MESSGE, { idList: message })
				Utils.showAlert('订阅成功')
			},
			fail: (res) => {
				console.info(res)
				Utils.showAlert('订阅失败')
			},
		})
	}*/

	/*public static setUserCloudStorage() {
		if (GameConfig.isQQ) {
			if (typeof qq == 'undefined') {
				return;
			}
			qq.setUserCloudStorage(
				{
					KVDataList: [{ key: "userLevel", value: GameData.Instance.getPlayerLevel() }],
					success: function (args) {
						console.log("Utils ->  setUserCloudStorage sucess .", args);
					},
					fail: function (args) {
						console.log("Utils ->  setUserCloudStorage fail .", args);
					}
				}
			);
		}
	}*/

	/**
	 * 屏幕常亮
	 */
	/*public static setKeepScreenOn() {
		if (typeof wx == 'undefined') {
			return;
		}
		if (!GameConfig.isQQ) {
			wx.setKeepScreenOn({
				keepScreenOn: true
			})
		}
	}*/

	/**
	 * 领取奖励后显示出来
	 * @param dropId  掉落包id
	 */
	/*public static showAward(dropId: number): void {
		let arr = DropPackManager.Instance.getItem(dropId) || [];
		let arrTemp: Array<any> = [];

		arr.forEach((element) => {
			if (element.entNum > 0) {
				arrTemp.push({ itemId: element.entId, itemCount: element.entNum });
			}
		});
		if (arrTemp.length > 0) {
			CommPanelEffectsControl.Instance.showPanel(4, arrTemp);
		}
	}*/

	/**
	 * 领取奖励后显示出来2
	 * @param awardStr  itemId,num; itemId,num;...
	 */
	/*public static showAwardByStr(awardStr: string): void {
		let arr: Array<string> = awardStr.split(";");
		let arrTemp: Array<any> = [];
		arr.forEach((element) => {
			let arr2: Array<string> = element.split(",");
			arrTemp.push({ itemId: arr2[0], itemCount: arr2[1] });
		});
		CommPanelEffectsControl.Instance.showPanel(4, arrTemp);
	}*/


	/**
	 * 显示描述框
	 */
	public static showDesc(activitiesdescId: number): void {
		//TipsDescControler.getInstance().showPanel(activitiesdescId);
	}

	/**
	 * 一个常用于测试每秒钟创建了多少个对象的函数，数量：120以下最好
	 * 检测实例数
	 */
	public static checkCount(): void {
		var hashCount = egret.$hashCount;
		setInterval(() => {
			var newCount = egret.$hashCount;
			var diff = newCount - hashCount;
			hashCount = newCount;
			console.log('new instance count ' + diff + ' ');
		}, 1000)
	}

	/**
	 * 君主头像 的背景颜色 （金色武将头像是金色背景，其他
	 */
	public static getKingHeadBgUrl(headUrl: string): string {
		let arr: Array<string> = ["baiqi_png", "yingzheng_png", "limu_png", "xinlingjun_png", "pingyuanjun_png", "chunshenjun_png", "zhongwuyan_png", "sunbin_png", "gaojianli_png", "mengchangjun_png"];
		if (arr.indexOf(headUrl) > -1) {
			return 'quality_7_di_png';
		} else {
			return "";
		}
	}

	public static toStringNotNull(obj: any): string {
		if (obj == null) return "";
		return String(obj);
	}

	/**
	 * 君主头像框
	 */
	/*public static setKingHeadKuang(img: eui.Image, headFrameId: number, scaleValue: number = 1): void {
		if (img == null || headFrameId == null || headFrameId == 0) return;
		let obj: UserHeadIconEntity = UserIconManager.Instance.getUserHeadIcon(headFrameId);
		img.source = obj.iconPath;
		img.scaleX = img.scaleY = scaleValue;
	}*/

	/**
	 * 哪些界面不自动释放
	 */
	public static filterControlerList(tag): boolean {
		let list = [
			'MainCityController',
			'ShowItemControler',
			'AreanTroopInfoControler',
			'SelectBoxRewardControler',
			'BagControler',
			'RewardShowControler',
			'KaiFuJingSaiControler',
			'BuyOrUse5Controler',
			'BuyControler',
			'GuanFuZengYiControler',
			'SoldierControler',
			'TipsControler',
			'SoldiersSupply',
			'UseItemControler',
			'CangKuControler',
			'AchievementTipsControler',
			'ManorDecorateMessageControler',
			'MilitarySkillTipsController',
			'MonarchChangeIconControler',
			'PlayerInfoControler',
			'TechSpeedControler',
			'SoldiersSupplyUseItemControler',
			'MarchDetailsControls',
			'TreasureNpcController',
			'TreasureInfoController',
			'GerAwardControler',
			'XiulianguanGetExpSuccController',
			'HeroDismissaControler',
			'BuildingSpeedControler',
			'CityWarJiceController',
			'TeamMemberControler',
			'BuyOrUserControler',
			'HeroSkillResolveControl',
			'ChapterEliteInfoController',
			'ChapterInfoController',
			'WeekMonthRewardShowControler',
			'HeroAllEquipControler',
			'HeroAllGemControler',
			'HeroGemDetatlsControler',
			'HeroSkillForgetControl',
			'HeroSkillPromoteControl',
			'HeroSkillStudyControl',
			'HeroSkillUpLvControl',
			'HeroUpLvControler',
			'ManorCarsChangeControler',
			'IttControler',
			'HeroStartSuccendControl',
			'CityFigureControler',
			'HeroEquipDetatlsControler',
			'KuafuBattleController',
			'KFArenaMainController',
			'KFArenaBattleResultController',
			'ResistHunsMain',
			'ChapterTargetController',
			'RedPacketControler',
			'RedPacketGetControler',
			'RedPacketSendControler',
		];
		let index = list.indexOf(tag);
		return index == -1;
	}
}

enum Color {
	BACKGROUND_COLOR = 0x131915, //背景颜色
	LABEL_COLOR = 0xd3b876, //标签颜色
	RED = 0xe45050, //红色
	WHIITE = 0xc4cdce, //白色//修改后灰白色
	GREED = 0x76c05c, //绿色
	BLUE = 0x698d9b, //蓝色
	PURPLE = 0xd569e5, //紫色
	ORANGE = 0xf29a54, //橙色
	FIGHTING_COLOR = 0xd2c485, //战力颜色
	BLACK = 0x00000000,
	YELLOW = 0x00e3d7aa, //黄色
	PLANIN = 0xaaa9a9, //浅白
	GOLD = 0xfffac5 //金色
}

class SUBMESSAGE {
	public static WENDING = "tC0g06zW_8EaE0k8AwuIBc_5emtVLyhJA4o5tQi52Ak"//问鼎中原玩家报名提醒; 联盟问鼎按钮
	public static ZHENGBA_OPEN = "tC0g06zW_8EaE0k8AwuIBarakynVlf5saI_VzfbNJpo";//群雄争霸玩家报名提醒 联盟群雄争霸按钮
	public static TECH_UPDATE_COMPLETE = "XRZ-6E3iq6W-SNz3p_VNOCQpHofwYYe8HgjIupzBpOg";//科技升级完成	 主界面科技按钮
	public static GOVER_UPDATE_COMPLETE = "wmwk7h5bgVizkR2aM9fUKSwmGeNOqjSFuSeqINMpMMM";//官府升级完成 点击官府
	public static CITY_ATTECTED = "xEIcLc6V7Hf8v5qsqSFMRhgtESWtPWBGx9Om72Ezizc";//城池被袭通知		出城按钮
	public static GAME_ATTECT = "Th2xljkS_5U4k0WL7LWc_BN3EkSeoyvjqllSCCsNBmE";//游戏基地攻击提醒	设置界面订阅按钮	
	public static PHY_CHANGE = "FUads9jqEWi6dO0JdbC9Dxz5fibZm1Fu4x907RaKZZQ";//体力恢复提醒	普通副本触发	
	public static MANOR_CHANGE = '0J_NS23yf4I0-T7tTN4n3Ttk2C8Ldr_pMMKmiYVirOM';//星能不满
	public static QQMESSAGE = "92e76568cc494768e83a6e0b194546c8";
}

class CombatType {
	public static COMBAT_TYPE_MOON = 'MOON'; //副本
	public static COMBAT_TYPE_BABEL = 'BABEL'; //千重楼
	public static COMBAT_TYPE_BABEL2 = 'BABEL2'; //云中重楼
	public static COMBAT_TYPE_ARENA = 'ARENA'; //竞技场
	public static COMBAT_TYPE_PROV = 'PROVINCE'; //郡城战
	public static COMBAT_TYPE_MAP_PVP = 'MAP_PVP'; //大地图-玩家出征玩家
	public static COMBAT_TYPE_MAP_PVE = 'MAP_PVE'; //大地图-玩家出征野怪
	public static COMBAT_TYPE_MAP_EVP = 'MAP_EVP'; //大地图-野怪出征玩家
	public static COMBAT_TYPE_MAP_RES = 'MAP_RES'; //大地图-在资源地发生战斗
	public static COMBAT_TYPE_MAP_HELP = 'MAP_HELP'; //大地图-与协防玩家发生战斗
	public static COMBAT_TYPE_MAP_CITY = 'MAP_CITY'; //大地图-名城战
	public static COMBAT_TYPE_MAP_BOSS = 'MAP_BOSS'; //大地图-世界boss
	public static COMBAT_TYPE_MAP_WORLD = 'MAP_WORLD'; //大地图-国战
	public static COMBAT_TYPE_MAP_HUN = 'MAP_HUN'; //大地图-玩家出征匈奴营寨
	public static COMBAT_TYPE_MERGESONE = 'MERGESONE'; //合璧
	public static COMBAT_TYPE_XIRONG = 'XIRONG'; //血战西戎
	public static COMBAT_TYPE_MJ = 'MIJING'; //秘境寻宝
	public static COMBAT_TYPE_BUILDING = 'BUILDING'; //解锁npc
	public static COMBAT_TYPE_DRAGON = 'DRAGONTIGER'; //龙虎
}

//TIPS in egret function's call and apply is the same;


/**
 * 获取剩余秒数 eta 服务器传来的时间戳 毫秒数  
 * 返回值剩余秒数  0 倒计时完毕
 * isFloor 是否向下取整
 * @param eta 服务器传来的时间戳 毫秒数
 */
/*function timestamp(eta, isFloor: boolean = true): number {
	let t = game.GameMonitor.Instance.serverTime;
	let interval = 0;

	if (isFloor) {
		interval = Math.floor((eta - t) / 1000);
	} else {
		interval = Math.ceil((eta - t) / 1000);
	}

	return Math.max(interval, 0);
}*/

function callDelay(delay: number) {
	let func = function (target, key: string, descriptor: PropertyDescriptor) {
		let method = descriptor.value;

		let tkey = `$isDelay${key}`;
		let newfunc = function (...args) {
			this[tkey] = false;
			method.call(this, ...args);
		};

		let newfunc2 = function (...args) {
			if (this[tkey]) return;
			this[tkey] = true;
			egret.setTimeout(newfunc, this, delay, ...args);
		};

		descriptor.value = newfunc2;
		return descriptor;
	};

	return func;
}
