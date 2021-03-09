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
    var ViewBase = (function (_super) {
        __extends(ViewBase, _super);
        function ViewBase() {
            var _this = _super.call(this) || this;
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        ViewBase.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this._createdCallBack) {
                this._createdCallBack.apply(this._target, [this._parmams]);
            }
        };
        ViewBase.prototype.setCreateFun = function (callback, params, target) {
            this._createdCallBack = callback;
            this._parmams = params;
            this._target = target;
        };
        ViewBase.prototype.onResize = function () {
        };
        return ViewBase;
    }(eui.Component));
    game.ViewBase = ViewBase;
    __reflect(ViewBase.prototype, "game.ViewBase");
})(game || (game = {}));
//# sourceMappingURL=ViewBase.js.map