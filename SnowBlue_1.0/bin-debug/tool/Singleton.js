var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var Singleton = (function () {
        function Singleton() {
        }
        Singleton.getInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var cls = this;
            if (!cls._instance) {
                var len = args.length;
                if (len == 0) {
                    cls._instance = new cls();
                }
                else if (len == 1) {
                    cls._instance = new cls(args[0]);
                }
                else if (len == 2) {
                    cls._instance = new cls(args[0], args[1]);
                }
                else if (len == 3) {
                    cls._instance = new cls(args[0], args[1], args[2]);
                }
                cls._instance.init();
            }
            return cls._instance;
        };
        return Singleton;
    }());
    game.Singleton = Singleton;
    __reflect(Singleton.prototype, "game.Singleton");
})(game || (game = {}));
//# sourceMappingURL=Singleton.js.map