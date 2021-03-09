namespace game {
	export class EventObject {
		constructor() { }
		public callBack: Function;
		public key: string | number;
		public target: any;
	}

	export class EventManager extends egret.EventDispatcher {
		private static _instance: EventManager;
		private _dic: Dictionary<EventObject> = new Dictionary<EventObject>();
		public constructor() {
			super();
		}

		public static getInstance(): EventManager {
			if (this._instance == null) {
				this._instance = new EventManager();
			}
			return this._instance;
		}
	}
}
