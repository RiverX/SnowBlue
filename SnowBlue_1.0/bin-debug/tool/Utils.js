var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "GAME_UI_PATH", {
        get: function () {
            return 'resource/assets/GameUI/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "GAME_EFFECT_PATH", {
        get: function () {
            return 'resource/assets/sheet/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils, "GAME_DARGON_PATH", {
        get: function () {
            return 'resource/assets/dragons/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据路径获取文件名
     */
    Utils.getFileNameFromPath = function (path) {
        var filename = null;
        if (path && path.length > 0) {
            filename = path.split("/").pop();
        }
        return filename;
    };
    Utils.createImageByName = function (name) {
        var image = new eui.Image();
        image.source = name;
        return image;
    };
    Utils.localTolocal = function (child1, child2) {
        var p1 = child1.localToGlobal();
        var p2 = child2.localToGlobal();
        var off = p1.subtract(p2);
        var x = Math.abs(off.x);
        var y = Math.abs(off.y);
        return new egret.Point(x, y);
    };
    Utils.uniqArray = function (orginal) {
        var dic = new Dictionary();
        for (var i in orginal) {
            var v = orginal[i];
            dic.add(v.toString(), v);
        }
        return dic.values;
    };
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
    Utils.identity = function (args) {
        return args;
    };
    /**
     * 注册按钮点击事件
     */
    Utils.REG_TAP = function (fun, btn, target, data, sound) {
        if (data === void 0) { data = null; }
        if (sound === void 0) { sound = ''; }
        function btnAnimation(button, scale, initScale) {
            egret.Tween
                .get(button)
                .to({ scaleX: scale, scaleY: scale }, 50)
                .to({ scaleX: initScale, scaleY: initScale }, 50);
        }
        function onClick(e) {
            var orginalScale = btn.scaleX;
            btnAnimation(btn, 0.95, orginalScale);
            fun.apply(target, [e]);
            if (sound.length == 0) {
                //SoundControl.playSound('62_bt_tongyonganniu');
            }
            else {
                //SoundControl.playSound(sound);
            }
        }
        if (btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, onClick, target);
        }
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, onClick, target);
    };
    Utils.send = function (cmd, succFunc, failFunc, target) {
        //ClientSocket.getInstance().send(cmd, succFunc, failFunc, target);
    };
    Utils.sendWitArgs = function (cmd, data, succFunc, failFunc, target) {
        //ClientSocket.getInstance().sendWitArgs(cmd, data, succFunc, failFunc, target);
    };
    /**
     * 返回一个在min和max之间的随机浮点数
     */
    Utils.range = function (min, max) {
        var seed = new Date().getTime();
        max = max || 1;
        min = min || 0;
        seed = (seed * 9301 + 49297) % 233280;
        var rnd = seed / 233280.0;
        return min + rnd * (max - min);
    };
    /**
     * 返回 min（包含）～ max（包含）之间的数字
     */
    Utils.random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Utils.addEvent = function (_eventStr, _fun, target) {
        var key = _eventStr.toString();
        game.EventManager.getInstance().addEventListener(key, _fun, target);
    };
    Utils.removeEvent = function (_eventStr, _fun, target) {
        var key = _eventStr.toString();
        game.EventManager.getInstance().removeEventListener(key, _fun, target);
    };
    Utils.dispatchEvent = function (_eventStr, data) {
        if (data === void 0) { data = null; }
        game.EventManager.getInstance().dispatchEventWith(_eventStr, false, data);
    };
    /**显示警告框*/
    Utils.showAlert = function (str) {
        //EventManager.getInstance().dispatchEventWith(EventName.OPEN_WARNING_TIPS, false, str);
    };
    Utils.showItemTips = function (itemEntity) {
        //ShowItemControler.Instance.showPanel(itemEntity);
    };
    Utils.registerTabEvent = function (btnTab, callback, target) {
        btnTab.setSelectCallFun(callback, target);
    };
    /***富文本显示内容 */
    Utils.setRichTextContent = function (text, content) {
        text.textFlow = new egret.HtmlTextParser().parser(content);
    };
    Utils.replaceAll = function (content, patten, target) {
        if (content == null || content == '') {
            return content;
        }
        while (content.indexOf(patten) != -1) {
            content = content.replace(patten, target);
        }
        return content;
    };
    Utils.formatRichText = function (content) {
        var s = content;
        while (s.indexOf('\\n') > -1) {
            s = s.replace('\\n', '\n');
        }
        return s;
    };
    /**
     * 获取星期
     */
    Utils.getWeekDate = function () {
        var now = new Date();
        var day = now.getDay();
        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week = weeks[day];
        return week;
    };
    Utils.arrayUnique = function (arr) {
        return arr.filter(function (item, index) {
            return arr.indexOf(item) === index;
        });
    };
    Utils.split = function (s, rex) {
        s = s + '';
        var index = s.indexOf(rex);
        if (index == -1 && s.length > 0) {
            return [s];
        }
        else {
            return s.split(rex);
        }
    };
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
    Utils.disableProgress = function (grossBar) {
        grossBar.slideDuration = 0;
    };
    /**交换显示对象的父容器 */
    Utils.switchParent = function (child, parent, x, y) {
        if (child && child.parent) {
            child.parent.removeChild(child);
        }
        child.x = x;
        child.y = y;
        parent.addChild(child);
    };
    Utils.traceObject = function (obj) {
        /*if (Utils.isTest()) {
            console.log('===============begin================');

            for (let key in obj) {
                let value = obj[key];
                console.log(key + ' = ' + value);
            }
            console.log('===============end================');
        }*/
    };
    Utils.getArrayString = function (arr) {
        var str = '';
        if (arr != null) {
            arr.forEach(function (ele) {
                str += ele;
            });
        }
        return str;
    };
    Utils.removeSelf = function (self) {
        if (self && self.parent) {
            self.parent.removeChild(self);
            self = null;
        }
    };
    Utils.removeFrame = function (_frame) {
        if (_frame != null) {
            _frame.destroyTimer();
            //GCManager.Instance.disposeMovieClip(_frame);
        }
    };
    /**
     * 根据组名获取组内资源
     */
    Utils.getResByGroups = function (groups) {
        var names = [];
        for (var i in groups) {
            var group = groups[i];
            var arr = RES.getGroupByName(group);
            for (var res in arr) {
                var item = arr[res];
                names.push(item.name);
            }
        }
        return names;
    };
    Utils.setVisible = function (component, visible) {
        var v = component.visible;
        if (visible != v) {
            component.$setVisible(visible);
        }
    };
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
    Utils.playAnimation = function (target, isLoop) {
        if (isLoop === void 0) { isLoop = true; }
        if (target == null)
            return;
        if (isLoop) {
            for (var _i = 0, _a = target.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.props = { loop: true };
            }
        }
        target.play(0);
    };
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
    Utils.stopAnimation = function (target) {
        target.stop();
    };
    //tips提示动画
    Utils.showTipsEffectHandler = function (mess) {
        //CommEffectControl.showPanel(mess);
    };
    Utils.getDistance = function (p1, p2) {
        return Math.sqrt(Math.pow(p1.y - p2.y, 2) + Math.pow(p1.x - p2.x, 2));
    };
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
    Utils.getVipPicByLevel = function (lv) {
        if (lv == 0)
            return '';
        var name = 'liaotian_bg' + (13 + lv) + '_png';
        return name;
    };
    /**
     * 字典叠加将dicSource中的元素叠加到dicOriginal
     */
    Utils.dictionaryConcat = function (dicOriginal, dicSource) {
        var keys = dicSource.keys;
        for (var i in dicSource.keys) {
            var key = dicSource.keys[i];
            var value = dicSource.get(key);
            var num = dicOriginal.get(key);
            if (num == null) {
                num = value;
            }
            else {
                num += value;
            }
            dicOriginal.add(key, num);
        }
        return dicOriginal;
    };
    Utils.getTexture = function (style) {
        var texture = null;
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
        return texture;
    };
    /**
     * 合并两个战斗力
     */
    Utils.combimePowers = function (arr1, arr2) {
        var newArray = [];
        for (var i = 0; i < this.PROLIST.length; i++) {
            var key = this.PROLIST[i];
            var num = arr1[key] + arr2[key];
            newArray[key] = num;
        }
        return newArray;
    };
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
    Utils.requestSubscribeMessage = function (message, callBack) {
        if (callBack === void 0) { callBack = null; }
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
    };
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
    Utils.showDesc = function (activitiesdescId) {
        //TipsDescControler.getInstance().showPanel(activitiesdescId);
    };
    /**
     * 一个常用于测试每秒钟创建了多少个对象的函数，数量：120以下最好
     * 检测实例数
     */
    Utils.checkCount = function () {
        var hashCount = egret.$hashCount;
        setInterval(function () {
            var newCount = egret.$hashCount;
            var diff = newCount - hashCount;
            hashCount = newCount;
            console.log('new instance count ' + diff + ' ');
        }, 1000);
    };
    /**
     * 君主头像 的背景颜色 （金色武将头像是金色背景，其他
     */
    Utils.getKingHeadBgUrl = function (headUrl) {
        var arr = ["baiqi_png", "yingzheng_png", "limu_png", "xinlingjun_png", "pingyuanjun_png", "chunshenjun_png", "zhongwuyan_png", "sunbin_png", "gaojianli_png", "mengchangjun_png"];
        if (arr.indexOf(headUrl) > -1) {
            return 'quality_7_di_png';
        }
        else {
            return "";
        }
    };
    Utils.toStringNotNull = function (obj) {
        if (obj == null)
            return "";
        return String(obj);
    };
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
    Utils.filterControlerList = function (tag) {
        var list = [
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
        var index = list.indexOf(tag);
        return index == -1;
    };
    Utils.PROLIST = ['ATTACK', 'DEFENSE', 'HP', 'AGILE', 'LEADER'];
    Utils.PRONAMELIST = ['攻击', '防御', '体力', '敏捷', 'LEADER'];
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
var Color;
(function (Color) {
    Color[Color["BACKGROUND_COLOR"] = 1251605] = "BACKGROUND_COLOR";
    Color[Color["LABEL_COLOR"] = 13875318] = "LABEL_COLOR";
    Color[Color["RED"] = 14962768] = "RED";
    Color[Color["WHIITE"] = 12897742] = "WHIITE";
    Color[Color["GREED"] = 7782492] = "GREED";
    Color[Color["BLUE"] = 6917531] = "BLUE";
    Color[Color["PURPLE"] = 13986277] = "PURPLE";
    Color[Color["ORANGE"] = 15899220] = "ORANGE";
    Color[Color["FIGHTING_COLOR"] = 13812869] = "FIGHTING_COLOR";
    Color[Color["BLACK"] = 0] = "BLACK";
    Color[Color["YELLOW"] = 14931882] = "YELLOW";
    Color[Color["PLANIN"] = 11184553] = "PLANIN";
    Color[Color["GOLD"] = 16775877] = "GOLD"; //金色
})(Color || (Color = {}));
var SUBMESSAGE = (function () {
    function SUBMESSAGE() {
    }
    SUBMESSAGE.WENDING = "tC0g06zW_8EaE0k8AwuIBc_5emtVLyhJA4o5tQi52Ak"; //问鼎中原玩家报名提醒; 联盟问鼎按钮
    SUBMESSAGE.ZHENGBA_OPEN = "tC0g06zW_8EaE0k8AwuIBarakynVlf5saI_VzfbNJpo"; //群雄争霸玩家报名提醒 联盟群雄争霸按钮
    SUBMESSAGE.TECH_UPDATE_COMPLETE = "XRZ-6E3iq6W-SNz3p_VNOCQpHofwYYe8HgjIupzBpOg"; //科技升级完成	 主界面科技按钮
    SUBMESSAGE.GOVER_UPDATE_COMPLETE = "wmwk7h5bgVizkR2aM9fUKSwmGeNOqjSFuSeqINMpMMM"; //官府升级完成 点击官府
    SUBMESSAGE.CITY_ATTECTED = "xEIcLc6V7Hf8v5qsqSFMRhgtESWtPWBGx9Om72Ezizc"; //城池被袭通知		出城按钮
    SUBMESSAGE.GAME_ATTECT = "Th2xljkS_5U4k0WL7LWc_BN3EkSeoyvjqllSCCsNBmE"; //游戏基地攻击提醒	设置界面订阅按钮	
    SUBMESSAGE.PHY_CHANGE = "FUads9jqEWi6dO0JdbC9Dxz5fibZm1Fu4x907RaKZZQ"; //体力恢复提醒	普通副本触发	
    SUBMESSAGE.MANOR_CHANGE = '0J_NS23yf4I0-T7tTN4n3Ttk2C8Ldr_pMMKmiYVirOM'; //星能不满
    SUBMESSAGE.QQMESSAGE = "92e76568cc494768e83a6e0b194546c8";
    return SUBMESSAGE;
}());
__reflect(SUBMESSAGE.prototype, "SUBMESSAGE");
var CombatType = (function () {
    function CombatType() {
    }
    CombatType.COMBAT_TYPE_MOON = 'MOON'; //副本
    CombatType.COMBAT_TYPE_BABEL = 'BABEL'; //千重楼
    CombatType.COMBAT_TYPE_BABEL2 = 'BABEL2'; //云中重楼
    CombatType.COMBAT_TYPE_ARENA = 'ARENA'; //竞技场
    CombatType.COMBAT_TYPE_PROV = 'PROVINCE'; //郡城战
    CombatType.COMBAT_TYPE_MAP_PVP = 'MAP_PVP'; //大地图-玩家出征玩家
    CombatType.COMBAT_TYPE_MAP_PVE = 'MAP_PVE'; //大地图-玩家出征野怪
    CombatType.COMBAT_TYPE_MAP_EVP = 'MAP_EVP'; //大地图-野怪出征玩家
    CombatType.COMBAT_TYPE_MAP_RES = 'MAP_RES'; //大地图-在资源地发生战斗
    CombatType.COMBAT_TYPE_MAP_HELP = 'MAP_HELP'; //大地图-与协防玩家发生战斗
    CombatType.COMBAT_TYPE_MAP_CITY = 'MAP_CITY'; //大地图-名城战
    CombatType.COMBAT_TYPE_MAP_BOSS = 'MAP_BOSS'; //大地图-世界boss
    CombatType.COMBAT_TYPE_MAP_WORLD = 'MAP_WORLD'; //大地图-国战
    CombatType.COMBAT_TYPE_MAP_HUN = 'MAP_HUN'; //大地图-玩家出征匈奴营寨
    CombatType.COMBAT_TYPE_MERGESONE = 'MERGESONE'; //合璧
    CombatType.COMBAT_TYPE_XIRONG = 'XIRONG'; //血战西戎
    CombatType.COMBAT_TYPE_MJ = 'MIJING'; //秘境寻宝
    CombatType.COMBAT_TYPE_BUILDING = 'BUILDING'; //解锁npc
    CombatType.COMBAT_TYPE_DRAGON = 'DRAGONTIGER'; //龙虎
    return CombatType;
}());
__reflect(CombatType.prototype, "CombatType");
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
function callDelay(delay) {
    var func = function (target, key, descriptor) {
        var method = descriptor.value;
        var tkey = "$isDelay" + key;
        var newfunc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this[tkey] = false;
            method.call.apply(method, [this].concat(args));
        };
        var newfunc2 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this[tkey])
                return;
            this[tkey] = true;
            egret.setTimeout.apply(egret, [newfunc, this, delay].concat(args));
        };
        descriptor.value = newfunc2;
        return descriptor;
    };
    return func;
}
//# sourceMappingURL=Utils.js.map