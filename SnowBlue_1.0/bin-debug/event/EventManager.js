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
    var EventObject = (function () {
        function EventObject() {
        }
        return EventObject;
    }());
    game.EventObject = EventObject;
    __reflect(EventObject.prototype, "game.EventObject");
    var EventManager = (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            var _this = _super.call(this) || this;
            _this._dic = new Dictionary();
            return _this;
        }
        EventManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new EventManager();
            }
            return this._instance;
        };
        return EventManager;
    }(egret.EventDispatcher));
    game.EventManager = EventManager;
    __reflect(EventManager.prototype, "game.EventManager");
})(game || (game = {}));
//# sourceMappingURL=EventManager.js.map