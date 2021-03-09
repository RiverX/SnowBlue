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
var MainSceneControler = (function (_super) {
    __extends(MainSceneControler, _super);
    function MainSceneControler() {
        var _this = _super.call(this) || this;
        _this.lastLogicTime = 0;
        _this.pastAllTime = 0;
        _this.tapBeginTime = 0;
        _this.isTouching = false;
        _this.fireTime = 300;
        _this.isShowCircle = false;
        return _this;
    }
    MainSceneControler.getInstance = function () {
        if (this.instance == null) {
            this.instance = new MainSceneControler();
        }
        return this.instance;
    };
    MainSceneControler.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //this.onLoad();
    };
    MainSceneControler.prototype.onLoad = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.touchEnabled = true;
        this.creatGameBgView();
        //this.creatGameMenuView();
        //this.creatGameHeroView();
        //this.creatGameMonsterView();
        console.log("GameStart!");
        //this.showGameLayer();
        this.startFrameUpdate();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLineOnStage, this);
    };
    MainSceneControler.prototype.startFrameUpdate = function () {
        this.pastAllTime = 0;
        this.lastLogicTime = new Date().getTime();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onGameUpdate, this);
    };
    MainSceneControler.prototype.addLineOnStage = function (e) {
        console.log("???????????????????????????????????");
    };
    MainSceneControler.prototype.onGameUpdate = function () {
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
    MainSceneControler.prototype.creatGameBgView = function () {
        if (this.bgView == null) {
            this.bgView = new game.MainScenceView();
            game.GameConfig.stage.addChild(this.bgView);
            //this.bgView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroTapHandler, this);
            for (var i = 1; i < 4; i++) {
                this.bgView["monster_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.monsterTapHandler, this);
                this.bgView["hero_" + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapBeginHandler, this);
                this.bgView["hero_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroTapHandler, this);
                //this.bgView["hero_" + i].addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.tapCancleHandler, this);
            }
        }
        game.GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.tapCancleHandler, this);
    };
    MainSceneControler.prototype.tapBeginHandler = function (e) {
        var target = e.currentTarget;
        this.lastTap = target;
        this.isTouching = true;
    };
    MainSceneControler.prototype.tapCancleHandler = function (e) {
        //this.lastTap.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
        this.isTouching = false;
        this.tapBeginTime = 0;
    };
    MainSceneControler.prototype.heroTapHandler = function (e) {
        var _this = this;
        var target = e.currentTarget;
        this.lastTap = target;
        console.log("HeronName = " + target.name);
        this.isTouching = false;
        this.fireTime = 300 + this.tapBeginTime;
        var halfMarathonX = 500 * this.tapBeginTime / 100;
        var halfMarathonY = 600 * this.tapBeginTime / 100;
        var fullMarathonX = 750 * this.tapBeginTime / 100;
        var fullMarathonY = 350 * this.tapBeginTime / 100;
        var fu = -1;
        Math.random() >= 0.5 ? fu = -1 : fu = 1;
        var p0 = new egret.Point(125, 126);
        var p1 = new egret.Point(-halfMarathonX, -halfMarathonY); //500,600
        var p2 = new egret.Point(-fullMarathonX + -50 + Math.random() * 20 * fu, -fullMarathonY + -50 + Math.random() * 20 * fu); //750,400,分别有个50的基础
        SpriteSheetEffect.Instance.loadAndPlay(EFFECT_NAME.arrow_fly, 1, function (effect) {
            target.addChild(effect);
            var arc = new ArcMotion(effect, p0, p1, p2, _this.fireTime, true);
            arc.play();
        }, function (effect) {
            /*egret.Tween.get(effect).wait(10000).call(() => {
                console.log("====" + "播放over");
                if (effect) {
                    //effect.parent.removeChild(effect);
                }
            });*/
        }, ImageType.PNG, this, this.fireTime);
        //battle_win
        /*ArcMotion.loadAndPlay(
            "arrow_fly",
            1,
            (effect: FrameImage) => {
                effect.x = target.width / 2 - effect.width / 2;
                effect.y = target.width / 2 - effect.height / 2;
                flying.addChild(effect);
            },
            (effect: FrameImage) => {
                console.log("====" + "GameOver");
                if (effect) {
                    effect.parent.removeChild(effect);
                    flying = null;
                }
            },
            ImageType.PNG,
            this,
            18
        );*/
        this.tapBeginTime = 0;
    };
    MainSceneControler.prototype.monsterTapHandler = function (e) {
        var target = e.currentTarget;
        //this.lastTap = target;
        console.log("monsterName = " + target.name);
        var p0 = new egret.Point(0, 0);
        var p1 = new egret.Point(300, 156);
        var p2 = new egret.Point(600, 300);
        SpriteSheetEffect.Instance.loadAndPlay(EFFECT_NAME.arrow_fly, 1, function (effect) {
            target.addChild(effect);
            var arc = new ArcMotion(effect, p0, p1, p2, 1000, true);
            arc.play();
        }, function (effect) {
            console.log("====" + "GameOver");
            if (effect) {
                effect.parent.removeChild(effect);
            }
        }, ImageType.PNG, this, 18);
    };
    MainSceneControler.prototype.showGameLayer = function () {
        var rect = new eui.Rect();
        rect.fillColor = 0xff0000;
        rect.width = 1080;
        rect.height = 1920;
        this.addChild(rect);
    };
    MainSceneControler.prototype.onLogicUpdate = function (pre) {
        if (this.isTouching) {
            this.tapBeginTime += Math.round(pre * 100);
            if (this.tapBeginTime >= 100) {
                this.tapBeginTime = 100;
            }
            //this.etenergySet();
            //console.log("=========this.tapBeginTime = " + this.tapBeginTime);
        }
        else {
            this.tapBeginTime = 0;
        }
    };
    /*private etenergySet(_boo: number) {
        if (_boo == 1) {
            this.isShowCircle = true;
            this.bgView.cricle.alpha = 1;
            this.bgView.cricle.x = this.lastTap.x;
            this.bgView.cricle.y = this.lastTap.y - 122;
            let curCircle: number = Math.ceil(this.tapBeginTime / 5 % 100);
            curCircle < 10 ? curCircle = curCircle + 10 : curCircle = curCircle + 0;
            this.bgView.cricle.source = "100" + curCircle + "_png";
            console.log("100" + curCircle + "_png" + " =========this.tapBeginTime = " + this.tapBeginTime);
        } else if (_boo == 0) {
            if (this.isShowCircle == true) {
                egret.Tween.get(this.bgView.cricle).to({ alpha: 0 }, 1000).call(() => {
                    this.isShowCircle = false;
                });
            }
        }

    }*/
    MainSceneControler.prototype.onUnLoad = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return MainSceneControler;
}(game.ViewBase));
__reflect(MainSceneControler.prototype, "MainSceneControler");
//# sourceMappingURL=MainSceneControler.js.map