var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SceneManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.init = function () {
        this._scenes = [];
        this._currScene = null;
    };
    SceneManager.prototype.getScene = function (type) {
        for (var index = 0; index < this._scenes.length; index++) {
            var element = this._scenes[index];
            if (element instanceof type) {
                return element;
            }
        }
        return null;
    };
    SceneManager.prototype.runScene = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var scene = this.getScene(type);
        if (scene != null) {
            if (this._currScene != null) {
                this._currScene.onUnLoad();
                game.GameConfig.stage.removeChild(this._currScene);
                this._currScene = null;
            }
            game.GameConfig.stage.addChild(scene);
            scene.onLoad(args);
            this._currScene = scene;
        }
    };
    /**
     * 清空处理
     */
    SceneManager.prototype.clear = function () {
        this._scenes.forEach(function (element) {
            element.onUnLoad();
        });
        this._currScene = null;
        this._scenes = [];
    };
    /**
     * 注册Scene
     */
    SceneManager.prototype.registerScene = function (type) {
        this._scenes.push(new type());
    };
    /**
     * 获取当前Scene
     */
    SceneManager.prototype.getCurrScene = function () {
        return this._currScene;
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map