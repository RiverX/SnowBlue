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
    var HeroView = (function (_super) {
        __extends(HeroView, _super);
        function HeroView() {
            var _this = _super.call(this) || this;
            _this.skinName = "Hero";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        HeroView.prototype.onRemove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return HeroView;
    }(game.ViewBase));
    game.HeroView = HeroView;
    __reflect(HeroView.prototype, "game.HeroView");
})(game || (game = {}));
//# sourceMappingURL=HeroView.js.map