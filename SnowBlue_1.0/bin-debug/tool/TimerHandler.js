var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TimerHandler = (function () {
        function TimerHandler() {
            /**执行间隔*/
            this.delay = 0;
            /**是否重复执行*/
            this.forever = false;
            /**重复执行次数*/
            this.repeatCount = 0;
            /**执行时间*/
            this.exeTime = 0;
        }
        /**清理*/
        TimerHandler.prototype.clear = function () {
            this.method = null;
            this.methodObj = null;
            this.onFinish = null;
            this.finishObj = null;
            this.forever = false;
        };
        return TimerHandler;
    }());
    game.TimerHandler = TimerHandler;
    __reflect(TimerHandler.prototype, "game.TimerHandler");
})(game || (game = {}));
//# sourceMappingURL=TimerHandler.js.map