class SpriteSheetEffect {
		public constructor() { }
		private static _instance: SpriteSheetEffect;

		public static get Instance(): SpriteSheetEffect {
			if (null == this._instance) {
				this._instance = new SpriteSheetEffect();
			}

			return this._instance;
		}

		/**
		 * 预加载特效
		 * @param name 特效名称
		 * @param loadCallBack 加载完成之后播放
		 */
		public async preload(name: string, loadCallBack: Function, target) {
			let json: string = name + '_json';
			let texture: string = name + '_png';

			await RES.getResAsync(texture, () => { }, this);
			await RES.getResAsync(json, () => { }, this);

			if (loadCallBack) {
				loadCallBack.apply(target, [name]);
			}
		}

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
		public disposeKCCG(): void {
			let texJsonPath0: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_0.json';
			let texturePath0: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_0.png';
			let texJsonPath1: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_1.json';
			let texturePath1: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_1.png';
			let texJsonPath2: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_2.json';
			let texturePath2: string = Utils.GAME_DARGON_PATH + 'KCCG_tex_2.png';
			RES.destroyRes(texJsonPath0)
			RES.destroyRes(texturePath0);
			RES.destroyRes(texJsonPath1);
			RES.destroyRes(texturePath1);
			RES.destroyRes(texJsonPath2);
			RES.destroyRes(texturePath2);
		}

		/**
		 * 自动释放资源
		 * @param name 特效名称
		 * @param createCallBack 创建完成后播放
		 * @param completeCallBack 播放完毕后回调
		 */
		public async loadAndPlay(
			name: string,
			loop: number = -1,
			createCallBack: Function,
			completeCallBack: Function,
			type: ImageType = ImageType.JPG,
			target,
			framerate: number = 30
		) {
			let jsonPath: string = Utils.GAME_EFFECT_PATH + name + '.json';
			let texturePath: string = Utils.GAME_EFFECT_PATH + name + '.png';
			let sheet;
			let texure;
			await RES.getResByUrl(
				jsonPath,
				(s) => {
					sheet = s;
				},
				this,
				RES.ResourceItem.TYPE_SHEET
			);

			await RES.getResByUrl(
				texturePath,
				(s) => {
					texure = s;
				},
				this,
				RES.ResourceItem.TYPE_IMAGE
			);

			let source: Array<egret.Texture> = [];
			for (let k in sheet._textureMap) {
				let tex: egret.Texture = sheet.getTexture(k);
				source.push(tex);
			}
			let effect: FrameImage = new FrameImage();
			if (type == ImageType.JPG) {
				effect.blendMode = egret.BlendMode.ADD;
			} else {
				effect.blendMode = egret.BlendMode.NORMAL;
			}
			effect.play(
				source,
				framerate,
				loop,
				() => {
					effect.dispose();
					RES.destroyRes(jsonPath);
					RES.destroyRes(texturePath);

					effect = null;
					if (completeCallBack) {
						completeCallBack.apply(target);
					}
				},
				target
			);
			if (createCallBack) {
				createCallBack.apply(target, [effect]);
			}
		}

		/**
		 * 预加载特效
		 * @param name 特效名称
		 * @param length 特效序列帧长度
		 */
		public play(
			name: string,
			loop: number = -1,
			callBack: Function,
			target,
			type: ImageType = ImageType.JPG,
			time: number = 30
		) {
			let json: string = name + '_json';
			let sheet: egret.SpriteSheet = RES.getRes(json);
			let source: Array<egret.Texture> = [];
			let effect: FrameImage = new FrameImage();

			for (let k in sheet._textureMap) {
				let tex: egret.Texture = sheet.getTexture(k);
				source.push(tex);
			}

			if (type == ImageType.JPG) {
				effect.blendMode = egret.BlendMode.ADD;
			} else {
				effect.blendMode = egret.BlendMode.NORMAL;
			}

			effect.play(source, time, loop, callBack, target);

			return effect;
		}
	}

	class ImageType {
		public static JPG: string = 'jpg';
		public static PNG: string = 'png';
	}

	 class EFFECT_NAME {
		public static arrow_fly: string = "arrow_fly";
		public static etenergy_circle: string = 'etenergy_circle';
		
		public static INJURED: string = 'injured';
		public static CITY_UP: string = 'city_up';
		public static QICHONGLOU: string = 'daoguang';
		public static GET_SKILL: string = 'get_skill';
		public static HAVE_SKILL: string = 'have_Skill';
		public static GEM_UP: string = 'gemup';
		public static GEM_INLAY: string = 'gemInlay';
		public static GEM_EQUIP_INLAY: string = 'gemEquip_Inlay';
		public static WEAR_EQUIP: string = 'wearEquip';
		public static HAVE_DEBRIS: string = 'have_Debris';
		public static GEM_COMPOUND_BEFOR: string = 'gemCompound_befor';
		public static GEM_COMPOUND_BACK: string = 'gemCompound_back';
		public static BUILDING_UNLOCK: string = 'building_locking';
		public static WATER_EFFECT: string = 'water_effect';
		public static UPDATE_COMPLETE: string = 'maincity_building_update';
		public static BUILDING_UPDING: string = 'building_update';
		public static WALL_BOOM: string = 'wall_boom';
		public static MAP_MIANZHAN: string = 'map_mianzhan';
		public static MAP_MIANZHAN_2: string = 'map_mianzhan2';
		public static VENATION_CONNECT: string = 'venation_connect';
		public static VENATION_CAN_CONNECT: string = 'venation_can_connect';
		public static VENATION_UP_STAR1: string = 'venation_upstar1';
		public static VENATION_UP_STAR2: string = 'venation_upstar2';
		public static MANOR_CHANGE: string = 'manor_change';
		public static MANOR_STEAL_WIN: string = 'manor_steal_win';
		public static MANOR_STEAL_DEF: string = 'manor_steal_def';
		public static BATTLE_WIN: string = 'battle_win';
		public static CASTLE_INJURE: string = 'castle_injure';
		public static FORGEFIRE: string = 'forgeFire'; //铁匠铺常态
		public static EQUIP_QIANGHUA: string = 'equip_qianghua'; //铁匠铺装备强化
		public static HERO_UP_LV: string = 'heroUplv'; //武将升级
		public static CITY_UP_LIHUA: string = 'cityUp_lihua';
		public static CITY_UP_EFFECT: string = 'cityUp_effect';
		public static JUNYING_GET_AWARD: string = 'junying_get_effect';
		public static EXPBG_EFFECT: string = 'exp_effect';
		public static EXPBG_EFFECT2: string = 'expBg_effect';
		public static TREASURE_BATTLE_EFFECT: string = 'treasure_fight';
		public static TREASURE_BATTLE_WIN: string = 'treasure_win';
		public static TREASURE_BATTLE_FAILURE: string = 'treasure_lost';
		public static TASK_EFF: string = 'taskEff';
		public static PRISON_WATER: string = 'water';
		public static PRISON_TOMATO: string = 'tomato';
		public static PRISON_TURTLE: string = 'turtle';
		public static DAIZHAOMU: string = 'daizhaomu';
		public static MAIN_CITY_ROUND_EFF: string = 'tast_round_effect'; //主界面转圈
		public static CITYWAR_JUDIAN_KNIFE: string = 'knifeEff';
		public static CITYWAR_JUDIAN_CHUIZI: string = 'chuiziEff';
		public static RESIST_HUNS_FIRE: string = 'huns_fire';
		public static MANOR_TURN_BIG_BOX: string = 'Box';
		public static QIANCHENG_EFF: string = 'qianchengEff';
		public static QIANCHENG_EFF2: string = 'qianchengEff2';
		public static LOADING_EFF: string = 'loadingEff';
		public static BUTTON_FREE_EFFECT = 'button_free_effect';
		public static JUANZHOU_EFFECT = 'Juanzhou';
		public static BAZHU_CITY: string = 'bazhu_city'; //霸主城池特效
		public static BAZHU_XINGJUN: string = 'xingjun'; //霸主行军特效
		public static LOGIN_EFFECT: string = 'loginBtn'; //登陆按钮
		public static RECRUIT_HERO: string = 'recruit_hero_effect'; //招募武将
		public static RECRUIT_HERO_BEIJING: string = 'beijingguang'; //招募武将背景
		public static CLICK_POINT: string = 'click_point'; //领地引导点击特效
		public static GIFT_EFFECT: string = 'gift_effect'; //充值活动道具特效
		public static OFFICE_POSITION_HERO_EFFECT: string = 'countryPositionEffect'; //国君
		public static GONGXIHUODE: string = 'gxhd';
		public static TASKCHAPTER: string = 'jqsg';
		public static GOLD_HEAD: string = 'Goldtouxiangkuang';
		public static HERO_UP_LV_PAO: string = 'pao';
		public static BULID_PAO: string = 'bluepao';
		public static JUNZHUJINGYAN_GUANG: string = 'JunzhujingyanGuang';
		public static FANRONGDU_GUANG: string = 'fanrongduGuang';
		public static CITY_FIGURE: string = 'city_figure_';
		public static TEHUI_GIFT: string = 'tehui';
		public static ZHANLI: string = 'zhanli_effect';
		public static GUANFU_FIRE: string = 'guanfu_fire';
		public static GONG_ATT: string = 'gong_att';
		public static GUANFU_SHOUFU: string = 'Guanfushoufu';
		public static CHENGMEN_YIPO: string = 'Chengmenyipo';
		public static SHEJIAN_EFFECT: string = 'shejian_effect';
		public static OPEN_BOX: string = 'OpenBox';
		public static RECOVERY_COMPLETE = 'recovery_complete';
		public static SHOUFUCHENGCHI = 'shoufuchengchi';
		public static CITY_YANHUA = 'chengchi_yanhua';
		public static DRAGON_DUIZHAN = 'dragon_shangzhen';
		public static DRAGON_NAMES = 'dragon_names';
		public static DRAGON_SHANGZHEN = 'dragon_duizhan';
		public static DRAGON_LIANSHENG = 'dragon_liansheng';
		public static FUBEN_BAOXIANG = 'FubenBox';
		public static HERO_ADD_EXP = 'hero_addExp';
		public static LIANJINRONGLU_HUOYAN = 'lianjinrongluHuoyan';
		public static LIANJINRONGLU_BAOZHU = 'lianjinrongluBaozhu';
		public static CITY_FIRE: string = "cityFire";
	}

