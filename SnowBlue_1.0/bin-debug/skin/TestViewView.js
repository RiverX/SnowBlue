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
    var TestViewView = (function (_super) {
        __extends(TestViewView, _super);
        function TestViewView() {
            var _this = _super.call(this) || this;
            _this.skinName = "TestView";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
            return _this;
        }
        TestViewView.prototype.onRemove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return TestViewView;
    }(game.ViewBase));
    game.TestViewView = TestViewView;
    __reflect(TestViewView.prototype, "game.TestViewView");
})(game || (game = {}));
//# sourceMappingURL=TestViewView.js.map