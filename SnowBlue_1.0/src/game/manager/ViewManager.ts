namespace game {
	export class ViewManager {
		private static _instance: ViewManager;
		private _controlers: Dictionary<Array<ControlerBase>>;

		public static get Instance(): ViewManager {
			if (this._instance == null) {
				this._instance = new ViewManager();
			}

			return this._instance;
		}

		public constructor() {
			this._controlers = new Dictionary<Array<ControlerBase>>();
		}

		public register(layerIndex: number, controler: ControlerBase): void {
			if (layerIndex == null) return;
			let key: string = layerIndex.toString();
			let array: Array<ControlerBase> = this._controlers.get(key);

			if (array == null) {
				array = [];
				this._controlers.add(key, array);
			}
			if (array.indexOf(controler) == -1) {
				array.push(controler);
			}
		}

		public remove(layerIndex: number, controler: ControlerBase): void {
			if (layerIndex == null) return;
			let array: Array<ControlerBase> = this.getControlersByIndex(layerIndex);
			if (array) {
				let index: number = array.indexOf(controler);
				if (index > -1) {
					array.slice(index, 1);
				}
			}
		}

		public getControlersByIndex(index: number): Array<ControlerBase> {
			let key: string = index.toString();
			return this._controlers.get(key);
		}

		/**
		 * 关闭当前层级下所有的界面
		 */
		public closeWidgetsByLayerIndex(index: number): void {
			let array: Array<ControlerBase> = this.getControlersByIndex(index);
			if (array) {
				array.forEach((controler) => {
					controler.close();
				});
			}
		}

		/**
		 * 跳到主界面
		 */
		public closeAllWidget(): void {
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
		}

		/**
		 * 关闭所有界面
		 **/

		public closeAll(): void {
			this._controlers.values.forEach((controlers) => {
				controlers.forEach((element) => {
					element.close();
				});
			});

			this._controlers.clear();
		}
	}
}
