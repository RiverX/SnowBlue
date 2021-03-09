var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var ReleaseEntity = (function () {
        function ReleaseEntity() {
            /**
             * 被哪一个类所使用的
             */
            this.tags = [];
        }
        return ReleaseEntity;
    }());
    game.ReleaseEntity = ReleaseEntity;
    __reflect(ReleaseEntity.prototype, "game.ReleaseEntity");
    var GCManager = (function (_super) {
        __extends(GCManager, _super);
        function GCManager() {
            var _this = _super.call(this) || this;
            _this._waitForDispose = [];
            _this._releaseTime = 1000 * 60 * 2;
            _this._releseUesdTime = 1000 * 60 * 2;
            _this.armatureDisplayList = [];
            return _this;
        }
        GCManager.prototype.init = function () {
            if (this.isDisposeImmediately()) {
                game.TimerManager.Instance.doTimer(this._releaseTime, 0, this.__checkRes__, this);
            }
            this._cacheDic = new Dictionary();
        };
        Object.defineProperty(GCManager, "Instance", {
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        GCManager.prototype.removeFromWaittingList = function (entity) {
            var index = this._waitForDispose.indexOf(entity);
            if (index != -1) {
                //Utils.log('remove the element ' + index)
                this._waitForDispose.splice(index, 1);
                // delete this._waitForDispose[index];
            }
        };
        /**
         * @param source 资源名称
         * @param isUse ture使用false未使用
         * @param tag 被使用的controler
         */
        GCManager.prototype.updateRes = function (source, isUse, tag) {
            var resName;
            if (typeof source == 'string') {
                resName = source;
            }
            else {
                return;
            }
            if (resName == null) {
                return;
            }
            var entity = this._cacheDic.get(resName);
            if (entity == null) {
                entity = new ReleaseEntity();
                entity.resourceName = resName;
                entity.tags = [];
            }
            entity.lastUseTimer = egret.getTimer();
            entity.isUse = isUse;
            //data tags;
            var index = entity.tags.indexOf(tag);
            if (isUse) {
                if (index < 0) {
                    entity.tags.push(tag);
                }
                this.removeFromWaittingList(entity);
            }
            else {
                if (index > -1) {
                    entity.tags.splice(index, 1);
                }
            }
            this._cacheDic.add(resName, entity);
        };
        GCManager.prototype.__releaseRes__ = function () {
            if (this._waitForDispose.length == 0) {
                game.TimerManager.Instance.remove(this.__releaseRes__, this);
                return;
            }
            // console.log('__releaseRes__');
            for (var n in this._waitForDispose) {
                var entity = this._waitForDispose[n];
                if (RES.hasRes(entity.resourceName)) {
                    var isRelease = RES.destroyRes(entity.resourceName);
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
        };
        GCManager.prototype.is = function (obj, className) {
            return egret.is(obj, className);
        };
        //把一段时间不用的资源清理掉
        GCManager.prototype.__checkRes__ = function () {
            // console.log('__checkRes__');
            var n;
            if (this._waitForDispose == null) {
                this._waitForDispose = new Array();
            }
            var keys = this._cacheDic.keys;
            for (var i in keys) {
                var key = keys[i];
                var obj = this._cacheDic.get(key);
                if (obj.tags.length > 0) {
                    /*if (Utils.isTest()) {
                        // console.log(obj.resourceName + '被' + obj.tags.toString() + '使用');
                    }*/
                }
                else {
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
                game.TimerManager.Instance.doTimer(1000, 0, this.__releaseRes__, this);
            }
        };
        /**
         * 释放图片资源
         */
        GCManager.prototype.disposeImage = function (source, url) {
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
        };
        /**
         * 释放序列帧资源
         */
        GCManager.prototype.disposeMovieClip = function (framImage, url) {
            if (framImage.parent) {
                framImage.parent.removeChild(framImage);
            }
            if (url != null) {
                var texture = url + '_png';
                RES.destroyRes(texture);
            }
            framImage = null;
        };
        /**
         * @param effect 显示对象
         * @param effectName 资源名称
         * 根据URL(resource/assets/*)释放资源（仅使用于通过url加载的资源）
         */
        GCManager.prototype.disposeByUrl = function (effect, effectName) {
            if (effect && effect.parent) {
                effect.parent.removeChild(effect);
            }
            var configUrl = Utils.GAME_EFFECT_PATH + effectName + '.json';
            var textureUrl = Utils.GAME_EFFECT_PATH + effectName + '.png';
            RES.destroyRes(configUrl, false);
            RES.destroyRes(textureUrl, false);
            effect = null;
        };
        /**
         * @see GCManager.disposeEffects
         * list 资源数组(非图集图片名称集)
         * 释放序列帧特效
         */
        GCManager.prototype.disposeEffects = function (list) {
            while (list.length > 0) {
                var resName = list.shift();
                RES.destroyRes(resName, false);
            }
        };
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
        GCManager.prototype.deathMode = function () {
            this.clearDragonBones();
            game.ViewManager.Instance.closeAllWidget();
            //SoundManager.Instance.destroy();
            this.disposeRES();
        };
        GCManager.prototype.disposeRES = function () {
            RES.destroyRes('heroQuailty_json');
            RES.destroyRes('item_110_sheet_json');
            RES.destroyRes('item70Sheet_json');
            RES.destroyRes('item_equip_json');
            RES.destroyRes('heroCommon_json');
            RES.destroyRes('heroGoldenSheet_json');
            RES.destroyRes('heroNormalCard_json');
            RES.destroyRes('skillSheets_json');
        };
        /**
         * 清除龙骨特效本来需要
         */
        GCManager.prototype.clearDragonBones = function () {
            for (var i in this.armatureDisplayList) {
                var armture = this.armatureDisplayList[i];
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
        };
        /**
         * 是否立即释放 PC不释放
         */
        GCManager.prototype.isDisposeImmediately = function () {
            /*let flag = PlatformUtils.isIPhone() || PlatformUtils.isAndroid()
            return flag;*/
            return false;
        };
        return GCManager;
    }(game.Singleton));
    game.GCManager = GCManager;
    __reflect(GCManager.prototype, "game.GCManager");
})(game || (game = {}));
//# sourceMappingURL=GCManager.js.map