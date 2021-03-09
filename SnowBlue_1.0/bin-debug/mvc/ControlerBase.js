var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ControlerBase = (function () {
        function ControlerBase() {
            /**
             * seekWidgetByImage 找到改界面用到的所有资源
             */
            this.releaseImages = []; //该界面用到的所有资源
            this.manualRelaseImages = []; //手动列表
            /**
             * 控制器控制的view中哪些资源不释放
             */
            this.filterList = [];
            /**
             * 该功能使用图集，释放的时候标记图集即可
             */
            this.sheets = [];
            this.enabledClickRectClose = true;
            this.isPanelShow = false;
        }
        ControlerBase.prototype._identity = function (args) {
            return args;
        };
        /***
         * 注册点击事件 可以带参数
         * @param data 传递的数据 比如说按钮的id tag 之类的
         * @param fun 回调函数
         * @param btn 添加事件的对象
         * @param isPlaySound:是否播放音效
         */
        ControlerBase.prototype.REG_TAP = function (fun, btn, target, showAnimation, sound, isPlaySound) {
            if (showAnimation === void 0) { showAnimation = true; }
            if (sound === void 0) { sound = ''; }
            if (isPlaySound === void 0) { isPlaySound = true; }
            function onClick(e) {
                if (showAnimation) {
                    var orginalScale = btn.scaleX;
                    this.btnAnimation(btn, 0.95, orginalScale);
                }
                fun.apply(target, [e]);
                if (isPlaySound) {
                    var soundName = "62_bt_tongyonganniu";
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
        };
        /***
         * 移除事件
         * @param data 传递的数据 比如说按钮的id tag 之类的
         * @param fun 回调函数
         * @param btn 添加事件的对象
         */
        ControlerBase.prototype.UN_REG_TAP = function (fun, btn, target) {
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, fun, target);
        };
        ControlerBase.prototype.btnAnimation = function (button, scale, initScale) {
            egret.Tween
                .get(button)
                .to({ scaleX: scale, scaleY: scale }, 50)
                .to({ scaleX: initScale, scaleY: initScale }, 50);
        };
        ControlerBase.prototype.setWidgetVisible = function (visible) {
            if (this.base_view) {
                this.base_view.$setVisible(visible);
            }
        };
        ControlerBase.prototype.addEvent = function (_eventStr, _fun, target) {
            var key = _eventStr.toString();
            if (target) {
                game.EventManager.getInstance().addEventListener(key, _fun, target);
            }
            else {
                game.EventManager.getInstance().addEventListener(key, _fun, this);
            }
        };
        ControlerBase.prototype.removeEvent = function (_eventStr, _fun, targe) {
            var key = _eventStr.toString();
            game.EventManager.getInstance().removeEventListener(key, _fun, targe);
        };
        /**
         * _view 显示对象
         * _layindex 显示层级 例如  game.PanelManager.L_MAIN
         * bClean 是否清理当前层所有显示对象，默认不清理
        */
        ControlerBase.prototype.show = function (_view, _layindex, bClean, parent) {
            var _this = this;
            if (_layindex === void 0) { _layindex = 2; }
            if (bClean === void 0) { bClean = false; }
            if (parent === void 0) { parent = null; }
            if (this.base_view != null) {
                throw Error(' this view always opened on the screen');
            }
            this.TAG = this.getTag();
            this.releaseImages = [];
            this.manualRelaseImages = [];
            this._images = [];
            this.base_view = _view;
            this._layerIndex = _layindex;
            this.base_view.setCreateFun(function () {
                var clsName = egret.getQualifiedClassName(_this);
                var i = clsName.lastIndexOf('.') + 1;
                clsName = clsName.slice(i, clsName.length);
                _this.createdCallBack();
                game.EventManager.getInstance().dispatchEventWith(clsName);
            }, this);
            var p;
            if (parent) {
                p = parent;
            }
            else {
                p = game.LayerManager.getInstance().getPanel(_layindex);
            }
            if (bClean) {
                while (p.numChildren) {
                    p.removeChildAt(0);
                }
            }
            var clearLayout = false;
            if (clearLayout) {
                this.base_view.includeInLayout = false;
                this.base_view.x = (game.GameConfig.GameWidth - this.base_view.width) / 2;
                this.base_view.y = (game.GameConfig.GameHeight - this.base_view.height) / 2;
            }
            this.onAwake();
            p.addChild(this.base_view);
            game.ViewManager.Instance.register(_layindex, this);
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
        };
        ControlerBase.prototype.initComplete = function () { };
        ControlerBase.prototype.onAwake = function () {
            var _this = this;
            var btnClose = this.base_view.close_btn;
            var btnLeftClose = this.base_view.btnLeftClose;
            //right top close button
            if (btnClose != null) {
                btnClose.$setVisible(false);
                if (btnClose.$visible) {
                    var widgetArr = []; //WidgetsManager.Instance.closeList;
                    var flag = widgetArr.indexOf(this.base_view.skinName) != -1;
                    if (flag) {
                        this.REG_TAP(function () {
                            game.ViewManager.Instance.closeAllWidget();
                        }, btnClose, this);
                    }
                    else {
                        this.REG_TAP(function () {
                            _this.close();
                        }, btnClose, this);
                    }
                }
            }
            //let top close button
            if (btnLeftClose != null) {
                btnLeftClose.$setVisible(true);
                this.REG_TAP(function () {
                    _this.close();
                }, btnLeftClose, this);
            }
            var child = this.base_view.getChildAt(0);
            if (child && child instanceof eui.Rect) {
                child.percentWidth = 100;
                child.alpha = 0.5;
                if (this.enabledClickRectClose == true) {
                    child.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
                }
            }
        };
        ControlerBase.prototype.updateResCache = function (flag) {
            var arr = this.releaseImages;
            for (var i in arr) {
                var name_1 = arr[i];
                var index = this.filterList.indexOf(name_1);
                if (index == -1) {
                    game.GCManager.Instance.updateRes(name_1, flag, this.TAG);
                }
            }
        };
        //手动释放列表
        ControlerBase.prototype.releaseManuAssets = function () {
            var arr = this.manualRelaseImages;
            for (var i in arr) {
                var name_2 = arr[i];
                var index = this.filterList.indexOf(name_2);
                if (index == -1) {
                    game.GCManager.Instance.updateRes(name_2, false, this.TAG);
                }
            }
        };
        ControlerBase.prototype.onDestroy = function () {
            var close_btn = this.base_view.close_btn;
            var key;
            if (close_btn != null) {
                close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            }
        };
        ControlerBase.prototype.seekWidgetByImage = function (container, list) {
            if (container && container.$children) {
                var children = container.$children;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (child instanceof eui.Image) {
                        var bm = child;
                        this._images.push(bm);
                        if (typeof bm.source == 'string') {
                            var name_3 = bm.source;
                            if (name_3.length > 0) {
                                var item = RES["config"].getResource(name_3);
                                if (item != null) {
                                    if (list.indexOf(name_3) == -1) {
                                        list.push(name_3);
                                    }
                                }
                            }
                        }
                    }
                    else if (child instanceof eui.List) {
                    }
                    else {
                        this.seekWidgetByImage(child, list);
                    }
                }
            }
        };
        /**
        * 讲界面中所有的image 设置成null
        */
        ControlerBase.prototype.resetSourceNull = function () {
            for (var i = 0; i < this._images.length; i++) {
                var image = this._images[i];
                image.source = null;
            }
            this._images = [];
        };
        /**
         *  关闭这个界面
         */
        ControlerBase.prototype.close = function () {
            if (this.base_view != null) {
                if (Utils.filterControlerList(this.TAG)) {
                    // if (this.isContainList) {
                    this.updateResCache(false);
                    // }
                }
                this.resetSourceNull();
                this.releaseManuAssets();
                if (this.base_view.parent != null) {
                    game.ViewManager.Instance.remove(this._layerIndex, this);
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
                }
                else {
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
        };
        ControlerBase.prototype.detectedGameClue = function () {
            /*let flag = LayerManager.getInstance().isShowGameClue();
            let gameClubBtn = MainCityController.Instance.gameClubBtn;
            if (gameClubBtn) {
                if (flag) {
                    gameClubBtn.show();;
                } else {
                    gameClubBtn.hide();
                }
            }*/
        };
        ControlerBase.prototype.getTag = function () {
            var clsName = Object.getPrototypeOf(this).__class__;
            var index = clsName.lastIndexOf('.');
            if (index != -1) {
                clsName = clsName.substr(index + 1, clsName.length);
            }
            return clsName;
        };
        return ControlerBase;
    }());
    game.ControlerBase = ControlerBase;
    __reflect(ControlerBase.prototype, "game.ControlerBase");
})(game || (game = {}));
//# sourceMappingURL=ControlerBase.js.map