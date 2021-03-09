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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.lastLogicTime = 0;
        _this.pastAllTime = 0;
        return _this;
    }
    GameScene.prototype.onLoad = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.startFrameUpdate();
    };
    GameScene.prototype.startFrameUpdate = function () {
        this.pastAllTime = 0;
        this.lastLogicTime = new Date().getTime();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onGameUpdate, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLineOnStage, this);
    };
    GameScene.prototype.onGameUpdate = function () {
        var elapsedTicks = new Date().getTime();
        if (this.lastLogicTime == elapsedTicks) {
            return false;
        }
        var pastTime = elapsedTicks - this.lastLogicTime;
        this.pastAllTime = this.pastAllTime + pastTime;
        this.lastLogicTime = elapsedTicks;
        this.onLogicUpdate(pastTime / 1000);
        return true;
    };
    GameScene.prototype.onLogicUpdate = function (pre) {
        //console.log("====" + pre);
        /*this.pos1.y = this.ball1.y
        this.pos1.y -= this.vy;
        this.ball1.y = this.pos1.y;*/
        /*let angle = 100;
        let temp = angle * (Math.PI / 180);
        let speed = this.vy;
        this.ball2.x -= speed * Math.cos(temp);
        this.ball2.y -= speed * Math.sin(temp);*/
    };
    GameScene.prototype.onUnLoad = function () {
        this.removeChildren();
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map