var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ViewManager = (function () {
        function ViewManager() {
            this._controlers = new Dictionary();
        }
        Object.defineProperty(ViewManager, "Instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new ViewManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ViewManager.prototype.register = function (layerIndex, controler) {
            if (layerIndex == null)
                return;
            var key = layerIndex.toString();
            var array = this._controlers.get(key);
            if (array == null) {
                array = [];
                this._controlers.add(key, array);
            }
            if (array.indexOf(controler) == -1) {
                array.push(controler);
            }
        };
        ViewManager.prototype.remove = function (layerIndex, controler) {
            if (layerIndex == null)
                return;
            var array = this.getControlersByIndex(layerIndex);
            if (array) {
                var index = array.indexOf(controler);
                if (index > -1) {
                    array.slice(index, 1);
                }
            }
        };
        ViewManager.prototype.getControlersByIndex = function (index) {
            var key = index.toString();
            return this._controlers.get(key);
        };
        /**
         * 关闭当前层级下所有的界面
         */
        ViewManager.prototype.closeWidgetsByLayerIndex = function (index) {
            var array = this.getControlersByIndex(index);
            if (array) {
                array.forEach(function (controler) {
                    controler.close();
                });
            }
        };
        /**
         * 跳到主界面
         */
        ViewManager.prototype.closeAllWidget = function () {
            /*let arrMain: Array<ControlerBase> = this.getControlersByIndex(LayerManager.L_MAIN);
            let arrPanel: Array<ControlerBase> = this.getControlersByIndex(LayerManager.L_PANEL);
            let arr = arrMain.concat(arrPanel);

            for (let c in arr) {
                let controler: ControlerBase = arr[c] as ControlerBase;

                if (
                    controler instanceof MainCityController ||
                    controler instanceof BuildingUnlockControler ||
                    controler instanceof GuideControler ||
                    controler instanceof XianshihaoliController
                ) {
                } else {
                    if (controler) {
                        controler.close();
                    }
                }
            }*/
        };
        /**
         * 关闭所有界面
         **/
        ViewManager.prototype.closeAll = function () {
            this._controlers.values.forEach(function (controlers) {
                controlers.forEach(function (element) {
                    element.close();
                });
            });
            this._controlers.clear();
        };
        return ViewManager;
    }());
    game.ViewManager = ViewManager;
    __reflect(ViewManager.prototype, "game.ViewManager");
})(game || (game = {}));
//# sourceMappingURL=ViewManager.js.map