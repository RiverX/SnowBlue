var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * ????????????
 * tween????????????????????????
 * @author chenkai 2018/6/28
 *
 */
var ArcMotion = (function () {
    /**
     * ?????????
     * @param target ?????????????????????
     * @param p0 ?????????
     * @param p1 ??????
     * @param p2 ?????????
     * @param delay ???????????? ??????1000
     * @param loop ????????????  ??????false
     */
    function ArcMotion(target, p0, p1, p2, delay, loop) {
        if (delay === void 0) { delay = 1000; }
        if (loop === void 0) { loop = false; }
        this.loop = false;
        this.delay = 1000;
        this.index = 0;
        this.target = target;
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.loop = loop;
        this.delay = delay;
    }
    ArcMotion.prototype.play = function () {
        var _this = this;
        this.index = 0;
        //factor???0???1??????????????????set factor???ball???????????????
        this.factor = 0;
        var f = this.factor;
        egret.Tween.get(this).to({ factor: 1 }, this.delay).call(function () {
            if (_this.target && _this.target.parent) {
                //this.target.parent.removeChild(this.target);
                console.log(_this.index + "??????????????? " + _this.index);
                _this.stop();
            }
        });
    };
    ArcMotion.prototype.stop = function () {
        egret.Tween.removeTweens(this);
    };
    Object.defineProperty(ArcMotion.prototype, "factor", {
        get: function () {
            return 0;
        },
        //?????????P0 = 100????????????P1 = 300, ??????P2 = 500
        set: function (value) {
            this.index++;
            //console.log(this.index+"???????????????????????? "+value);
            this.target.x = (1 - value) * (1 - value) * this.p0.x + 2 * value * (1 - value) * this.p1.x + value * value * this.p2.x;
            this.target.y = (1 - value) * (1 - value) * this.p0.y + 2 * value * (1 - value) * this.p1.y + value * value * this.p2.y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * ??????????????????
     * @param name ????????????
     * @param createCallBack ?????????????????????
     * @param completeCallBack ?????????????????????
     */
    ArcMotion.loadAndPlay = function (name, loop, createCallBack, completeCallBack, type, target, framerate) {
        if (loop === void 0) { loop = -1; }
        if (type === void 0) { type = ImageType.JPG; }
        if (framerate === void 0) { framerate = 30; }
        return __awaiter(this, void 0, void 0, function () {
            var jsonPath, texturePath, sheet, texure, source, k, tex, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonPath = "resource/assets/sheet/" + name + '.json';
                        texturePath = "resource/assets/sheet/" + name + '.png';
                        return [4 /*yield*/, RES.getResByUrl(jsonPath, function (s) {
                                sheet = s;
                            }, this, RES.ResourceItem.TYPE_SHEET)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResByUrl(texturePath, function (s) {
                                texure = s;
                            }, this, RES.ResourceItem.TYPE_IMAGE)];
                    case 2:
                        _a.sent();
                        source = [];
                        for (k in sheet._textureMap) {
                            tex = sheet.getTexture(k);
                            source.push(tex);
                        }
                        effect = new FrameImage();
                        if (type == ImageType.JPG) {
                            effect.blendMode = egret.BlendMode.ADD;
                        }
                        else {
                            effect.blendMode = egret.BlendMode.NORMAL;
                        }
                        effect.play(source, framerate, loop, function () {
                            effect.dispose();
                            RES.destroyRes(jsonPath);
                            RES.destroyRes(texturePath);
                            effect = null;
                            if (completeCallBack) {
                                completeCallBack.apply(target);
                            }
                        }, target);
                        if (createCallBack) {
                            createCallBack.apply(target, [effect]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ArcMotion;
}());
__reflect(ArcMotion.prototype, "ArcMotion");
//# sourceMappingURL=ArcMotion .js.map