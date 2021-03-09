namespace game {

	export class LayerManager {

		private static _instance: LayerManager;
		private layer_stage: eui.UILayer; //根目录

		public layer_bg: eui.UILayer; //背景图
		public layer_battle: eui.UILayer; //hero + monster + 子弹 显示层
		public layer_menu: eui.UILayer; //左上角菜单
		public layer_panel: eui.UILayer; //其他一次性弹窗（玩法+介绍)
		public layer_error: eui.UILayer; //警示


		public static L_BG: number = 0;
		public static L_BATTLE: number = 1;
		public static L_MENU: number = 2;
		public static L_PANEL: number = 3;
		public static L_ERROR: number = 4;

		public constructor() {
		}

		public static getInstance(): LayerManager {
			if (this._instance == null) {
				this._instance = new LayerManager();
			}
			return this._instance;
		}

		public init(): void {
			this.layer_stage = GameConfig.stage;
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
		}


		/*
				* 通过调用 PanelManager.getInstance().getPanel(PanelManager.L_MAIN);
				* 获得想要的层级对象
				*/
		public getPanel(_layerIndex: number): eui.UILayer {
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
		}

	}
}