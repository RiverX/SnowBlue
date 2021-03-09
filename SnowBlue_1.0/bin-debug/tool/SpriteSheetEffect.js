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
var SpriteSheetEffect = (function () {
    function SpriteSheetEffect() {
    }
    Object.defineProperty(SpriteSheetEffect, "Instance", {
        get: function () {
            if (null == this._instance) {
                this._instance = new SpriteSheetEffect();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 预加载特效
     * @param name 特效名称
     * @param loadCallBack 加载完成之后播放
     */
    SpriteSheetEffect.prototype.preload = function (name, loadCallBack, target) {
        return __awaiter(this, void 0, void 0, function () {
            var json, texture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = name + '_json';
                        texture = name + '_png';
                        return [4 /*yield*/, RES.getResAsync(texture, function () { }, this)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync(json, function () { }, this)];
                    case 2:
                        _a.sent();
                        if (loadCallBack) {
                            loadCallBack.apply(target, [name]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 播放龙骨动画
     * @param name 动画名称
     */
    /*public playDragonEffectByName(name: string, playTime: number = -1, framerate: number = 1): dragonBones.EgretArmatureDisplay {
        let texJsonPath: string = name + '_tex_json';
        let skeJsonPath: string = name + '_ske_json';
        let texturePath: string = name + '_tex_png';
        let texJson;
        let skeJson;
        let texture;
        texJson = RES.getRes(texJsonPath);
        skeJson = RES.getRes(skeJsonPath);
        texture = RES.getRes(texturePath);

        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;

        egretFactory.parseDragonBonesData(skeJson);
        egretFactory.parseTextureAtlasData(texJson, texture);
        let armature: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(name);

        armature.$touchChildren = false;
        armature.$setTouchEnabled(false);
        armature.disableBatch();
        armature.animation.play(null, playTime);
        armature.animation.timeScale = framerate;
        armature.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            armature.dispose();
            armature = null;
        }, this);
        //GCManager.Instance.armatureDisplayList.push(armature);
        return armature;
    }*/
    /**
     * 播放龙骨动画
     * @param name 动画名称
     */
    /*public async playDragonEffect(
        name: string,
        callBack: Function,
        target: any,
        playTime: number = 1,
        complete: Function = null,
        isDestroy: boolean = false,
        name2: string = '',
        framerate: number = 1
    ) {
        let texJsonPath: string = Utils.GAME_DARGON_PATH + name + '_tex.json';
        let skeJsonPath: string = Utils.GAME_DARGON_PATH + name + '_ske.json';
        let texturePath: string = Utils.GAME_DARGON_PATH + name + '_tex.png';
        let texJson;
        let skeJson;
        let texture;
        name2 = name2 ? name2 : name;

        await RES.getResByUrl(
            texJsonPath,
            (s) => {
                texJson = s;
            },
            this,
            RES.ResourceItem.TYPE_JSON
        );
        await RES.getResByUrl(
            skeJsonPath,
            (s) => {
                skeJson = s;
            },
            this,
            RES.ResourceItem.TYPE_JSON
        );
        await RES.getResByUrl(
            texturePath,
            (s) => {
                texture = s;
            },
            this,
            RES.ResourceItem.TYPE_IMAGE
        );

        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;

        egretFactory.parseDragonBonesData(skeJson);
        egretFactory.parseTextureAtlasData(texJson, texture);
        let armature: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(name2);
        armature.addDBEventListener(
            dragonBones.EgretEvent.COMPLETE,
            () => {
                if (complete) {
                    complete.apply(target, [armature]);
                }
                if (isDestroy) {
                    GCManager.Instance.disposeDragonBones(armature, name2);
                }
            },
            this
        );
        armature.$touchChildren = false;
        armature.$setTouchEnabled(false);
        armature.disableBatch();
        armature.animation.play(null, playTime);
        armature.animation.timeScale = framerate;
        armature.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            armature.dispose();
            armature = null;
        }, this);
        // GCManager.Instance.armatureDisplayList.push(armature);
        if (callBack) {
            callBack.apply(target, [armature]);
        }
    }*/
    /**
     * 播放龙骨动画
     * @param name 动画名称
     */
    /*public async playKCDragonEffect(
        name: string,
        callBack: Function,
        target: any,
        playTime: number = 1,
        complete: Function = null,
        isDestroy: boolean = false,
        name2: string = '',
        framerate: number = 1
    ) {
        name = "KCCG"

        let skeJsonPath: string = Utils.GAME_DARGON_PATH + name + '_ske.json';

        let texJsonPath0: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_0.json';
        let texturePath0: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_0.png';
        let texJsonPath1: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_1.json';
        let texturePath1: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_1.png';
        let texJsonPath2: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_2.json';
        let texturePath2: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_2.png';
        let skeJson;

        let texJson0;
        let texture0;
        let texJson1;
        let texture1;
        let texJson2;
        let texture2;
        name2 = name2 ? name2 : name;

        await RES.getResByUrl(
            skeJsonPath,
            (s) => {
                skeJson = s;
            },
            this,
            RES.ResourceItem.TYPE_JSON
        );

        await RES.getResByUrl(
            texJsonPath0,
            (s) => {
                texJson0 = s;
            },
            this,
            RES.ResourceItem.TYPE_JSON
        );

        await RES.getResByUrl(
            texturePath0,
            (s) => {
                texture0 = s;
            },
            this,
            RES.ResourceItem.TYPE_IMAGE
        );

        await RES.getResByUrl(
            texJsonPath1,
            (s) => {
                texJson1 = s;
            },
            this,
            RES.ResourceItem.TYPE_JSON
        );

        await RES.getResByUrl(
            texturePath1,
            (s) => {
                texture1 = s;
            },
            this,
            RES.ResourceItem.TYPE_IMAGE
        );

        await RES.getResByUrl(
            texJsonPath2,
            (s) => {
                texJson2 = s;
            },
            this,
            RES.ResourceItem.TYPE_JSON
        );

        await RES.getResByUrl(
            texturePath2,
            (s) => {
                texture2 = s;
            },
            this,
            RES.ResourceItem.TYPE_IMAGE
        );

        let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;


        egretFactory.parseDragonBonesData(skeJson);
        egretFactory.parseTextureAtlasData(texJson0, texture0);
        egretFactory.parseTextureAtlasData(texJson1, texture1);
        egretFactory.parseTextureAtlasData(texJson2, texture2);

        let armature: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(name2);
        armature.addDBEventListener(
            dragonBones.EgretEvent.COMPLETE,
            () => {
                if (complete) {
                    complete.apply(target, [armature]);
                }
                if (isDestroy) {
                    GCManager.Instance.disposeDragonBones(armature, name2);
                }
            },
            this
        );
        armature.$touchChildren = false;
        armature.$setTouchEnabled(false);
        armature.disableBatch();
        armature.animation.play(null, playTime);
        armature.animation.timeScale = framerate;
        armature.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            armature.dispose();
            armature = null;
        }, this);
        // GCManager.Instance.armatureDisplayList.push(armature);
        if (callBack) {
            callBack.apply(target, [armature]);
        }
    }*/
    /**
     * 清理CG动画
     */
    SpriteSheetEffect.prototype.disposeKCCG = function () {
        var texJsonPath0 = Utils.GAME_DARGON_PATH + 'KCCG_tex_0.json';
        var texturePath0 = Utils.GAME_DARGON_PATH + 'KCCG_tex_0.png';
        var texJsonPath1 = Utils.GAME_DARGON_PATH + 'KCCG_tex_1.json';
        var texturePath1 = Utils.GAME_DARGON_PATH + 'KCCG_tex_1.png';
        var texJsonPath2 = Utils.GAME_DARGON_PATH + 'KCCG_tex_2.json';
        var texturePath2 = Utils.GAME_DARGON_PATH + 'KCCG_tex_2.png';
        RES.destroyRes(texJsonPath0);
        RES.destroyRes(texturePath0);
        RES.destroyRes(texJsonPath1);
        RES.destroyRes(texturePath1);
        RES.destroyRes(texJsonPath2);
        RES.destroyRes(texturePath2);
    };
    /**
     * 自动释放资源
     * @param name 特效名称
     * @param createCallBack 创建完成后播放
     * @param completeCallBack 播放完毕后回调
     */
    SpriteSheetEffect.prototype.loadAndPlay = function (name, loop, createCallBack, completeCallBack, type, target, framerate) {
        if (loop === void 0) { loop = -1; }
        if (type === void 0) { type = ImageType.JPG; }
        if (framerate === void 0) { framerate = 30; }
        return __awaiter(this, void 0, void 0, function () {
            var jsonPath, texturePath, sheet, texure, source, k, tex, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonPath = Utils.GAME_EFFECT_PATH + name + '.json';
                        texturePath = Utils.GAME_EFFECT_PATH + name + '.png';
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
    /**
     * 预加载特效
     * @param name 特效名称
     * @param length 特效序列帧长度
     */
    SpriteSheetEffect.prototype.play = function (name, loop, callBack, target, type, time) {
        if (loop === void 0) { loop = -1; }
        if (type === void 0) { type = ImageType.JPG; }
        if (time === void 0) { time = 30; }
        var json = name + '_json';
        var sheet = RES.getRes(json);
        var source = [];
        var effect = new FrameImage();
        for (var k in sheet._textureMap) {
            var tex = sheet.getTexture(k);
            source.push(tex);
        }
        if (type == ImageType.JPG) {
            effect.blendMode = egret.BlendMode.ADD;
        }
        else {
            effect.blendMode = egret.BlendMode.NORMAL;
        }
        effect.play(source, time, loop, callBack, target);
        return effect;
    };
    return SpriteSheetEffect;
}());
__reflect(SpriteSheetEffect.prototype, "SpriteSheetEffect");
var ImageType = (function () {
    function ImageType() {
    }
    ImageType.JPG = 'jpg';
    ImageType.PNG = 'png';
    return ImageType;
}());
__reflect(ImageType.prototype, "ImageType");
var EFFECT_NAME = (function () {
    function EFFECT_NAME() {
    }
    EFFECT_NAME.arrow_fly = "arrow_fly";
    EFFECT_NAME.etenergy_circle = 'etenergy_circle';
    EFFECT_NAME.INJURED = 'injured';
    EFFECT_NAME.CITY_UP = 'city_up';
    EFFECT_NAME.QICHONGLOU = 'daoguang';
    EFFECT_NAME.GET_SKILL = 'get_skill';
    EFFECT_NAME.HAVE_SKILL = 'have_Skill';
    EFFECT_NAME.GEM_UP = 'gemup';
    EFFECT_NAME.GEM_INLAY = 'gemInlay';
    EFFECT_NAME.GEM_EQUIP_INLAY = 'gemEquip_Inlay';
    EFFECT_NAME.WEAR_EQUIP = 'wearEquip';
    EFFECT_NAME.HAVE_DEBRIS = 'have_Debris';
    EFFECT_NAME.GEM_COMPOUND_BEFOR = 'gemCompound_befor';
    EFFECT_NAME.GEM_COMPOUND_BACK = 'gemCompound_back';
    EFFECT_NAME.BUILDING_UNLOCK = 'building_locking';
    EFFECT_NAME.WATER_EFFECT = 'water_effect';
    EFFECT_NAME.UPDATE_COMPLETE = 'maincity_building_update';
    EFFECT_NAME.BUILDING_UPDING = 'building_update';
    EFFECT_NAME.WALL_BOOM = 'wall_boom';
    EFFECT_NAME.MAP_MIANZHAN = 'map_mianzhan';
    EFFECT_NAME.MAP_MIANZHAN_2 = 'map_mianzhan2';
    EFFECT_NAME.VENATION_CONNECT = 'venation_connect';
    EFFECT_NAME.VENATION_CAN_CONNECT = 'venation_can_connect';
    EFFECT_NAME.VENATION_UP_STAR1 = 'venation_upstar1';
    EFFECT_NAME.VENATION_UP_STAR2 = 'venation_upstar2';
    EFFECT_NAME.MANOR_CHANGE = 'manor_change';
    EFFECT_NAME.MANOR_STEAL_WIN = 'manor_steal_win';
    EFFECT_NAME.MANOR_STEAL_DEF = 'manor_steal_def';
    EFFECT_NAME.BATTLE_WIN = 'battle_win';
    EFFECT_NAME.CASTLE_INJURE = 'castle_injure';
    EFFECT_NAME.FORGEFIRE = 'forgeFire'; //铁匠铺常态
    EFFECT_NAME.EQUIP_QIANGHUA = 'equip_qianghua'; //铁匠铺装备强化
    EFFECT_NAME.HERO_UP_LV = 'heroUplv'; //武将升级
    EFFECT_NAME.CITY_UP_LIHUA = 'cityUp_lihua';
    EFFECT_NAME.CITY_UP_EFFECT = 'cityUp_effect';
    EFFECT_NAME.JUNYING_GET_AWARD = 'junying_get_effect';
    EFFECT_NAME.EXPBG_EFFECT = 'exp_effect';
    EFFECT_NAME.EXPBG_EFFECT2 = 'expBg_effect';
    EFFECT_NAME.TREASURE_BATTLE_EFFECT = 'treasure_fight';
    EFFECT_NAME.TREASURE_BATTLE_WIN = 'treasure_win';
    EFFECT_NAME.TREASURE_BATTLE_FAILURE = 'treasure_lost';
    EFFECT_NAME.TASK_EFF = 'taskEff';
    EFFECT_NAME.PRISON_WATER = 'water';
    EFFECT_NAME.PRISON_TOMATO = 'tomato';
    EFFECT_NAME.PRISON_TURTLE = 'turtle';
    EFFECT_NAME.DAIZHAOMU = 'daizhaomu';
    EFFECT_NAME.MAIN_CITY_ROUND_EFF = 'tast_round_effect'; //主界面转圈
    EFFECT_NAME.CITYWAR_JUDIAN_KNIFE = 'knifeEff';
    EFFECT_NAME.CITYWAR_JUDIAN_CHUIZI = 'chuiziEff';
    EFFECT_NAME.RESIST_HUNS_FIRE = 'huns_fire';
    EFFECT_NAME.MANOR_TURN_BIG_BOX = 'Box';
    EFFECT_NAME.QIANCHENG_EFF = 'qianchengEff';
    EFFECT_NAME.QIANCHENG_EFF2 = 'qianchengEff2';
    EFFECT_NAME.LOADING_EFF = 'loadingEff';
    EFFECT_NAME.BUTTON_FREE_EFFECT = 'button_free_effect';
    EFFECT_NAME.JUANZHOU_EFFECT = 'Juanzhou';
    EFFECT_NAME.BAZHU_CITY = 'bazhu_city'; //霸主城池特效
    EFFECT_NAME.BAZHU_XINGJUN = 'xingjun'; //霸主行军特效
    EFFECT_NAME.LOGIN_EFFECT = 'loginBtn'; //登陆按钮
    EFFECT_NAME.RECRUIT_HERO = 'recruit_hero_effect'; //招募武将
    EFFECT_NAME.RECRUIT_HERO_BEIJING = 'beijingguang'; //招募武将背景
    EFFECT_NAME.CLICK_POINT = 'click_point'; //领地引导点击特效
    EFFECT_NAME.GIFT_EFFECT = 'gift_effect'; //充值活动道具特效
    EFFECT_NAME.OFFICE_POSITION_HERO_EFFECT = 'countryPositionEffect'; //国君
    EFFECT_NAME.GONGXIHUODE = 'gxhd';
    EFFECT_NAME.TASKCHAPTER = 'jqsg';
    EFFECT_NAME.GOLD_HEAD = 'Goldtouxiangkuang';
    EFFECT_NAME.HERO_UP_LV_PAO = 'pao';
    EFFECT_NAME.BULID_PAO = 'bluepao';
    EFFECT_NAME.JUNZHUJINGYAN_GUANG = 'JunzhujingyanGuang';
    EFFECT_NAME.FANRONGDU_GUANG = 'fanrongduGuang';
    EFFECT_NAME.CITY_FIGURE = 'city_figure_';
    EFFECT_NAME.TEHUI_GIFT = 'tehui';
    EFFECT_NAME.ZHANLI = 'zhanli_effect';
    EFFECT_NAME.GUANFU_FIRE = 'guanfu_fire';
    EFFECT_NAME.GONG_ATT = 'gong_att';
    EFFECT_NAME.GUANFU_SHOUFU = 'Guanfushoufu';
    EFFECT_NAME.CHENGMEN_YIPO = 'Chengmenyipo';
    EFFECT_NAME.SHEJIAN_EFFECT = 'shejian_effect';
    EFFECT_NAME.OPEN_BOX = 'OpenBox';
    EFFECT_NAME.RECOVERY_COMPLETE = 'recovery_complete';
    EFFECT_NAME.SHOUFUCHENGCHI = 'shoufuchengchi';
    EFFECT_NAME.CITY_YANHUA = 'chengchi_yanhua';
    EFFECT_NAME.DRAGON_DUIZHAN = 'dragon_shangzhen';
    EFFECT_NAME.DRAGON_NAMES = 'dragon_names';
    EFFECT_NAME.DRAGON_SHANGZHEN = 'dragon_duizhan';
    EFFECT_NAME.DRAGON_LIANSHENG = 'dragon_liansheng';
    EFFECT_NAME.FUBEN_BAOXIANG = 'FubenBox';
    EFFECT_NAME.HERO_ADD_EXP = 'hero_addExp';
    EFFECT_NAME.LIANJINRONGLU_HUOYAN = 'lianjinrongluHuoyan';
    EFFECT_NAME.LIANJINRONGLU_BAOZHU = 'lianjinrongluBaozhu';
    EFFECT_NAME.CITY_FIRE = "cityFire";
    return EFFECT_NAME;
}());
__reflect(EFFECT_NAME.prototype, "EFFECT_NAME");
//# sourceMappingURL=SpriteSheetEffect.js.map