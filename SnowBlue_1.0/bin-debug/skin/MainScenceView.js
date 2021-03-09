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
    var MainScenceView = (function (_super) {
        __extends(MainScenceView, _super);
        function MainScenceView() {
            var _this = _super.call(this) || this;
            _this.skinName = "MainScence";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        MainScenceView.prototype.onRemove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return MainScenceView;
    }(game.ViewBase));
    game.MainScenceView = MainScenceView;
    __reflect(MainScenceView.prototype, "game.MainScenceView");
})(game || (game = {}));
//# sourceMappingURL=MainScenceView.js.map