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
var FrameImage = (function (_super) {
    __extends(FrameImage, _super);
    function FrameImage() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.loopNum = 0;
        _this.default = 1000 / 60;
        _this.tap = 1; //跳帧的话，每隔急几帧显示图片
        _this.countNum = 0;
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            _this.destroyTimer();
        }, _this);
        return _this;
    }
    FrameImage.prototype.play = function (array, interval, loop, callBack, bindTarget, startFrame) {
        if (loop === void 0) { loop = -1; }
        if (startFrame === void 0) { startFrame = 0; }
        this.textures = array;
        this._completeCallBack = callBack;
        this.bindTarget = bindTarget;
        this.loopNum = loop;
        if (this.textures == null && this.textures.length == 0) {
            throw Error('the source is illegal');
        }
        this.texture = this.textures[this.index];
        this.destroyTimer();
        if (interval / array.length < this.default) {
            this.tap = (array.length / (interval / this.default));
            interval = this.default;
        }
        if (null == this._timer) {
            this._timer = new egret.Timer(interval); //delay 计时器事件间的延迟（以毫秒为单位）。建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
            console.log("加载帧间隔： = " + interval);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.timeHandler, this);
            this._timer.start();
        }
    };
    FrameImage.prototype.timeHandler = function (e) {
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
                egret.Tween.get(this).wait(1000).call(function () {
                    //this._completeCallBack.apply(this.bindTarget, [this]);
                });
            }
            return;
        }
        if (this.index >= this.textures.length - 1) {
            this.texture = this.textures[this.textures.length - 1];
            //console.log(this.tap + " ======最后帧 = " + Number(this.textures.length - 1) + " 多少个帧 " + this.countNum);
        }
        else {
            //console.log(this.tap + " ======当前帧 = " + this.index + " 多少个帧 " + this.countNum);
            this.texture = this.textures[this.index];
        }
        this.countNum += this.tap;
        this.index = Math.round(this.countNum);
    };
    FrameImage.prototype.destroyTimer = function () {
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timeHandler, this);
        }
        this._timer = null;
    };
    FrameImage.prototype.getTimes = function () {
        return this.useCount || 0;
    };
    FrameImage.prototype.getLastTime = function () {
        return this._lastTimer || 0;
    };
    FrameImage.prototype.dispose = function () {
        if (this._timer) {
            this.destroyTimer();
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.textures) {
            while (this.textures.length > 0) {
                var t = this.textures.pop();
                if (t) {
                    t.dispose();
                    t = null;
                }
            }
        }
        this.textures = null;
        this.$bitmapData = null;
        this.source = null;
    };
    return FrameImage;
}(eui.Image));
__reflect(FrameImage.prototype, "FrameImage");
//# sourceMappingURL=FrameImage.js.map