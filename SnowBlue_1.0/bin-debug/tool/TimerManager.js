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
    var TimerManager = (function (_super) {
        __extends(TimerManager, _super);
        /**
         * 构造函数
         */
        function TimerManager() {
            var _this = _super.call(this) || this;
            _this.currHandler = null;
            _this._handlers = [];
            _this.nexthandles = null;
            _this._currTime = egret.getTimer();
            _this._currFrame = 0;
            egret.startTick(_this.onEnterFrame, _this);
            return _this;
        }
        TimerManager.prototype.init = function () { };
        Object.defineProperty(TimerManager, "Instance", {
            get: function () {
                return this.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        TimerManager.prototype.getFrameId = function () {
            return this._currFrame;
        };
        TimerManager.prototype.getCurrTime = function () {
            return this._currTime;
        };
        // 从大到小排序
        TimerManager.binFunc = function (b1, b2) {
            if (b1.exeTime > b2.exeTime)
                return -1;
            else if (b1.exeTime < b2.exeTime)
                return 1;
            else
                return 0;
        };
        TimerManager.DeleteHandle = function (handler) {
            handler.clear();
            game.ObjectPool.push(handler);
        };
        /**
         * 每帧执行函数
         * @param frameTime
         */
        TimerManager.prototype.onEnterFrame = function (time) {
            this._currFrame++;
            this._currTime = egret.getTimer();
            var currTime = 0;
            // process the nextlist first
            var nexthandles = this.nexthandles;
            this.nexthandles = null;
            if (nexthandles && nexthandles.length > 0) {
                for (var _i = 0, nexthandles_1 = nexthandles; _i < nexthandles_1.length; _i++) {
                    var handler_1 = nexthandles_1[_i];
                    handler_1.method.call(handler_1.methodObj);
                    TimerManager.DeleteHandle(handler_1);
                }
                nexthandles = null;
            }
            if (this._handlers.length <= 0)
                return false;
            var handler = this._handlers[this._handlers.length - 1];
            while (handler.exeTime <= this._currTime) {
                this.currHandler = handler = this._handlers.pop();
                handler.method.call(handler.methodObj);
                currTime = egret.getTimer();
                handler.exeTime = currTime + handler.delay;
                var repeat = handler.forever;
                if (!repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                        repeat = true;
                    }
                    else {
                        if (handler.onFinish) {
                            handler.onFinish.apply(handler.finishObj);
                        }
                    }
                }
                if (repeat) {
                    var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
                    this._handlers.splice(index, 0, handler);
                }
                else {
                    TimerManager.DeleteHandle(handler);
                }
                if (currTime - this._currTime > 5)
                    break;
                if (this._handlers.length <= 0)
                    break;
                else
                    handler = this._handlers[this._handlers.length - 1];
            }
            this.currHandler = null;
            return false;
        };
        TimerManager.prototype.create = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
            if (delay < 0 || repeat < 0 || method == null) {
                return;
            }
            var handler = game.ObjectPool.pop('game.TimerHandler');
            handler.forever = repeat == 0;
            handler.repeatCount = repeat;
            handler.delay = delay;
            handler.method = method;
            handler.methodObj = methodObj;
            handler.onFinish = onFinish;
            handler.finishObj = fobj;
            handler.exeTime = startTime + this._currTime;
            // this._handlers.push(handler);
            var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
            this._handlers.splice(index, 0, handler);
        };
        /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
        TimerManager.prototype.doTimer = function (delay, repeat, method, methodObj, onFinish, fobj) {
            if (onFinish === void 0) { onFinish = null; }
            if (fobj === void 0) { fobj = null; }
            this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
        };
        /**
     *
     * 定时执行
     * @param startTime 延迟多久第一次执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
        TimerManager.prototype.doTimerDelay = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
            if (onFinish === void 0) { onFinish = null; }
            if (fobj === void 0) { fobj = null; }
            this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
        };
        // 下一帧执行，且只执行一次
        TimerManager.prototype.doNext = function (method, methodObj) {
            var handler = game.ObjectPool.pop('game.TimerHandler');
            handler.method = method;
            handler.methodObj = methodObj;
            if (!this.nexthandles)
                this.nexthandles = [];
            this.nexthandles.push(handler);
        };
        /**
         * 清理
         * @param method 要移除的函数
         * @param methodObj 要移除的函数对应的对象
         */
        TimerManager.prototype.remove = function (method, methodObj) {
            var currHandler = this.currHandler;
            if (currHandler && currHandler.method == method && currHandler.methodObj == methodObj) {
                currHandler.forever = false;
                currHandler.repeatCount = 0;
            }
            for (var i = this._handlers.length - 1; i >= 0; i--) {
                var handler = this._handlers[i];
                if (handler.method == method && handler.methodObj == methodObj) {
                    this._handlers.splice(i, 1);
                    TimerManager.DeleteHandle(handler);
                }
            }
        };
        /**
         * 清理
         * @param methodObj 要移除的函数对应的对象
         */
        TimerManager.prototype.removeAll = function (methodObj) {
            var currHandler = this.currHandler;
            if (currHandler && currHandler.methodObj == methodObj) {
                currHandler.forever = false;
                currHandler.repeatCount = 0;
            }
            for (var i = this._handlers.length - 1; i >= 0; i--) {
                var handler = this._handlers[i];
                if (handler.methodObj == methodObj) {
                    this._handlers.splice(i, 1);
                    TimerManager.DeleteHandle(handler);
                }
            }
        };
        TimerManager.prototype.clearAll = function () {
            this._handlers = [];
            this.nexthandles = null;
        };
        /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
        TimerManager.prototype.isExists = function (method, methodObj) {
            for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.method == method && handler.methodObj == methodObj) {
                    return true;
                }
            }
            return false;
        };
        return TimerManager;
    }(game.Singleton));
    game.TimerManager = TimerManager;
    __reflect(TimerManager.prototype, "game.TimerManager");
    // export class TimerHandler {
    // 	/**执行间隔*/
    // 	public delay: number = 0;
    // 	/**是否重复执行*/
    // 	public forever: boolean = false;
    // 	/**重复执行次数*/
    // 	public repeatCount: number = 0;
    // 	/**执行时间*/
    // 	public exeTime: number = 0;
    // 	/**处理函数*/
    // 	public method: Function;
    // 	/**处理函数所属对象*/
    // 	public methodObj: any;
    // 	/**完成处理函数*/
    // 	public onFinish: Function;
    // 	/**完成处理函数所属对象*/
    // 	public finishObj: any;
    // 	/**清理*/
    // 	public clear(): void {
    // 		this.method = null;
    // 		this.methodObj = null;
    // 		this.onFinish = null;
    // 		this.finishObj = null;
    // 		this.forever = false;
    // 	}
    // }
})(game || (game = {}));
//# sourceMappingURL=TimerManager.js.map