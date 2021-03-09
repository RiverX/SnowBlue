var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var GameConfig = (function () {
        function GameConfig() {
        }
        GameConfig.GameWidth = 1080;
        GameConfig.GameHeight = 1092;
        return GameConfig;
    }());
    game.GameConfig = GameConfig;
    __reflect(GameConfig.prototype, "game.GameConfig");
})(game || (game = {}));
//# sourceMappingURL=GameConfig.js.map