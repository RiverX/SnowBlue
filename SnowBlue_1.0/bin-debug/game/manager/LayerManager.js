var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var LayerManager = (function () {
        function LayerManager() {
        }
        LayerManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new LayerManager();
            }
            return this._instance;
        };
        LayerManager.prototype.init = function () {
            this.layer_stage = game.GameConfig.stage;
            this.layer_stage.percentWidth = 100;
            this.layer_stage.percentHeight = 100;
            //
            this.layer_bg = new eui.UILayer();
            this.layer_stage.addChildAt(this.layer_bg, LayerManager.L_BG);
            //
            this.layer_battle = new eui.UILayer();
            this.layer_stage.addChildAt(this.layer_battle, LayerManager.L_BATTLE);
            //
            this.layer_menu = new eui.UILayer();
            this.layer_stage.addChildAt(this.layer_menu, LayerManager.L_MENU);
            //
            this.layer_panel = new eui.UILayer();
            this.layer_stage.addChildAt(this.layer_panel, LayerManager.L_PANEL);
            //
            this.layer_error = new eui.UILayer();
            this.layer_stage.addChildAt(this.layer_error, LayerManager.L_ERROR);
        };
        /*
                * 通过调用 PanelManager.getInstance().getPanel(PanelManager.L_MAIN);
                * 获得想要的层级对象
                */
        LayerManager.prototype.getPanel = function (_layerIndex) {
            switch (_layerIndex) {
                case LayerManager.L_BG:
                    return this.layer_bg;
                case LayerManager.L_BATTLE:
                    return this.layer_battle;
                case LayerManager.L_MENU:
                    return this.layer_menu;
                case LayerManager.L_PANEL:
                    return this.layer_panel;
                case LayerManager.L_ERROR:
                    return this.layer_error;
                default:
                    return null;
            }
        };
        LayerManager.L_BG = 0;
        LayerManager.L_BATTLE = 1;
        LayerManager.L_MENU = 2;
        LayerManager.L_PANEL = 3;
        LayerManager.L_ERROR = 4;
        return LayerManager;
    }());
    game.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "game.LayerManager");
})(game || (game = {}));
//# sourceMappingURL=LayerManager.js.map